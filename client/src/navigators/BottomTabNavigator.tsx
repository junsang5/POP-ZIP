import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector, useDispatch} from 'react-redux';
import {fetchPopups} from '../redux/popups/popupSlice';

import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import MyPageScreen from '../screens/MyPageScreen';
import {Image} from 'react-native';

function BottomTabNavigator({navigation}) {
  const BottomTab = createBottomTabNavigator();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  if (!isLoggedIn) {
    navigation.navigate('SignIn');
  }
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchPopups());
    }
  }, [isLoggedIn, dispatch]);
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#2B4454',
          height: 64,
          borderTopColor: '#C0C0C0',
          borderTopWidth: 1,
          paddingTop: 10,
          paddingBottom: 10,
        }, // 탭 바의 배경색 지정
        tabBarActiveTintColor: '#FFFFFF', // 활성 탭 아이콘 색상
        tabBarInactiveTintColor: '#C0C0C0', // 비활성 탭 아이콘 색상
        headerShown: false, // 헤더 숨기기
        // tabBarShowLabel: false,
      }}>
      <BottomTab.Screen
        name="홈"
        component={HomeScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/images/home.png')}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                tintColor: color,
                resizeMode: 'contain',
                width: 24,
                height: 24,
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="카테고리"
        component={CategoryScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/images/category.png')}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                tintColor: color,
                resizeMode: 'contain',
                width: 24,
                height: 24,
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="내 정보"
        component={MyPageScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/images/person.png')}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                tintColor: color,
                resizeMode: 'contain',
                width: 24,
                height: 24,
              }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
