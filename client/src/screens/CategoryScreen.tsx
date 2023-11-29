import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Pressable,
} from 'react-native';
import PopUpStoreSummaryComponent from '../components/PopUpStoreSummaryComponent';
import CategoryFilterModal from '../components/CategoryFilterModal';
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
  background-color: #2b4454;
  bottom: 10px;
  padding: 6px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 30px;
`;
const FilterText = styled.Text`
  color: #fff; // 텍스트 색상
  font-size: 12px; // 폰트 크기
  font-weight: 700; // 폰트 두께
`;

const CategoryScreen = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredPopUpStores, setFilteredPopUpStores] = useState([]);

  const popUpStores = useSelector(state => state.popups);

  useEffect(() => {
    // console.log('popUpStores', popUpStores);
    console.log('(CategoryScreen)selectedCategories: ', selectedCategories);
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

  const handlePressStore = store => {
    navigation.navigate('Store', {popup: store});
  };

  const renderPopUpStore = ({item}) => (
    <PopUpStoreSummaryComponent
      onPress={() => handlePressStore(item)}
      data={item}
    />
  );

  return (
    <Container>
      <List
        data={filteredPopUpStores}
        renderItem={renderPopUpStore}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
      <FilterButton onPress={toggleModal}>
        <FilterText>필터</FilterText>
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
