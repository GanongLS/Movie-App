import React, {memo} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {Icon, normalize} from 'react-native-elements';
import colors from '../../Constants/colors';

const MovieSearchBar = memo(props => {
  const {iconPress, value} = props;
  return (
    <View style={styles.rowSBContainer}>
      <Icon
        type="ionicons"
        name="search"
        size={normalize(20)}
        color={colors.grayBD}
        onPress={iconPress}
      />
      <TextInput
        placeholder="cari movie"
        value={value}
        style={{flex: 1}}
        {...props}
      />
    </View>
  );
});

export default MovieSearchBar;

const styles = StyleSheet.create({
  rowSBContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.gray9E,
  },
});
