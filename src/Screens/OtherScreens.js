import React, {memo} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {} from 'react-native-safe-area-context';

const OtherScreens = memo(() => {
  return (
    <View>
      <Text></Text>
    </View>
  );
});

export default OtherScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
