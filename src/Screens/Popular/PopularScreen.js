import React, {memo} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useMovieState} from '../../Providers/MovieProvider';
import GridView from '../TopRate/GridView';
// import GridView from './GridView';

const PopularScreen = memo(() => {
  const {
    categories: {popular},
  } = useMovieState();
  console.log({popular});
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Now Playing Movie
        </Text>
      </View>
      <GridView list={popular} />
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

export {PopularScreen};
