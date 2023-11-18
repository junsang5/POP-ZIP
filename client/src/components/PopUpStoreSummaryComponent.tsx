import React from 'react';
import {View, Text} from 'react-native';
import styled from '@emotion/native';

const Container = styled.View`
  display: flex;
  // width: 80%;
  width: 340px;
  height: 160px;
  background-color: #e9f9ff;
  margin: 10px auto;
  border-radius: 24px;
`;

const PopUpStoreSummaryComponent = ({data}) => {
  return (
    <Container>
      <Text>{data.name}</Text>
    </Container>
  );
};

export default PopUpStoreSummaryComponent;
