import React, {memo} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {} from 'react-native-safe-area-context';

const SearchScreen = memo(() => {
  return (
    <SafeAreaView style={styles.container}>
      <View></View>
      <Text>Search</Text>
    </SafeAreaView>
  );
});

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
