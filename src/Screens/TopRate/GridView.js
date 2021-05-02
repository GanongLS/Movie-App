import React, {memo, useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {useMovieState} from '../../Providers/MovieProvider';
import {isEmpty} from 'lodash';
import {height, width} from '../../Constants/constants';

const GridView = memo(() => {
  const [dataSource, setDataSource] = useState([]);

  const {
    categories: {nowShowing},
  } = useMovieState();
  console.log({nowShowing});

  useEffect(() => {
    let items;
    if (!isEmpty(nowShowing)) {
      items = nowShowing.map((el, id) => {
        return {
          id,
          src: `https://image.tmdb.org/t/p/w500${el.backdrop_path}`,
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
  }, [nowShowing]);

  return (
    <FlatList
      style={{height: height * 0.8}}
      showsVerticalScrollIndicator={false}
      horizontal={false}
      data={dataSource}
      renderItem={({item}) => (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            margin: 5,
          }}>
          <Image style={styles.imageThumbnail} source={{uri: item.src}} />
        </View>
      )}
      //Setting the number of column
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
    justifyContent: 'center',
    alignItems: 'center',
    height: width * 0.4,
  },
});
