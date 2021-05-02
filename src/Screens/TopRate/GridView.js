import {isEmpty} from 'lodash';
import React, {memo, useEffect, useState} from 'react';
import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import colors from '../../Constants/colors';
import {height, width} from '../../Constants/constants';
import BlackGradient from './Gradient';

const GridView = memo(props => {
  const {list} = props;
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    let items;
    if (!isEmpty(list)) {
      items = list.map((el, id) => {
        const path = el.backdrop_path;
        return {
          id,
          src: path
            ? `https://image.tmdb.org/t/p/w500${path}`
            : 'https://img.17qq.com/images/hsrshwuuwax.jpeg',
          // src: `https://image.tmdb.org/t/p/w500${path}`,
          movie: el,
        };
      });
    } else {
      items = Array.apply(null, Array(21)).map((v, i) => {
        return {
          id: i,
          src: 'http://placehold.it/200x200?text=' + (i + 1),
        };
      });
    }
    setDataSource(items);
  }, [list]);

  return (
    <FlatList
      style={{height: height * 0.8}}
      showsVerticalScrollIndicator={false}
      horizontal={false}
      data={dataSource}
      renderItem={({item}) => (
        <ImageBackground
          source={{uri: item.src}}
          style={{
            flex: 1,
            flexDirection: 'column',
            margin: 5,
            ...styles.imageThumbnail,
          }}>
          <BlackGradient>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                paddingBottom: 5,
                paddingLeft: 10,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: colors.white,
                }}>
                {item.movie ? item.movie.title : ''}
              </Text>
            </View>
          </BlackGradient>
        </ImageBackground>
      )}
      numColumns={2}
      keyExtractor={(item, index) => index}
    />
  );
});
export default GridView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imageThumbnail: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    height: width * 0.4,
  },
});
