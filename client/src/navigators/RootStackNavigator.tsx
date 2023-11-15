import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

function RootStackNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    async function init() {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token);
    }

    init();
  }, []);
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

export default RootStackNavigator;
