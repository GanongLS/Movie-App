import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {memo, useEffect} from 'react';
import {useMovieMethod} from '../Providers/MovieProvider';
import MovieDetailsScreen from '../Screens/MovieDetails/MovieDetailsScreen';
import SearchScreen from '../Screens/Search/SearchScreens';

import {Dashboard} from './Dashboard';

const Stack = createStackNavigator();

const Root = memo(() => {
  const {fetch, fetchConfig} = useMovieMethod();

  useEffect(() => {
    fetch('nowShowing', '/movie/now_playing');
    fetch('comingSoon', '/movie/upcoming');
    fetch('popular', '/movie/popular');
    fetch('topRated', '/movie/top_rated');
    fetchConfig();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          // headerMode="none"
          name="Home"
          component={Dashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Movie Details" component={MovieDetailsScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default Root;
