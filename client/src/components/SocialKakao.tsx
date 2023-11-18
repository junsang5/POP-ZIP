// KakaoLoginButton.js
import React from 'react';
import {TouchableOpacity, Text, Alert} from 'react-native';
import {authorize} from 'react-native-app-auth';
import styled from '@emotion/native';

const AA = styled.TouchableOpacity`
  margin: 30px auto;
`;

const config = {
  clientId: '35002dd0bcd6810558d0b7c45627f77f', // Kakao에서 제공하는 REST API 키
  redirectUrl: 'kakaof62c85807f4688c405c4e215b5493b67://oauth', // 카카오 개발자 설정에 등록한 리다이렉트 URI
  scopes: ['profile', 'account_email'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://kauth.kakao.com/oauth/authorize',
    tokenEndpoint: 'https://kauth.kakao.com/oauth/token',
  },
};

const KakaoLoginButton = () => {
  const handleKakaoLogin = async () => {
    try {
      const authState = await authorize(config);
      // 이제 authState에 액세스 토큰이 포함되어 있습니다.
      // 필요한 API 호출에 이 토큰을 사용할 수 있습니다.
      console.log(authState);
    } catch (error) {
      Alert.alert('로그인 실패', error.message);
    }
  };

  return (
    <AA onPress={handleKakaoLogin}>
      <Text>카카오로 로그인</Text>
    </AA>
  );
};

export default KakaoLoginButton;
