import {useNavigation} from '@react-navigation/core';
import {debounce} from 'lodash';
import React, {memo, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Icon, normalize} from 'react-native-elements';
import colors from '../../Constants/colors';
import {useMovieMethod} from '../../Providers/MovieProvider';

const MovieSearchBar = memo(props => {
  const {navigate} = useNavigation();
  const {iconPress} = props;
  const {onSearchMovies} = useMovieMethod();
  const [text, setText] = useState('');
  const onSearch = debounce(async () => {
    if (text.length > 2) {
      // console.log('Searching');
      const search = await onSearchMovies(text);
      // console.log({search});
      search ? (navigate('Search'), setText('')) : null;
    }
  }, 500);
  return (
    <View style={{padding: 8, flex: 1}}>
      <View style={{...styles.rowSBContainer, ...styles.rounded}}>
        <Icon
          type="ionicon"
          name="search"
          size={normalize(20)}
          color={colors.white}
          onPress={iconPress}
          style={{padding: 8}}
        />
        <TextInput
          placeholder="Cari movie..."
          placeholderTextColor="white"
          style={{fontSize: normalize(18), color: 'white', flex: 1}}
          onChangeText={t => setText(t)}
          value={text}
          onSubmitEditing={onSearch}
        />
        {text ? (
          <View style={{flex: 0.15}}>
            <Icon
              type="ionicon"
              name="close-circle"
              size={normalize(22)}
              color={colors.white}
              onPress={() => setText('')}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
});

export default MovieSearchBar;

const styles = StyleSheet.create({
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
