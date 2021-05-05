import React, {memo} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {height} from '../../Constants/constants';
import {useMovieState} from '../../Providers/MovieProvider';
import GridView from '../TopRate/GridView';

const UpComingScreen = memo(() => {
  const {
    categories: {comingSoon},
  } = useMovieState();
  console.log({comingSoon});
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Up Coming Movie</Text>
      </View>
      <GridView list={comingSoon} height={height * 0.795} /> 
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

export {UpComingScreen};
