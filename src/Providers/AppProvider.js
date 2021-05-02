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

const appStateContext = createContext({});
const appMethodContext = createContext({});

const AppProvider = memo(props => {
  const {children} = props;

  const initialState = {
    movies: {
      isFetching: true,
      categories: {
        nowShowing: [],
        comingSoon: [],
        popular: [],
      },
      details: {},
      cast: {
        isFetching: false,
        details: {},
      },
    },
    tvShows: {
      isFetching: false,
      categories: {
        showingToday: [],
        topRated: [],
        popular: [],
      },
      details: {},
      cast: {
        isFetching: false,
        details: {},
      },
    },
    search: {
      isSearching: false,
      selectedIndex: 0,
      results: [],
      details: {},
      cast: {
        isFetching: false,
        details: {},
      },
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
    // TODO: We should not be using the following. Study the right way of doing this
    helper: {
      currentTab: 'Movies',
    },
  };

  const reducer = (prevState, action) => {
    switch (action.type) {
      case 'nowShowing':
        return {
          ...prevState,
          movies: {
            ...prevState.movies,
            categories: {
              ...prevState.movies.categories,
              nowShowing: action.movies,
            },
          },
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

  const appState = useMemo(() => state, [state]);

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

  const appMethod = useMemo(
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
    <appStateContext.Provider value={appState}>
      <appMethodContext.Provider value={appMethod}>
        {children}
      </appMethodContext.Provider>
    </appStateContext.Provider>
  );
});
const useAppState = () => {
  const context = useContext(appStateContext);
  if (context === undefined) {
    throw new Error('useAppState Error');
  }
  return context;
};
const useAppMethod = () => {
  const context = useContext(appMethodContext);
  if (context === undefined) {
    throw new Error('useAppMethod Error');
  }
  return context;
};

export default AppProvider;
export {useAppState, useAppMethod};
