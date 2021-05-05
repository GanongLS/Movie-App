import {debounce} from 'lodash';
import React, {memo, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Icon, normalize} from 'react-native-elements';
import colors from '../../Constants/colors';
import {useMovieMethod} from '../../Providers/MovieProvider';
import YearListModal from './YearListModal';

const SearchSearchBar = memo(props => {
  const {iconPress} = props;

  //* the search bar
  const {onFilterSearch} = useMovieMethod();
  const [text, setText] = useState('');
  const onSearch = debounce(async () => {
    console.log('Searching');
    const search = await onFilterSearch(text, year);
    console.log({search});
  }, 500);

  //*the year list

  const [listVisible, setListVisible] = useState(false);
  const [year, setYear] = useState(null);
  const onChangeYear = y => setYear(y);

  const onHideList = () => setListVisible(false);

  return (
    <>
      <View style={styles.rowSpace}>
        <View style={{padding: 8, flex: 0.6}}>
          <TouchableOpacity
            onPress={() => setListVisible(true)}
            style={{...styles.rowSpace, ...styles.rounded}}>
            <TextInput
              placeholder="Tahun"
              placeholderTextColor="white"
              style={{
                fontSize: normalize(18),
                color: 'white',
                flex: 0.7,
                marginRight: -12,
              }}
              value={year ? year.toString() : null}
              editable={false}
            />
            <Icon
              type="ionicon"
              name="chevron-down-sharp"
              size={normalize(20)}
              color={colors.white}
              onPress={() => setListVisible(true)}
              style={{flex: 0.3, padding: 8, marginLeft: -12}}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 2}}>
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
            {text.length > 3 ? (
              <View
                style={{
                  borderRadius: 100,
                  backgroundColor: colors.gray66,
                  marginRight: 8,
                  padding: 8,
                }}>
                <View style={{padding: 4}}>
                  <Icon
                    type="ionicon"
                    name="send"
                    size={normalize(20)}
                    color={colors.white}
                    onPress={onSearch}
                    // style={{padding: 8}}
                  />
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </View>
      <YearListModal
        onHide={onHideList}
        // value={year}
        onSubmit={onChangeYear}
        visible={listVisible}
      />
    </>
  );
});

export default SearchSearchBar;

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
});
