import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';
import PopUpStoreSummaryComponent from '../components/PopUpStoreSummaryComponent';
import CategoryFilterModal from '../components/CategoryFilterModal';
import SearchBar from '../components/SearchBar';
import styled from '@emotion/native';
import {useSelector} from 'react-redux';

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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredPopUpStores, setFilteredPopUpStores] = useState([]);

  const popUpStores = useSelector(state => state.popups);

  useEffect(() => {
    console.log('popUpStores', popUpStores);
    console.log('selectedCategories: ', selectedCategories);
    if (selectedCategories.length > 0) {
      const filteredStores = popUpStores.filter(store =>
        selectedCategories.includes(store.category),
      );
      setFilteredPopUpStores(filteredStores);
    } else {
      setFilteredPopUpStores(popUpStores);
    }
  }, [selectedCategories, popUpStores]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handlePressStore = () => {
    navigation.navigate('Store');
  };

  const renderPopUpStore = ({item}) => (
    <PopUpStoreSummaryComponent onPress={handlePressStore} data={item} />
  );

  return (
    <Container>
      <SearchBar prevScreen={'Category'} />
      <List
        data={filteredPopUpStores}
        renderItem={renderPopUpStore}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
      <FilterButton onPress={toggleModal}>
        <Text>필터</Text>
      </FilterButton>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <CategoryFilterModal
          selectedCategories={selectedCategories}
          setFilter={setSelectedCategories}
          closeModal={toggleModal}
        />
      </Modal>
    </Container>
  );
};

export default CategoryScreen;
