import React from 'react';
import {View, Image} from 'react-native';
import styled from '@emotion/native';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 0;
`;

const StyledImage = styled.Image`
  width: 45%;
  margin-top: -30%;
  resize-mode: contain;
  z-index: 10;
`;

function Splash() {
  return (
    <Container>
      <StyledImage source={require('../assets/images/popzip_main.png')} />
    </Container>
  );
}

export default Splash;
