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
    categories: {
      nowShowing: [],
      comingSoon: [],
      popular: [],
    },
    details: {},
    cast: {
      details: {},
    },
    config: {
      apiKey: '',
      image: {
        secureBaseUrl: '',
        numColumns: 3, // default
        backdropSize: '',
        posterSizeForBackground: '',
        posterSizeForImageList: '',
        profileSize: '',
        stillSize: '',
      },
      style: {
        posterSize: {},
        backdropSize: {},
        carousel: {},
      },
    },
    settings: {
      language: 'IN-hi',
      region: 'IN',
      theme: 'Dark',
    },
  };

  const reducer = (prevState, action) => {
    switch (action.type) {
      case 'nowShowing':
        console.log({movies: action.movies});
        return {
          ...prevState,
          categories: {
            ...prevState.categories,
            nowShowing: [...action.movies],
          },
        };
      case 'comingSoon':
        return {
          ...prevState,
          categories: {
            ...prevState.categories,
            comingSoon: action.movies,
          },
        };
      case 'popular':
        return {
          ...prevState,
          categories: {
            ...prevState.categories,
            popular: action.movies,
          },
        };
      case 'saveDetails':
        return {
          ...prevState,
          details: action.details,
        };
      case 'resetMovie':
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
          // console.log({request}); //* keep
          // console.log(`category: ${category}`); //* keep
          dispatch({type: category, movies: [...request.data.results]});
          return true;
        } catch (err) {
          console.log(err);
          // const Err = fetchError(err, 'fetch'); //* keep
          // console.log({Err}); //* keep
        }
      },

      onSaveDetails: details => {
        // console.log({'detail di method': details});
        dispatch({type: 'saveDetails', details});
      },

      fetchConfig: async () => {
        // https://api.themoviedb.org/3/configuration?api_key=<<api_key>>

        const uri = `/configuration?${apiKey}`;
        try {
          const request = await Axios.get(baseUrl + uri);
          console.log({request}); //* keep
          // console.log(`category: ${category}`); //* keep
          // dispatch({type: category, movies: [...request.data.results]});
          return true;
        } catch (err) {
          console.log(err);
          // const Err = fetchError(err, 'fetch'); //* keep
          // console.log({Err}); //* keep
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
