import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import MapScreen from '../screens/MapScreen';
import CalendarScreen from '../screens/CalendarScreen';
import MyPageScreen from '../screens/MyPageScreen';

function BottomTabNavigator() {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="Category" component={CategoryScreen} />
      <BottomTab.Screen name="Map" component={MapScreen} />
      <BottomTab.Screen name="Calendar" component={CalendarScreen} />
      <BottomTab.Screen name="MyPage" component={MyPageScreen} />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
