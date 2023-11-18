import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Modal, SafeAreaView} from 'react-native';
import PopUpStoreSummaryComponent from '../components/PopUpStoreSummaryComponent';
import CategoryFilterModal from '../components/CategoryFilterModal';
import SearchBar from '../components/SearchBar';
import styled from '@emotion/native';

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding-top: 10px; // 검색바 위쪽에 마진 추가
  background-color: #ffffff; // 배경색을 하얀색으로 설정
`;

const List = styled.FlatList``;

const FilterButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`;

const CategoryScreen = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filter, setFilter] = useState({category: []});

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const popUpStores = [
    {id: 1, name: 'AA'},
    {id: 2, name: 'BB'},
    {id: 3, name: 'CC'},
    {id: 4, name: 'DD'},
  ];

  const renderPopUpStore = ({item}) => (
    <PopUpStoreSummaryComponent data={item} />
  );

  return (
    <Container>
      <SearchBar prevScreen={'Category'} />
      <List
        data={popUpStores}
        renderItem={renderPopUpStore}
        keyExtractor={item => item.name}
      />

      <FilterButton onPress={toggleModal}>
        <Text>필터</Text>
      </FilterButton>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <CategoryFilterModal setFilter={setFilter} closeModal={toggleModal} />
      </Modal>
    </Container>
  );
};

export default CategoryScreen;
