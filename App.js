/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {memo} from 'react';
import 'react-native-gesture-handler';
import AppProvider from './src/Providers/MovieProvider';
import Root from './src/Router/Root';

const App = memo(() => {
  return (
    <AppProvider>
      <Root />
    </AppProvider>
  );
});

export default App;
