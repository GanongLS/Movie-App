import {useNavigation} from '@react-navigation/core';
import React, {memo} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import colors from '../../Constants/colors';
import {height} from '../../Constants/constants';
import {useMovieState} from '../../Providers/MovieProvider';
import HeroImage from './HeroImage';
import HorizontalSlider from './HorizontalSlider';

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

        <HeroImage details={popular[popular.length - 1]} />
        <SearchBar
          round
          searchIcon={{size: 24}}
          containerStyle={{
            backgroundColor: 'white',
            borderBottomColor: 'white',
          }}
          // onChangeText={text => searchFilterFunction(text)}
          // onClear={text => searchFilterFunction('')}
          placeholder="Cari Movie..."
          // value={search}
        />
        <SliderTitle title="Populer" route={'Popular'} />
        <HorizontalSlider list={popular} />

        <SliderTitle title="Akan Tayang" route={'Up Coming'} />
        <HorizontalSlider list={comingSoon} />

        <SliderTitle title="Tayang Hari Ini" route="NowPlaying" />
        <HorizontalSlider list={nowShowing} />

        <SliderTitle title="Top Rated" route="TopRated" />
        <HorizontalSlider list={topRated} />
      </ScrollView>
    </SafeAreaView>
  );
});

const SliderTitle = memo(props => {
  const {navigate} = useNavigation();
  const {title, route} = props;
  return (
    <View style={styles.subtitle}>
      <TouchableOpacity
        onPress={() => {
          route ? navigate(route) : null;
        }}>
        <Text style={{fontSize: 20, fontWeight: '700', color: colors.dark}}>
          {title}
        </Text>
      </TouchableOpacity>
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
