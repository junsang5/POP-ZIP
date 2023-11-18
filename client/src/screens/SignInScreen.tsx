import {TouchableOpacity, Text, View} from 'react-native';
import React from 'react';
// import SocialKakao from '../components/SocialKakao';
import {useDispatch} from 'react-redux';
import styled from '@emotion/native';
import {setUser} from '../redux/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const AA = styled.TouchableOpacity`
  margin: 30px auto;
`;

export default function SignInScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = {name: 'yoonjinwon', age: '23', token: 'thisistoken'};
  const handlePress = async () => {
    await dispatch(setUser(user));
    await AsyncStorage.setItem('user', JSON.stringify(user));
    // navigation.replace('Root');
  };
  return (
    <View>
      <AA onPress={handlePress}>
        <Text>로그인</Text>
      </AA>
    </View>
  );
}
