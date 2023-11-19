import CancelButton from '../components/CancleButton';
import SignUpInput from '../components/SignUpInput';
import SubmitButton from '../components/SubmitButton';
import axios from 'axios';
import styled from '@emotion/native';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// import axiosInstance from '../axiosInstance';

const Container = styled.View`
  flex: 1;
  background-color: #f2f4fb;
`;

const InnerContainer = styled.View`
  flex: 1;
  margin-horizontal: 22px;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  height: 59px;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 16px;
`;

function SignUpScreen({navigation, route}) {
  const {bottom} = useSafeAreaInsets();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRe, setPasswordRe] = useState('');

  const onChangeId = useCallback((text: string) => {
    setId(text);
  }, []);

  const onChangeName = useCallback((text: string) => {
    setName(text);
  }, []);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const onChangePasswordre = useCallback((text: string) => {
    setPasswordRe(text);
  }, []);

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSubmit = useCallback(async () => {
    try {
      console.log(id, name, email, password, passwordRe);
      const response = await axios.post('http://localhost:8080/api/signup', {
        userId: id,
        userName: name,
        upassword: password,
        email: email,
      });
      console.log('signup response: ', response.data); //{"crateDate": "2023-11-19T08:08:01.212+00:00", "email": "1", "id": 2, "role": "ROLE_USER", "status": null, "token": null, "upassword": "$2a$10$L97snDYl1CHNJNfILMQnvuAuMRe0YeQ6MFLBWM/SO8yc99oK9U31i", "updateDate": "2023-11-19T08:08:01.212+00:00", "userId": "111", "userName": "1"}
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  }, [email, id, name, navigation, password, passwordRe]);

  return (
    <Container style={{paddingBottom: bottom}}>
      <InnerContainer>
        <SignUpInput
          placeholder="아이디를 입력해주세요"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginBottom: 19}}
          onChangeText={onChangeId}
          value={id}
        />
        <SignUpInput
          placeholder="이름을 입력해주세요"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginBottom: 19}}
          onChangeText={onChangeName}
          value={name}
        />
        <SignUpInput
          placeholder="이메일을 입력해주세요."
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginBottom: 19}}
          onChangeText={onChangeEmail}
          value={email}
        />
        <SignUpInput
          placeholder="비밀번호를 입력해주세요."
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginBottom: 19}}
          onChangeText={onChangePassword}
          secureTextEntry={true}
          value={password}
        />
        <SignUpInput
          placeholder="비밀번호를 재입력해주세요."
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginBottom: 19}}
          onChangeText={onChangePasswordre}
          secureTextEntry={true}
          value={passwordRe}
        />
      </InnerContainer>
      <ButtonContainer>
        <CancelButton onPress={onCancel} />
        <SubmitButton title={'가입하기'} onPress={onSubmit} />
      </ButtonContainer>
    </Container>
  );
}

export default SignUpScreen;
