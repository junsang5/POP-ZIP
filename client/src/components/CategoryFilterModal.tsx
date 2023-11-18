import React, {useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import styled from '@emotion/native';

const FilterButton = styled.TouchableOpacity`
  background-color: ${props => (props.selected ? '#ddd' : 'white')};
  border-radius: 5px;
  margin-top: 10;
`;

const CategoryFilterModal = ({setFilter, closeModal}) => {
  const [selectedList, setSelectedList] = useState([]);
  const categories = [
    'street',
    'contemporary',
    'casual',
    'vintage',
    'amekaji',
    'highend',
  ];

  const handleSetFilter = category => {
    if (selectedList.includes(category)) {
      setSelectedList(selectedList.filter(item => item !== category));
    } else {
      setSelectedList([...selectedList, category]);
    }
  };

  const handleFinishSelection = () => {
    setFilter(selectedList);
    closeModal();
  };

  return (
    <SafeAreaView>
      {categories.map(category => (
        <FilterButton
          key={category}
          selected={selectedList.includes(category)}
          onPress={() => handleSetFilter(category)}>
          <Text>{category}</Text>
        </FilterButton>
      ))}
      <TouchableOpacity onPress={handleFinishSelection}>
        <Text>완료</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CategoryFilterModal;
