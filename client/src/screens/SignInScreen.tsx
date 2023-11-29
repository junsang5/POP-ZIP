import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  StyledInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {loginUser, getUserInfo} from '../redux/auth/authSlice';
import styled from '@emotion/native';

const Container = styled.View`
  flex: 1;
  background-color: #f9f9f9; // 밝은 회색으로 배경색 변경
  align-items: center;
  justify-content: center;
  padding: 20px; // 컨테이너에 패딩 추가
`;
const StyledImage = styled.Image`
  width: 45%;
  margin: 0;
  padding: 0;
  resize-mode: contain;
`;
const SInput = styled.TextInput`
  background-color: #fff; // 입력창 배경색
  border: 1px solid #ddd; // 경계선 스타일
  border-radius: 8px; // 입력창 모서리 둥글게
  width: 90%; // 너비 설정
  padding: 15px; // 내부 패딩
  margin-vertical: 10px; // 수직 마진
`;
const LoginButton = styled.TouchableOpacity`
  background-color: #0066ff; // 버튼 배경색
  padding: 15px;
  border-radius: 8px; // 버튼 모서리 둥글게
  width: 90%; // 너비 설정
  align-items: center; // 내용 중앙 정렬
  margin-top: 10px; // 상단 마진
`;

const LoginButtonText = styled.Text`
  color: #fff; // 텍스트 색상
  font-size: 16px; // 폰트 크기
  font-weight: 700; // 폰트 두께
`;

const NotAMemberText = styled.Text`
  color: #000; // 텍스트 색상 변경
  font-size: 14px; // 폰트 크기 조정
  font-weight: 450;
  margin-top: 15px; // 상단 마진 추가
`;

const SignUpButton = styled.TouchableOpacity`
  margin-top: 5px; // 상단 마진 추가
  background-color: #7aabff; // 버튼 배경색
  padding: 6px;
  border-radius: 8px; // 버튼 모서리 둥글게
  width: 40%; // 너비 설정
  align-items: center; // 내용 중앙 정렬
`;
const SignUpText = styled.Text`
  color: #fff; // 텍스트 색상
  font-size: 12px; // 폰트 크기
  font-weight: 700; // 폰트 두께
`;

function SignInScreen({navigation}) {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      console.log('handleLogin id pw : ', userid, ' ', password);
      await dispatch(loginUser({userid, password})).unwrap();
      // await dispatch(getUserInfo()).unwrap();
      navigation.navigate('Root');
    } catch (error) {
      console.log('Error during login process:', error);
      Alert.alert('아이디와 비밀번호를 확인해주세요');
      // navigation.navigate('SignIn');
    }
  };
  const onSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <Container>
      <StyledImage source={require('../assets/images/pop_logo.png')} />
      <SInput value={userid} onChangeText={setUserid} placeholder="UserId" />
      <SInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <LoginButton onPress={handleLogin}>
        <LoginButtonText>Login</LoginButtonText>
      </LoginButton>
      <NotAMemberText>만약 회원이 아니라면</NotAMemberText>
      <SignUpButton onPress={onSignUp}>
        <SignUpText>회원가입</SignUpText>
      </SignUpButton>
    </Container>
  );
}

export default SignInScreen;
