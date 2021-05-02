import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const OtherScreens = memo(() => {
  return (
    <View>
      <Text></Text>
    </View>
  );
});

export default OtherScreens;

const HomeScreen = memo(() => {
  return (
    <View style={styles.dummy}>
      <Text>Home Screen</Text>
    </View>
  );
});

const NowPlayingScreen = memo(() => {
  return (
    <View style={styles.dummy}>
      <Text>Now Playing</Text>
    </View>
  );
});

const UpComingScreen = memo(() => {
  return (
    <View style={styles.dummy}>
      <Text>Now Playing</Text>
    </View>
  );
});

const TopRateScreen = memo(() => {
  return (
    <View style={styles.dummy}>
      <Text>Top Rate</Text>
    </View>
  );
});

const SearchScreen = memo(() => {
  return (
    <View style={styles.dummy}>
      <Text>Search</Text>
    </View>
  );
});

const MovieDetailScreen = memo(() => {
  return (
    <View style={styles.dummy}>
      <Text>Movie Detail</Text>
    </View>
  );
});

export {
  HomeScreen,
  NowPlayingScreen,
  TopRateScreen,
  SearchScreen,
  UpComingScreen,
  MovieDetailScreen,
};

const styles = StyleSheet.create({
  dummy: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
