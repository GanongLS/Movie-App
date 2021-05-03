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

const HeroImage = memo(props => {
  const {details} = props;

  console.log({details});

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ImageBackground
        source={{
          uri: details
            ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
            : 'https://st2.depositphotos.com/4083751/6003/v/600/depositphotos_60038011-stock-video-film-negative-animation.jpg',
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
                fontSize: 24,
                fontWeight: 'bold',
                color: colors.white,
                marginBottom: 10,
              }}>
              Selamat Datang,
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: colors.white,
              }}>
              Nikmati ribuan movie hanya dengan smartphone.
            </Text>
          </View>
        </BlackGradient>
      </ImageBackground>
    </SafeAreaView>
  );
});

export default HeroImage;

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
    height: height * 0.4,
  },
});
