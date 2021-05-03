import React, {memo, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import colors from '../../Constants/colors';
import {height} from '../../Constants/constants';
import {useMovieState} from '../../Providers/MovieProvider';
import BlackGradient from '../TopRate/Gradient';

const MovieDetailsScreen = memo(() => {
  const {details} = useMovieState();

  useEffect(() => {
    console.log({details});
  }, [details]);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/original${details.backdrop_path}`,
        }}
        style={{
          ...styles.imageThumbnail,
        }}>
        <BlackGradient>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              paddingBottom: 25,
              paddingLeft: 10,
            }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: colors.white,
                marginBottom: 10,
              }}>
              {details ? details.title : ''}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: colors.white,
              }}>
              Popularitas: {details ? details.popularity : ''}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: colors.white,
              }}>
              Tanggal Rilis: {details ? details.release_date : ''}
            </Text>
          </View>
        </BlackGradient>
      </ImageBackground>
    </SafeAreaView>
  );
});

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  dummy: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenContainer: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imageThumbnail: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
