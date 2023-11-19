import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';

const Header = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;

const EmptyView = styled(View)`
  width: 50px;
`;

const TouchIcon = styled(TouchableWithoutFeedback)`
  width: 50px;
`;

const Icon = styled(Image)`
  width: 50px;
  height: 50px;
`;

const Column = styled.View`
  flex-direction: Column;
  padding: 5px;
`;

const HomeImage = styled(Image)`
  width: 100%;
  height: 300px;
  margin-vertical: 10px;
`;

const HomeTitle = styled(Text)`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`;

const HomeSubTitle = styled(Text)`
  font-size: 18px;
  text-align: center;
  color: grey;
`;

const HomeItem = ({handlePressImg, titleText, subText, imageUri}) => {
  // subText = {팝업스토어 title}, imageUri = {팝업스토어 img}
  return (
    <Column>
      <HomeTitle>{titleText}</HomeTitle>
      <HomeSubTitle>{subText}</HomeSubTitle>
      <Pressable onPress={handlePressImg}>
        <HomeImage source={{uri: imageUri}} />
      </Pressable>
    </Column>
  );
};

// 카드 스타일 컴포넌트
const Card = styled.View`
  background-color: #80bfff;
  border-radius: 8px;
  padding: 30px;
  margin: 8px;
`;

// 텍스트 스타일 컴포넌트
const CardText = styled.Text`
  color: #004c8c;
  font-size: 18px;
  margin-bottom: 8px;
`;

// 전체 컨테이너
const Container = styled.View`
  flex: 1;
  padding: 0px;
  background-color: #f0f8ff;
  background-color: rgba(240, 248, 255, 0.3);
`;

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // month -> 2자리
  const date = today.getDate().toString().padStart(2, '0'); // date -> 2자리

  const formattedDate = `${year}-${month}-${date}`;
  console.log('today is ', formattedDate);
  return formattedDate;
};

const HomeScreen = ({navigation}) => {
  const [homePopups, setHomePopups] = useState([]);
  const [todayStartPopups, setTodayStartPopups] = useState([]);
  const [todayEndPopups, setTodayEndPopups] = useState([]);

  const popUpStores = useSelector(state => state.popups);
  const userName = useSelector(state => state.auth.user.userName);

  useEffect(() => {
    const currentDate = getCurrentDate();

    // view_home이 true인 팝업스토어만 필터링
    const filteredHomePopups = popUpStores
      .filter(popup => popup.viewHome === true)
      .slice(0, 3); // 최대 3개

    // start_date가 오늘인 팝업스토어만 필터링
    const filteredTodayStartPopups = popUpStores
      .filter(popup => popup.startDate === currentDate)
      .slice(0, 3); // 최대 3개

    // end_date가 오늘인 팝업스토어만 필터링
    const filteredTodayEndPopups = popUpStores
      .filter(popup => popup.endDate === currentDate)
      .slice(0, 3); // 최대 3개

    setHomePopups(filteredHomePopups);
    setTodayStartPopups(filteredTodayStartPopups);
    setTodayEndPopups(filteredTodayEndPopups);
  }, [popUpStores]);

  const handlePressImg = store => {
    navigation.navigate('Store', {popup: store});
  };
  return (
    <SafeAreaView>
      <Header>
        <EmptyView />
        <Icon
          source={{
            uri: 'https://k.kakaocdn.net/dn/OgWSd/btsvoWU2HOn/TybFyU1PsqperlcIAOxZu0/img_640x640.jpg',
          }}
        />
      </Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        {homePopups.map((popup, index) => (
          <HomeItem
            key={index}
            handlePressImg={() => handlePressImg(popup)}
            titleText={`${userName}님을 위한 추천`}
            subText={popup.name}
            imageUri={popup.image}
          />
        ))}
        {todayStartPopups.map((popup, index) => (
          <HomeItem
            key={index}
            handlePressImg={() => handlePressImg(popup)}
            titleText="오늘 오픈 팝업"
            subText={popup.name}
            imageUri={popup.image}
          />
        ))}
        {todayEndPopups.map((popup, index) => (
          <HomeItem
            key={index}
            handlePressImg={() => handlePressImg(popup)}
            titleText="오늘 마감 팝업"
            subText={popup.name}
            imageUri={popup.image}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
