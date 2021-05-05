import {isEmpty} from 'lodash';
import React, {memo, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon, normalize} from 'react-native-elements';
import colors from '../../Constants/colors';
import {height} from '../../Constants/constants';
import {useMovieState} from '../../Providers/MovieProvider';
import GridView from '../TopRate/GridView';
import SearchSearchBar from './SearchSearchBar';

const SearchScreen = memo(() => {
  const {
    queried: {
      text: searchText,
      year,
      movies,
      data: {page, total_pages},
    },
  } = useMovieState();
  console.log({movies});
  const [filterPage, setFilterPage] = useState(page);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Hasil Pencarian "{`${searchText}`}".
        </Text>
      </View>
      <SearchSearchBar page={filterPage} />
      <View style={{marginBottom: 30}}>
        {isEmpty(movies) ? (
          <View style={{flexGrow: 1}}>
            <View style={styles.title}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Tidak ada hasil pencarian "{`${searchText}`}"
                {year ? ` dan tahun: ${year.toString()}` : null}.
              </Text>
            </View>
          </View>
        ) : (
          <GridView list={movies} height={height * 0.705} />
        )}
        <View style={{...styles.rowSpace, padding: 8}}>
          <TouchableOpacity
            style={{
              height: height * 0.04,
              width: height * 0.06,
              backgroundColor: colors.white,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {page - 1 > 0 ? (
              <Icon
                type="ionicon"
                name="play-back-sharp"
                size={normalize(20)}
                color={colors.blue1}
                onPress={() => setFilterPage(page - 1)}
                style={{margin: 8}}
              />
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: height * 0.04,
              width: height * 0.08,
              backgroundColor: colors.white,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: normalize(18), fontWeight: '700'}}>
              page {page}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: height * 0.04,
              width: height * 0.06,
              backgroundColor: colors.white,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {page < total_pages ? (
              <Icon
                type="ionicon"
                name="play-forward-sharp"
                size={normalize(20)}
                color={colors.blue1}
                onPress={() => setFilterPage(page + 1)}
                style={{margin: 8}}
              />
            ) : null}
          </TouchableOpacity>
        </View>
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
