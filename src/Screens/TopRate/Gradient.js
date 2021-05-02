import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {height as screenHeight} from '../../Constants/constants';

const BlackGradient = memo(props => {
  const {height, style, ...attr} = props;
  return (
    <LinearGradient
      {...attr}
      colors={['transparent', '#000000']}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 1.0}}
      style={{
        ...gradientStyle.container,
        height: height ? height : screenHeight * 0.1,
        ...style,
      }}>
      <View>{props.children}</View>
    </LinearGradient>
  );
});

const gradientStyle = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 0,
  },
});

export default BlackGradient;
