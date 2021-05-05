import {isEmpty} from 'lodash';
import React, {memo, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {normalize, Icon} from 'react-native-elements';
import colors from '../../Constants/colors';
import {height} from '../../Constants/constants';
import {useMovieState} from '../../Providers/MovieProvider';
import MovieSearchBar from '../Home/MovieSearchBar';
import GridView from '../TopRate/GridView';
import SearchSearchBar from './SearchSearchBar';
import YearListModal from './YearListModal';

const SearchScreen = memo(() => {
  const {
    queried: {text: searchText, movies},
  } = useMovieState();
  console.log({movies});

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Hasil Pencarian "{`${searchText}`}".
        </Text>
      </View>
      <SearchSearchBar />
      <View style={{marginBottom: 30}}>
        {isEmpty(movies) ? (
          <View style={{flexGrow: 1}}>
            <View style={styles.title}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Tidak ada hasil pencarian "{`${searchText}`}".
              </Text>
            </View>
          </View>
        ) : (
          <GridView list={movies} height={height * 0.755} />
        )}
      </View>
    </SafeAreaView>
  );
});

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  title: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  rounded: {
    backgroundColor: colors.gray66,
    borderRadius: 12,
  },
});
