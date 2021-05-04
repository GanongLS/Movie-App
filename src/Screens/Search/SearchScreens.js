import {isEmpty} from 'lodash';
import React, {memo} from 'react';
import {SafeAreaView, StyleSheet, Text, View, TextInput} from 'react-native';
import {normalize, Icon} from 'react-native-elements';
import colors from '../../Constants/colors';
import {height} from '../../Constants/constants';
import {useMovieState} from '../../Providers/MovieProvider';
import MovieSearchBar from '../Home/MovieSearchBar';
import GridView from '../TopRate/GridView';

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
      <View style={styles.rowSBContainer}>
        <View style={{flex: 2}}>
          <MovieSearchBar />
        </View>
        <View style={{padding: 8, flex: 0.7}}>
          <View style={{...styles.rowSBContainer, ...styles.rounded}}>
            <TextInput
              placeholder="Cari movie..."
              placeholderTextColor="white"
              style={{fontSize: normalize(18), color: 'white', flex: 1}}
              value={'Tahun'}
              editable={false}
            />
            <Icon
              type="ionicon"
              name="chevron-down-sharp"
              size={normalize(20)}
              color={colors.white}
              // onPress={iconPress}
              style={{padding: 8}}
            />
          </View>
        </View>
      </View>

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
  rowSBContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rounded: {
    backgroundColor: colors.gray66,
    borderRadius: 12,
  },
});
