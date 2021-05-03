import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {memo} from 'react';
import {View} from 'react-native';
import {Icon, normalize} from 'react-native-elements';
import colors from '../Constants/colors';
import {height} from '../Constants/constants';
import HomeScreen from '../Screens/Home/HomeScreens';
import {NowPlayingScreen} from '../Screens/NowPlaying/NowPlayingScreen';
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
          } else if (route.name === 'TopRate') {
            iconName = focused ? 'star' : 'star-o';
            iconType = 'font-awesome';
          } else if (route.name === 'UpComing') {
            iconName = 'update';
            iconType = 'material';
          } else if (route.name === 'NowPlaying') {
            iconName = focused ? 'md-play-circle' : 'md-play-circle-outline';
            iconType = 'ionicon';
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
          backgroundColor: colors.white,
          elevation: 10,
        },
        labelStyle: {
          fontSize: normalize(10),
          paddingBottom: 8,
        },
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="TopRate" component={TopRateScreen} />
      <Tab.Screen name="UpComing" component={UpComingScreen} />
      <Tab.Screen name="NowPlaying" component={NowPlayingScreen} />
    </Tab.Navigator>
  );
});

export {Dashboard};
