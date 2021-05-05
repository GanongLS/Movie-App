import {isEmpty} from 'lodash';
import React, {memo} from 'react';
import {
  FlatList,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {normalize} from 'react-native-elements';
import colors from '../../Constants/colors';
import {height, width} from '../../Constants/constants';

const YearListModal = memo(props => {
  const {onSubmit, onHide, visible} = props;

  const range = (start, end) =>
    Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);

  const yearList = range(1960, new Date().getFullYear()).reverse();
  const list = [null, ...yearList];

  const renderItem = ({item}) => {
    // console.log({item});
    return (
      <FLItem
        name={item == null ? 'Tanpa tahun' : item.toString()}
        onPress={() => {
          onSubmit(item);
          onHide();
        }}
      />
    );
  };
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onHide}>
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPressOut={onHide}>
          <View
            style={{
              ...styles.modalView,
              ...styles.longList,
              flexGrow: 1,
              backgroundColor: colors.white,
            }}>
            <View style={styles.header}>
              <View style={{paddingHorizontal: 16, paddingVertical: 20}}>
                <Text style={{...styles.t14L, fontWeight: '700'}}>Tahun</Text>
              </View>
            </View>
            <FlatList
              style={{borderRadius: 8}}
              showsVerticalScrollIndicator={false}
              data={list}
              renderItem={renderItem}
              keyExtractor={(_, id) => id.toString()}
              extraData={list}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
});

const FLItem = memo(props => {
  const {name, onPress} = props;

  return (
    <View
      style={{
        ...styles.container1,
      }}>
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}>
        <View
          style={{
            ...styles.rowSBULContainer,
            width: '100%',
            height: height * 0.084,
          }}>
          <View style={{paddingHorizontal: 16}}>
            <Text
              style={{
                ...styles.t16L,
                textAlignVertical: 'center',
              }}>
              {name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: height - StatusBar.currentHeight,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    flex: 1,
    backgroundColor: colors.background1,
  },
  longList: {
    height: height - StatusBar.currentHeight,
    width: width,
    paddingBottom: 10,
  },
  shortList: {
    height: height * 0.45,
    width: width * 0.9,
    paddingBottom: 10,
  },
  header: {
    borderBottomWidth: 2,
    borderColor: colors.grayUnderline,
    width: '100%',
  },
  modalView: {
    backgroundColor: 'white',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
  },
  t14L: {
    fontSize: normalize(14),
    color: colors.dark,
  },
  t16L: {
    fontSize: normalize(16),
    color: colors.dark,
  },
  rowSBULContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: colors.grayUnderline,
  },
});

export default YearListModal;
