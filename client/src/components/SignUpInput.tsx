import styled from '@emotion/native';
import React, {FC} from 'react';
import {Platform, ViewStyle} from 'react-native';

type Props = {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  secureTextEntry?: boolean;
};

const SInput = styled.TextInput`
  background-color: #fff; // 입력창 배경색
  border: 1px solid #ddd; // 경계선 스타일
  border-radius: 8px; // 입력창 모서리 둥글게
  width: 90%; // 너비 설정
  padding: 15px; // 내부 패딩
  margin-vertical: 10px; // 수직 마진
`;

const SignUpInput: FC<Props> = ({
  value,
  placeholder,
  secureTextEntry,
  style,
  onChangeText,
}) => {
  return (
    <SInput
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={style}
    />
  );
};

export default SignUpInput;
