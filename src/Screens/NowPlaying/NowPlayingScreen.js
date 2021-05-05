import React, {memo} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {height} from '../../Constants/constants';
import {useMovieState} from '../../Providers/MovieProvider';
import GridView from '../TopRate/GridView';
// import GridView from './GridView';

const NowPlayingScreen = memo(() => {
  const {
    categories: {nowShowing},
  } = useMovieState();
  console.log({nowShowing});
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Now Playing Movie
        </Text>
      </View>
      <GridView list={nowShowing} height={height * 0.795} />
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

export {NowPlayingScreen};
