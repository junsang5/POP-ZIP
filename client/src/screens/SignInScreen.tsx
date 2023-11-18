import React, {useState, useCallback} from 'react';
import {View, Text, Button, TextInput, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {loginUser, getUserInfo} from '../redux/auth/authSlice';
import styled from 'styled-components';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const NotAMemberText = styled.Text`
  color: #fff;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 13px;
`;

const SignUpButton = styled.TouchableOpacity``;

function SignInScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(loginUser({username, password}))
      .then(() => {
        dispatch(getUserInfo())
          .then(() => {
            navigation.navigate('Root');
          })
          .catch(error => {
            console.error(
              'getUserInfo: 사용자 정보를 가져오는 데 실패하였습니다:',
              error,
            );
            alert('getUserInfo: 사용자 정보를 가져오는 데 실패하였습니다.');
          });
      })
      .catch((error: any) => {
        console.error('로그인에 실패했습니다:', error);
        alert('로그인에 실패했습니다. 회원가입 화면으로 이동합니다.');
        navigation.navigate('SignUp');
      });
  };
  const onSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <Container>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <NotAMemberText>만약 회원이 아니라면</NotAMemberText>
      <SignUpButton onPress={onSignUp}>
        <Text>회원가입</Text>
      </SignUpButton>
    </Container>
  );
}

export default SignInScreen;

function alert(_arg0: string) {
  throw new Error('Function not implemented.');
}
