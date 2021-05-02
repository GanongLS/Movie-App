import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {memo, useEffect} from 'react';
import {useMovieMethod, useMovieState} from '../Providers/MovieProvider';
import {isEmpty} from 'lodash';

import {Dashboard} from './Dashboard';

const Stack = createStackNavigator();

const Root = memo(() => {
  const {fetch} = useMovieMethod();
  const {
    categories: {nowShowing, comingSoon, popular},
  } = useMovieState();
  useEffect(() => {
    fetch('nowShowing', '/movie/now_playing');
    fetch('comingSoon', '/movie/upcoming');
    fetch('popular', '/movie/popular');
    // isEmpty(nowShowing)
    //   ? fetch('nowShowing', '/movie/now_playing')
    //   : isEmpty(comingSoon)
    //   ? fetch('comingSoon', '/movie/upcoming')
    //   : isEmpty(popular)
    //   ? fetch('popular', '/movie/popular')
    //   : console.log('done');
    // nowShowing, comingSoon, popular
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
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default Root;
