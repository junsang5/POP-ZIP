import React, {useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import styled from '@emotion/native';

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); // Semi-transparent background
`;

const ModalContent = styled.View`
  width: 90%;
  height: auto; // Fixed height for the modal content
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const FilterButton = styled.TouchableOpacity`
  background-color: ${props => (props.selected ? '#EDF7FF' : 'white')};
  border-radius: 5px;
  border: ${props => (props.selected ? '#34A1DC' : '#9E9E9E')};
  margin: 10px;
  padding: 10px;
  width: 80%; // Make buttons wider
  align-items: center; // Center text in the button
`;

const FilterText = styled.Text`
  color: ${props => (props.selected ? '#2B4454' : 'black')};
`;

const FinishButton = styled.TouchableOpacity`
  background-color: #7DC3E9;
  border-radius: 12px;
  margin: 20px;
  padding: 10px;
  width: 40%;
  align-items: center; // Center text in the button
`;
const FinishText= styled.Text`
  color: white;
`;

const CategoryFilterModal = ({selectedCategories, setFilter, closeModal}) => {
  const [selectedList, setSelectedList] = useState(selectedCategories);

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
    <ModalContainer>
      <ModalContent>
        {categories.map(category => (
          <FilterButton
            key={category}
            selected={selectedList.includes(category)}
            onPress={() => handleSetFilter(category)}>
            <FilterText selected={selectedList.includes(category)}>
              {category}
            </FilterText>
          </FilterButton>
        ))}
        <FinishButton onPress={handleFinishSelection}>
          <FinishText>완료</FinishText>
        </FinishButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default CategoryFilterModal;
