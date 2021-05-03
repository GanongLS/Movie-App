import React, {memo} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import colors from '../../Constants/colors';

const HomeScreen = memo(() => {
  return (
    <SafeAreaView style={styles.dummy}>
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  dummy: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
