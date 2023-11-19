import React from 'react';
import {Pressable, Text} from 'react-native';
import styled from '@emotion/native';

const Container = styled.Pressable`
  display: flex;
  // width: 80%;
  width: 340px;
  height: 160px;
  background-color: #e9f9ff;
  margin: 10px auto;
  border-radius: 24px;
`;

const PopUpStoreSummaryComponent = ({onPress, data}) => {
  const {id, name, brand, address, category, startDate, endDate} = data;
  return (
    <Container onPress={onPress}>
      <Text>{name}</Text>
      <Text>{brand}</Text>
      <Text>{address}</Text>
    </Container>
  );
};

export default PopUpStoreSummaryComponent;
