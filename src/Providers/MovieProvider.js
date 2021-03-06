import Axios from 'axios';
import {debounce} from 'lodash';
import React, {
  createContext,
  memo,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import {apiKey, baseUrl, defaultTimeout} from '../Env/API';
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
      topRated: [],
    },
    searched: {
      text: '',
      nowShowing: [],
      comingSoon: [],
      popular: [],
      topRated: [],
    },
    queried: {
      text: '',
      year: null,
      movies: [],
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
      case 'fetchMovies':
        // console.log({movies: action.movies});
        return {
          ...prevState,
          categories: {
            ...prevState.categories,
            [action.category]: [...action.movies],
          },
        };

      case 'searchCategory':
        console.log({'searched category': action.category});
        return {
          ...prevState,
          searched: {
            ...prevState.searched,
            text: action.text,
            [action.category]: [...action.searched],
          },
        };

      case 'searchMovies':
        return {
          ...prevState,
          queried: {
            ...prevState.queried,
            text: action.text,
            year: action.year,
            movies: [...action.movies],
            data: action.data,
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
          dispatch({
            type: 'fetchMovies',
            category,
            movies: [...request.data.results],
          });
          return true;
        } catch (err) {
          console.log(err);
          // const Err = fetchError(err, 'fetch'); //* keep
          // console.log({Err}); //* keep
        }
      },
      getDetails: async id => {
        console.log({'movie get details, id:': id});
        // https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

        const uri = `/movie/${id}?${apiKey}`;
        try {
          const request = await Axios.get(baseUrl + uri);
          console.log({request}); //* keep
          dispatch({type: 'saveDetails', details: request.data});
          return true;
        } catch (err) {
          console.log(err);
          // const Err = fetchError(err, 'fetch'); //* keep
          // console.log({Err}); //* keep
        }
      },

      onSaveDetails: details => {
        // console.log({'detail di method': details}); //* keep
        dispatch({type: 'saveDetails', details});
      },

      fetchConfig: async () => {
        // https://api.themoviedb.org/3/configuration?api_key=<<api_key>>
        const uri = `/configuration?${apiKey}`;
        try {
          const request = await Axios.get(baseUrl + uri);
          // console.log({request}); //* keep
          return true;
        } catch (err) {
          console.log(err);
        }
      },

      onSearchCategory: debounce((category, text) => {
        const {categories} = state;

        const list = categories[category];
        const searched = list.filter(el => {
          return (
            el.title.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
            el.release_date.indexOf(text) > -1
          );
        });
        dispatch({type: 'searchCategory', category, text, searched});
      }, 500),

      onSearchMovies: async text => {
        const uri = `/search/movie?${apiKey}&query=${text}`;
        try {
          const request = await Axios.get(baseUrl + uri);
          console.log({request}); //* keep
          // console.log(`category: ${category}`); //* keep
          dispatch({
            type: 'searchMovies',
            text,
            movies: [...request.data.results],
            data: request.data,
          });
          return true;
        } catch (err) {
          console.log(err);
          // const Err = fetchError(err, 'fetch'); //* keep
          // console.log({Err}); //* keep
        }
      },
      onFilterSearch: async (text, year, page) => {
        const uri = `/search/movie?${apiKey}&query=${text}&year=${year}&page=${page}`;
        try {
          const request = await Axios.get(baseUrl + uri);
          console.log({request}); //* keep
          dispatch({
            type: 'searchMovies',
            text,
            year,
            movies: [...request.data.results],
            data: request.data,
          });
          return true;
        } catch (err) {
          console.log(err);
          // const Err = fetchError(err, 'fetch'); //* keep
          // console.log({Err}); //* keep
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
