import {View, TextInput} from 'react-native';
import React, {useState} from 'react';
import styled from '@emotion/native';

const SearchBarContainer = styled.View``;

const SearchBar = styled.TextInput``;

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <SearchBarContainer>
      <SearchBar
        placeholder="검색"
        value={searchQuery}
        onChangeText={setSearchQuery}
        // onSubmitEditing={handleSearch}
      />
    </SearchBarContainer>
  );
}
