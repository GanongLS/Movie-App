import Axios from 'axios';
import React, {
  createContext,
  memo,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import {baseUrl, apiKey, defaultTimeout} from '../Env/API';

import {fetchError} from './Helpers/fetchError';

const movieStateContext = createContext({});
const movieMethodContext = createContext({});

const MovieProvider = memo(props => {
  const {children} = props;

  const initialState = {
    isFetching: true,
    isSearching: false,
  };

  const reducer = (prevState, action) => {
    switch (action.type) {
      case 'fetch':
        return {
          ...prevState,
          isFetching: action.status,
        };
      case 'search':
        return {
          ...prevState,
          isSearching: action.status,
        };

      case 'resetRequest':
        return {
          ...initialState,
        };
      default:
        throw new Error(
          `Unexpected type of action. \n the actiontype was ${action.type}`,
        );
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const movieState = useMemo(() => state, [state]);

  onFetchCompleted = (category, movies) => {
    console.log(`category: ${category}`);
    dispatch({type: category, movies});
  };

  getUriPopulated = (shows, config, key) => {
    const {image} = config;
    // decipher imageType from key
    // ex: posterSizeForImageList, extract poster from string
    const imageType = key.substring(0, key.indexOf('S'));

    return shows.map(show => {
      const path = show['file_path'] || show[`${imageType}_path`];
      show['uri'] = `${image.secureBaseUrl}${image[key]}${path}`;
      return show;
    });
  };

  const movieMethod = useMemo(
    () => ({
      fetch: async (category, route) => {
        const {
          config,
          settings: {language, region},
        } = state;
        const uri = `${route}?${apiKey}&language=${language}&region=${region}&page=1`;
        try {
          const request = await Axios.get(baseUrl + uri);
          console.log({request});
          onFetchCompleted(
            category,
            getUriPopulated(
              request.data.results,
              config,
              'posterSizeForImageList',
            ),
          );
        } catch (err) {
          console.log(err);
          // const Err = fetchError(err, 'fetch');
          // console.log({Err});
        }
      },

      fetchMovies: async () => {
        try {
          const request = await Axios.post(`${baseUrl}/auth/device`, encrypt, {
            timeout: defaultTimeout,
          });
          console.log({request});
          return request.data;
        } catch (err) {
          const Err = fetchError(err, 'authDevice');
          console.log({Err});
        }
      },
    }),
    [dispatch, state],
  );

  return (
    <movieStateContext.Provider value={movieState}>
      <movieMethodContext.Provider value={movieMethod}>
        {children}
      </movieMethodContext.Provider>
    </movieStateContext.Provider>
  );
});
const useMovieState = () => {
  const context = useContext(movieStateContext);
  if (context === undefined) {
    throw new Error('useMovieState Error');
  }
  return context;
};
const useMovieMethod = () => {
  const context = useContext(movieMethodContext);
  if (context === undefined) {
    throw new Error('useMovieMethod Error');
  }
  return context;
};

export default MovieProvider;
export {useMovieState, useMovieMethod};
