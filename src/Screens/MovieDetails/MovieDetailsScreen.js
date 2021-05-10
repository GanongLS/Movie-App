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
import BlackGradient, {DetailsGradient} from '../TopRate/Gradient';
import moment from 'moment';

const MovieDetailsScreen = memo(() => {
  const {details} = useMovieState();

  useEffect(() => {
    console.log({details});
  }, [details]);

  const releaseDate = details
    ? moment(details.release_date, 'YYYY-MM-DD').format('DD MMM YYYY')
    : null;

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
          <DetailsGradient>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                paddingBottom: 10,
                paddingLeft: 10,
              }}>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: 'bold',
                  color: colors.white,
                }}>
                {details ? details.title : ''}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: colors.white,
                  marginBottom: 10,
                }}>
                {details
                  ? details.tagline
                    ? `\"${details.tagline}\"`
                    : null
                  : null}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: colors.white,
                }}>
                Diproduksi oleh:
                {details
                  ? !isEmpty(details.production_companies)
                    ? ` ${details.production_companies[0].name}`
                    : null
                  : null}
              </Text>
            </View>
          </DetailsGradient>
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
            <View style={{marginBottom: 8}}>
              <Text
                style={{
                  fontSize: 18,
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
                Tanggal Rilis: {releaseDate}
              </Text>
            </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenContainer: {
    backgroundColor: 'black',
    flex: 1,
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
    height: height * 0.5,
  },
});
