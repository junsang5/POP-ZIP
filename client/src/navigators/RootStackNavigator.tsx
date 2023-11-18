import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import BottomTabNavigator from './BottomTabNavigator';
import SplashScreen from '../screens/SplashScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileChangeScreen from '../screens/ProfileChangeScreen';

function RootStackNavigator() {
  const user = useSelector(state => state.auth.user);
  const isLoggedIn = user != null;
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    console.log('user: ', user);
    console.log('isLoggedIn: ', isLoggedIn);
    const fetchUserFromStorage = async () => {
      const u = await AsyncStorage.getItem('user');
      console.log('Storage user: ', u);
    };
    fetchUserFromStorage();
  }, [user]);
  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? 'Root' : 'Splash'}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="ProfileChange" component={ProfileChangeScreen} />
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
