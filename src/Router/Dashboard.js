import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {memo} from 'react';
import {
  NowPlayingScreen,
  SearchScreen,
  TopRateScreen,
  UpComingScreen,
} from '../Screens/OtherScreens';

const Tab = createBottomTabNavigator();

const Dashboard = memo(() => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="TopRate" component={TopRateScreen} />
      <Tab.Screen name="Upcoming" component={UpComingScreen} />
      <Tab.Screen name="NowPlaying" component={NowPlayingScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
});

export {Dashboard};
