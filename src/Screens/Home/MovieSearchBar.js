import React, {memo, useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {Icon, normalize} from 'react-native-elements';
import colors from '../../Constants/colors';

const MovieSearchBar = memo(props => {
  const {iconPress, value} = props;
  const [text, setText] = useState('');
  return (
    <View style={{...styles.rowSBContainer}}>
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
            onSubmitEditing={() => null}
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
      {text.length > 3 ? (
        <View
          style={{
            borderRadius: 100,
            backgroundColor: colors.gray82,
            marginRight: 8,
          }}>
          <View style={{padding: 4}}>
            <Icon
              type="ionicon"
              name="send"
              size={normalize(20)}
              color={colors.white}
              onPress={iconPress}
              style={{padding: 8}}
            />
          </View>
        </View>
      ) : null}
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
    backgroundColor: colors.gray82,
    borderRadius: 12,
  },
});
