/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store';
import RootStackNavigation from './src/navigations';
import { Text, View } from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				  <RootStackNavigation />
			</PersistGate>
		</Provider>
  );
};

export default App