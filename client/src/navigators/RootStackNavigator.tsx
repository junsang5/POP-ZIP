import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import BottomTabNavigator from './BottomTabNavigator';
import SplashScreen from '../screens/SplashScreen';
import ProfileChangeScreen from '../screens/ProfileChangeScreen';
import StoreScreen from '../screens/StoreScreen';
import {clearIsLoggedIn} from '../redux/auth/authSlice';

function RootStackNavigator() {
  const user = useSelector(state => state.auth.user);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    const fetchUserFromStorage = async () => {
      const t = await AsyncStorage.getItem('token');
      const u = await AsyncStorage.getItem('userid');
      console.log('(1)Root Rendering!! Redux auth.user: ', user);
      console.log('(2)Root Rendering!! Redux isLoggedIn: ', isLoggedIn);
      console.log('(3)Root Rendering!! AsyncStorage token: ', t);
      console.log('(4)Root Rendering!! AsyncStorage userId: ', u);
    };
    fetchUserFromStorage();
  }, [user, isLoggedIn]);
  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? 'Root' : 'Splash'}>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Store"
        component={StoreScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileChange"
        component={ProfileChangeScreen}
        options={{
          headerShown: false,
        }}
      />
      {isLoggedIn === false && (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default RootStackNavigator;
