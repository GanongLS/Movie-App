import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {memo} from 'react';
import {View} from 'react-native';
import {Icon, normalize} from 'react-native-elements';
import colors from '../Constants/colors';
import {height} from '../Constants/constants';
import HomeScreen from '../Screens/Home/HomeScreens';
import {NowPlayingScreen} from '../Screens/NowPlaying/NowPlayingScreen';
import {PopularScreen} from '../Screens/Popular/PopularScreen';
import {TopRateScreen} from '../Screens/TopRate/TopRateScreen';
import {UpComingScreen} from '../Screens/UpComing/UpComingScreen';

const Tab = createBottomTabNavigator();

const Dashboard = memo(() => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route, navigation}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconType;
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            iconType = 'ionicon';
          } else if (route.name === 'Popular') {
            iconName = focused ? 'heart-circle' : 'heart-circle-outline';
            iconType = 'ionicon';
          } else if (route.name === 'UpComing') {
            iconName = 'update';
            iconType = 'material';
          } else if (route.name === 'NowPlaying') {
            iconName = focused ? 'md-play-circle' : 'md-play-circle-outline';
            iconType = 'ionicon';
          } else if (route.name === 'TopRated') {
            iconName = focused ? 'star' : 'star-o';
            iconType = 'font-awesome';
          }

          return (
            <View style={{paddingTop: 8}}>
              <Icon
                type={iconType}
                name={iconName}
                size={normalize(27)}
                color={color}
              />
            </View>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.blue1,
        inactiveTintColor: colors.grayBD,
        keyboardHidesTabBar: true,
        style: {
          height: height * 0.0883,
          alignItems: 'flex-end',
          borderTopColor: 'transparent',
          backgroundColor: 'transparent',
          position: 'absolute',
          bottom: 0,
          elevation: 10,
        },
        tabStyle: {
          height: height * 0.0883,
          backgroundColor: colors.white,
          elevation: 10,
        },
        labelStyle: {
          fontSize: normalize(12),
          paddingBottom: 8,
        },
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Popular" component={PopularScreen} />
      <Tab.Screen
        name="UpComing"
        component={UpComingScreen}
        options={{
          tabBarLabel: 'Up Coming',
        }}
      />
      <Tab.Screen
        name="NowPlaying"
        component={NowPlayingScreen}
        options={{
          tabBarLabel: 'Playing',
        }}
      />
      <Tab.Screen
        name="TopRated"
        component={TopRateScreen}
        options={{
          tabBarLabel: 'Top Rated',
        }}
      />
    </Tab.Navigator>
  );
});

export {Dashboard};
