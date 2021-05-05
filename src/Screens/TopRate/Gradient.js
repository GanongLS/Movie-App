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
      start={{x: 0.5, y: 0.7}}
      end={{x: 0.5, y: 0.9}}
      style={{
        ...gradientStyle.container,
        // height: height ? height : screenHeight * 0.065,
        height: height ? height : '100%',
        ...style,
      }}>
      {props.children}
    </LinearGradient>
  );
});
const DetailsGradient = memo(props => {
  const {height, style, ...attr} = props;
  return (
    <LinearGradient
      {...attr}
      colors={['transparent', '#000000']}
      start={{x: 0.5, y: 0.65}}
      end={{x: 0.5, y: 0.95}}
      style={{
        ...gradientStyle.container,
        // height: height ? height : screenHeight * 0.065,
        height: height ? height : '100%',
        ...style,
      }}>
      {props.children}
    </LinearGradient>
  );
});

const gradientStyle = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 0,
    position: 'absolute',
    bottom: 0,
  },
});

export default BlackGradient;
export {DetailsGradient};
