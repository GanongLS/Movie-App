import {isEmpty} from 'lodash';
import React, {memo, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
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
      <ScrollView>
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
        <View
          style={{
            minHeight: height * 0.33,
            backgroundColor: colors.black,
            marginBottom: 30,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              paddingBottom: 25,
              paddingLeft: 10,
            }}>
            <Text style={{color: colors.white, fontSize: 18}}>
              Sinopsis:
              {details
                ? !isEmpty(details.overview)
                  ? ` ${details.overview}`
                  : ' Tidak ada sinopsis untuk movie ini'
                : ' Tidak ada sinopsis untuk movie ini'}
            </Text>
          </View>
        </View>
      </ScrollView>
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
    backgroundColor: 'black',
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
    height: height * 0.6,
  },
});
