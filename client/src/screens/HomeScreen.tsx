import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  SafeAreaView,
  Pressable,
  Dimensions,
  Image,
  Text,
  View,
} from 'react-native';
import styled from '@emotion/native';
import {useSelector} from 'react-redux';

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0 10px 0;
`;

const Logo = styled.Image`
  margin: 0 auto;
  width: 100px;
  aspect-ratio: 1.4/1;
`;

const HomeTitle = styled.Text`
  font-size: 25px;
  font-weight: 900;
  margin-left: 20px;
  text-align: center;
  color: #2b4454; // 제목 색상 업데이트
`;

const SlideContainer = styled.ScrollView`
  width: 340px;
  height: 300px;
  margin: 5px auto 20px auto;
`;

const HomeItemContainer = styled.Pressable`
  display: flex;
  overflow: hidden;
  width: 340px;
  height: 300px;
  align-items: center;
  justify-content: center;
`;

const HomeImage = styled.Image`
  width: 340px;
  height: 260px;
  border-radius: 12px;
`;

const HomeSubTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin-top: 5px;
  color: black;
`;

const Container = styled.View`
  margin-bottom: 200px;
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

const HomeItem = ({onPress, popup}) => {
  const [imageLoadSuccess, setImageLoadSuccess] = useState(true);
  const fallbackImage = require('../assets/images/popzip_main.png');
  return (
    <HomeItemContainer onPress={() => onPress(popup)}>
      <HomeImage
        source={imageLoadSuccess ? {uri: popup.imageurl} : fallbackImage}
        onError={() => setImageLoadSuccess(false)}
        resizeMode={imageLoadSuccess ? 'cover' : 'contain'}
      />
      <HomeSubTitle>{popup.name}</HomeSubTitle>
    </HomeItemContainer>
  );
};

const HomeScreen = ({navigation}) => {
  const [homePopups, setHomePopups] = useState([]);
  const [todayStartPopups, setTodayStartPopups] = useState([]);
  const [todayEndPopups, setTodayEndPopups] = useState([]);

  const popUpStores = useSelector(state => state.popups);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const currentDate = getCurrentDate();

    // view_home이 true인 팝업스토어만 필터링
    const filteredHomePopups = popUpStores.filter(popup => popup).slice(0, 3); // 최대 3개

    // start_date가 오늘인 팝업스토어만 필터링
    const filteredTodayStartPopups = popUpStores
      .filter(popup => popup.start_date === currentDate)
      .slice(0, 3); // 최대 3개

    // end_date가 오늘인 팝업스토어만 필터링
    const filteredTodayEndPopups = popUpStores
      .filter(popup => popup.end_date === currentDate)
      .slice(0, 3); // 최대 3개

    setHomePopups(filteredHomePopups);
    setTodayStartPopups(filteredTodayStartPopups);
    setTodayEndPopups(filteredTodayEndPopups);
  }, [popUpStores]);

  const handlePressImg = store => {
    navigation.navigate('Store', {popup: store});
  };
  const logoPath = require('../assets/images/pop_logo.png');
  return (
    <SafeAreaView>
      {user && (
        <Container>
          <Header>
            <Logo source={logoPath} />
          </Header>
          <ScrollView showsVerticalScrollIndicator={false}>
            {homePopups.length > 0 && (
              <>
                <HomeTitle>{`${user.username}님을 위한 추천`}</HomeTitle>
                <SlideContainer
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}>
                  {homePopups.map((popup, index) => (
                    <HomeItem
                      key={index}
                      onPress={handlePressImg}
                      popup={popup}
                    />
                  ))}
                </SlideContainer>
              </>
            )}
            {todayStartPopups.length > 0 && (
              <>
                <HomeTitle>오늘 오픈 팝업</HomeTitle>
                <SlideContainer
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}>
                  {todayStartPopups.map((popup, index) => (
                    <HomeItem
                      key={index}
                      onPress={handlePressImg}
                      popup={popup}
                    />
                  ))}
                </SlideContainer>
              </>
            )}
            {todayEndPopups.length > 0 && (
              <>
                <HomeTitle>오늘 마감 팝업</HomeTitle>
                <SlideContainer
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}>
                  {todayEndPopups.map((popup, index) => (
                    <HomeItem
                      key={index}
                      onPress={handlePressImg}
                      popup={popup}
                    />
                  ))}
                </SlideContainer>
              </>
            )}
          </ScrollView>
        </Container>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
