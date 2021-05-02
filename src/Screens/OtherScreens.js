import React, {memo} from 'react';
import {View, Text} from 'react-native';

const OtherScreens = memo(() => {
  return (
    <View>
      <Text></Text>
    </View>
  );
});

export default OtherScreens;

const HomeScreen = memo(() => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
});

export {HomeScreen};
