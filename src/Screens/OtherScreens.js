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

const SearchScreen = memo(() => {
  return (
    <View style={styles.dummy}>
      <Text>Search</Text>
    </View>
  );
});

export {HomeScreen, SearchScreen};

const styles = StyleSheet.create({
  dummy: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
