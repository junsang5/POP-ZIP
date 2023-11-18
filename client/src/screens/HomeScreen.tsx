import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';

// 스타일드 컴포넌트 정의

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

const HomeItem = ({titleText, subText, imageUri}) => (
  <Column>
    <HomeTitle>{titleText}</HomeTitle>
    <HomeSubTitle>{subText}</HomeSubTitle>
    <HomeImage source={{uri: imageUri}} />
  </Column>
);

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

// 메인 컴포넌트
const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView>
      <Header>
        <EmptyView />
        <Icon
          source={{
            uri: 'https://k.kakaocdn.net/dn/OgWSd/btsvoWU2HOn/TybFyU1PsqperlcIAOxZu0/img_640x640.jpg',
          }}
        />

        {/* 이미지를 TouchableWithoutFeedback으로 감싸서 클릭 이벤트 처리 */}
        <TouchIcon onPress={() => setModalVisible(true)}>
          <Icon
            source={{
              uri: 'https://k.kakaocdn.net/dn/OgWSd/btsvoWU2HOn/TybFyU1PsqperlcIAOxZu0/img_640x640.jpg',
            }}
          />
        </TouchIcon>
      </Header>

      {/* 이미지를 클릭했을 때 나타나는 모달 추가 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* 아래에 모달을 클릭할 떄 띄울 것 */}
            <ScrollView style={{maxHeight: '80%'}}>
              <TouchableWithoutFeedback>
                <Container>
                  <Card>
                    <CardText>헤더 | 비티지의 근본, Diagol 개장</CardText>
                    <CardText>Diagol의 피규어 팝업 스토어소식,</CardText>
                    <CardText>오전 POP:ZIP 화이팅캠페인</CardText>
                  </Card>
                  <Card>
                    <CardText>소식 | 마감 임박 Pop-up !</CardText>
                    <CardText>세계 최고의 디자이너 Jackson,</CardText>
                    <CardText>국내 유일 팝업스토어 D-1</CardText>
                  </Card>
                </Container>
              </TouchableWithoutFeedback>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <ScrollView>
        <HomeItem
          titleText="윤진원님을 위한 추천"
          subText="ADERREROR X CONVERS"
          imageUri="https://k.kakaocdn.net/dn/OgWSd/btsvoWU2HOn/TybFyU1PsqperlcIAOxZu0/img_640x640.jpg"
        />
        <HomeItem
          titleText="최근 업데이트"
          subText="Don't forget! Keep up the NEWS"
          imageUri="https://k.kakaocdn.net/dn/OgWSd/btsvoWU2HOn/TybFyU1PsqperlcIAOxZu0/img_640x640.jpg"
        />
        <HomeItem
          titleText="가장 인기"
          subText="THE AVENGERS"
          imageUri="https://k.kakaocdn.net/dn/OgWSd/btsvoWU2HOn/TybFyU1PsqperlcIAOxZu0/img_640x640.jpg"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
