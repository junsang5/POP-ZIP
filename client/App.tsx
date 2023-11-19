/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {createContext} from 'react';
import RootStackNavigator from './src/navigators/RootStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import axios from 'axios';
import axiosInstance from './src/axiosInstance';
import store from './src/redux/store';

const AxiosContext = createContext(null);

export default function App() {
  const axiosInstance = axios.create();
  return (
    <AxiosContext.Provider value={axiosInstance}>
      <Provider store={store}>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
      </Provider>
    </AxiosContext.Provider>
  );
}
