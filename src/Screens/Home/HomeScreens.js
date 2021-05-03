import React, {memo} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../../Constants/colors';
import {height} from '../../Constants/constants';
import {useMovieState} from '../../Providers/MovieProvider';
import HeroImage from './HeroImage';
import HorizontalSlider from './HorizontalSlider';
import MovieSearchBar from './MovieSearchBar';

const HomeScreen = memo(() => {
  const {
    categories: {nowShowing, comingSoon, popular},
  } = useMovieState();
  console.log({nowShowing});
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: height * 0.1,
        }}>
        <View style={styles.title}>
          <Text style={{fontSize: 24, fontWeight: 'bold', color: colors.blue1}}>
            The Movie DB
          </Text>
        </View>
        <HeroImage details={popular[0]} />
        <MovieSearchBar />
        <View style={styles.subtitle}>
          <Text style={{fontSize: 20, fontWeight: '700', color: colors.dark}}>
            Populer
          </Text>
        </View>
        <HorizontalSlider list={popular} />

        <View style={styles.subtitle}>
          <Text style={{fontSize: 20, fontWeight: '700', color: colors.dark}}>
            Akan Tayang
          </Text>
        </View>
        <HorizontalSlider list={comingSoon} />

        <View style={styles.subtitle}>
          <Text style={{fontSize: 20, fontWeight: '700', color: colors.dark}}>
            Tayang Hari Ini
          </Text>
        </View>
        <HorizontalSlider list={nowShowing} />
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  title: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  subtitle: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
});

export default HomeScreen;
