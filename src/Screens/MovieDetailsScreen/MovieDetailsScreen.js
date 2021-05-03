import React, {memo} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import colors from '../../Constants/colors';
import {height} from '../../Constants/constants';
import {useMovieState} from '../../Providers/MovieProvider';
import BlackGradient from '../TopRate/Gradient';

const MovieDetailsScreen = memo(() => {
  const {details} = useMovieState();
  console.log({details});

  return (
    <View style={styles.dummy}>
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w500${details.backdrop_path}`,
        }}
        style={{
          flex: 1,
          flexDirection: 'column',
          margin: 5,
          ...styles.imageThumbnail,
        }}>
        {/* <BlackGradient>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: colors.white,
            }}>
            {details.movie ? details.movie.title : ''}
          </Text>
        </BlackGradient> */}
      </ImageBackground>
    </View>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imageThumbnail: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.8,
  },
});
