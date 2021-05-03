import React, {memo} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import colors from '../../Constants/colors';
import {height} from '../../Constants/constants';
import {useMovieState} from '../../Providers/MovieProvider';
import HeroImage from './HeroImage';
import HorizontalSlider from './HorizontalSlider';
import MovieSearchBar from './MovieSearchBar';

const HomeScreen = memo(() => {
  const {
    categories: {nowShowing, comingSoon, popular, topRated},
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
        <SearchBar
          round
          searchIcon={{size: 24}}
          containerStyle={{
            backgroundColor: 'white',
            borderBottomColor: 'white',
          }}
          // onChangeText={text => searchFilterFunction(text)}
          // onClear={text => searchFilterFunction('')}
          placeholder="Type Here..."
          // value={search}
        />
        <SliderTitle title="Populer" />
        <HorizontalSlider list={popular} />

        <SliderTitle title="Akan Tayang" />
        <HorizontalSlider list={comingSoon} />

        <SliderTitle title="Tayang Hari Ini" />
        <HorizontalSlider list={nowShowing} />

        <SliderTitle title="Top Rated" />
        <HorizontalSlider list={topRated} />
      </ScrollView>
    </SafeAreaView>
  );
});

const SliderTitle = memo(props => {
  return (
    <View style={styles.subtitle}>
      <Text style={{fontSize: 20, fontWeight: '700', color: colors.dark}}>
        {props.title}
      </Text>
    </View>
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
