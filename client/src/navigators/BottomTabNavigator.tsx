import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch} from 'react-redux';

import {fetchPopups} from '../redux/popups/popupSlice';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import MyPageScreen from '../screens/MyPageScreen';

function BottomTabNavigator() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPopups());
  }, []);
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
      />
      <BottomTab.Screen
        options={{headerShown: false}}
        name="Category"
        component={CategoryScreen}
      />
      <BottomTab.Screen
        options={{headerShown: false}}
        name="MyPage"
        component={MyPageScreen}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
