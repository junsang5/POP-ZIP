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
        name="Map"
        component={MapScreen}
      />
      <BottomTab.Screen
        options={{headerShown: false}}
        name="Calendar"
        component={CalendarScreen}
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
