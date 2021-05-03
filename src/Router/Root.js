import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {memo, useEffect} from 'react';
import {useMovieMethod} from '../Providers/MovieProvider';
import MovieDetailsScreen from '../Screens/MovieDetails/MovieDetailsScreen';
import {Dashboard} from './Dashboard';

const Stack = createStackNavigator();

const Root = memo(() => {
  const {fetch, fetchConfig} = useMovieMethod();

  useEffect(() => {
    fetch('nowShowing', '/movie/now_playing');
    fetch('comingSoon', '/movie/upcoming');
    fetch('popular', '/movie/popular');
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
        <Stack.Screen
          name="Movie Details"
          component={MovieDetailsScreen}
          // options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default Root;
