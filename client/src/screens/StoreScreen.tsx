import React from 'react';
import {ScrollView, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const screenWidth = Dimensions.get('window').width;

const PopupImage = styled.Image`
  width: ${screenWidth}px;
  height: ${screenWidth}px;
`;

const PopupName = styled.Text`
  font-size: 24px;
  margin-left: 10px;
`;

const LogoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const LogoImage = styled.Image`
  width: 50px;
  height: 50px;
  resize-mode: cover;
`;

const LogoText = styled.Text`
  font-size: 24px;
  margin-left: 10px;
`;

const InfoContainer = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 5px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px;
`;

const Icon = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const InfoText = styled.Text`
  font-size: 16px;
  color: #333;
`;

const InfoItem = ({iconUri, text}) => (
  <Row>
    <Icon source={{uri: iconUri}} />
    <InfoText>{text}</InfoText>
  </Row>
);

const DetailContainer = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

const DetailTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const DetailBody = styled.Text`
  font-size: 16px;
  line-height: 24px;
`;

function StoreScreen({route}) {
  const {popup} = route.params;
  return (
    <SafeAreaView>
      <ScrollView>
        <PopupImage
          source={{
            uri: popup.image,
          }}
        />
        <PopupName>{popup.name}</PopupName>
        <LogoContainer>
          <LogoImage
            source={{
              uri: popup.brandLogo, // brandLogo는 popup 객체 내에 있는 브랜드 로고 URL입니다.
            }}
          />
          <LogoText>{popup.brand}</LogoText>
        </LogoContainer>

        <InfoContainer>
          <InfoItem
            iconUri="https://www.figma.com/file/sZT3d2ToaiqERKIo13agU5/Untitled?type=design&node-id=378-460&mode=dev"
            text={popup.address}
          />
          <InfoItem
            iconUri="http://example.com/calendar-icon.png"
            text={`${popup.startDate}~${popup.endDate}`}
          />
          <InfoItem
            iconUri="http://example.com/type-icon.png"
            text={popup.category}
          />
          {/* 운영시간은 제외한다고 했으므로 이 부분은 주석 처리하거나 삭제합니다.
          <InfoItem
            iconUri="http://example.com/type-icon.png"
            text="운영시간 정보"
          />
          */}
        </InfoContainer>
        <DetailContainer>
          <DetailTitle>상세</DetailTitle>
          <DetailBody>{popup.description}</DetailBody>
        </DetailContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

export default StoreScreen;
