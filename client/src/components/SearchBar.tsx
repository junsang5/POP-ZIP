// src/components/SearchBar.tsx
import React from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styled from '@emotion/native';

const Container = styled.View`
  display: flex;
  margin: 10px 0 10px 0;
  width: 347px;
  height: 36px;
  flex-direction: row;
  background-color: #e9f9ff;
  border-radius: 10px;
  padding: 10px;
`;

const Icon = styled.Image`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

const SearchPlaceholder = styled.Text`
  color: #000000;
`;

const SearchBar = ({prevScreen}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    // SearchScreen으로 이동
    navigation.navigate('Search', {state: {prev: prevScreen}});
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Container>
        <Icon source={require('../assets/images/search_icon.png')} />
        <SearchPlaceholder>Search</SearchPlaceholder>
      </Container>
    </TouchableOpacity>
  );
};

export default SearchBar;
