import React, {memo} from 'react';
import {Image, SafeAreaView, StyleSheet, View, Text} from 'react-native';

import GridView from './GridView';

const TopRateScreen = memo(() => {
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Top Rated Movie</Text>
      </View>

      <GridView />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  title: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginVertical: 20,
  },
  logo: {
    width: 66,
    height: 58,
    marginVertical: 20,
  },
});

export {TopRateScreen};
