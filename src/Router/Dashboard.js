import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {memo} from 'react';
import {View} from 'react-native';
import {Icon, normalize} from 'react-native-elements';
import colors from '../Constants/colors';
import {height} from '../Constants/constants';
import {
  NowPlayingScreen,
  SearchScreen,
  TopRateScreen,
  UpComingScreen,
} from '../Screens/OtherScreens';

const Tab = createBottomTabNavigator();

const Dashboard = memo(() => {
  return (
    <Tab.Navigator
      headerMode="none"
      initialRouteName="TopRate"
      screenOptions={({route, navigation}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconType;
          let iconName;
          if (route.name === 'TopRate') {
            iconName = focused ? 'star' : 'star-o';
            iconType = 'font-awesome';
          } else if (route.name === 'NowPlaying') {
            iconName = focused ? 'play' : 'playcircleo';
            iconType = 'antdesign';
          } else if (route.name === 'UpComing') {
            iconName = 'history';
            iconType = focused ? 'font-awesome-5' : 'material-community';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search';
            iconType = 'ionicon';
          }

          return (
            <View style={{paddingTop: 8}}>
              <Icon
                type={iconType}
                name={iconName}
                size={normalize(25)}
                color={color}
              />
            </View>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primary,
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
          backgroundColor: 'white',
          elevation: 10,
        },
        labelStyle: {
          fontSize: normalize(10),
          paddingBottom: 8,
        },
      }}>
      <Tab.Screen name="TopRate" component={TopRateScreen} />
      <Tab.Screen name="UpComing" component={UpComingScreen} />
      <Tab.Screen name="NowPlaying" component={NowPlayingScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
});

export {Dashboard};
