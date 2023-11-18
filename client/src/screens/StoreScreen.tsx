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

function StoreScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <PopupImage
          source={{
            uri: 'https://k.kakaocdn.net/dn/OgWSd/btsvoWU2HOn/TybFyU1PsqperlcIAOxZu0/img_640x640.jpg',
          }}
        />
        <PopupName>AIR JORDAN: The Shot</PopupName>
        <LogoContainer>
          <LogoImage
            source={{
              uri: 'https://k.kakaocdn.net/dn/OgWSd/btsvoWU2HOn/TybFyU1PsqperlcIAOxZu0/img_640x640.jpg',
            }}
          />
          <LogoText>AIR JORDAN</LogoText>
        </LogoContainer>

        <InfoContainer>
          <InfoItem
            iconUri="https://www.figma.com/file/sZT3d2ToaiqERKIo13agU5/Untitled?type=design&node-id=378-460&mode=dev"
            text="서울 종로구 갤러리 12-34"
          />
          <InfoItem
            iconUri="http://example.com/calendar-icon.png"
            text="2023.09.14~2023.09.30"
          />
          <InfoItem
            iconUri="http://example.com/type-icon.png"
            text="실내/스튜디오"
          />
          <InfoItem
            iconUri="http://example.com/type-icon.png"
            text="운영시간: 월~금, 09:00~18:00, 주말 휴무"
          />
        </InfoContainer>
        <DetailContainer>
          <DetailTitle>상세</DetailTitle>
          <DetailBody>
            서울 중구 롯데백화점 본점 지하 1층, 개장 전부터 '소버 유니온'
            팝업스토어 앞에 고객들이 모여들더니 어느새 긴 줄이 생겼다. 화려한
            색감의 빈티지 잡지를 한 장 한 장 모아 빼곡하게 채운 바닥이 눈길을
            끄는 이번 팝업스토어는 롯데백화점과 '레트로 감성'을 담은 스트리트
            컬쳐 브랜드 소버 유니온의 협업을 통해 탄생한 공간이다. 지난 14일
            롯데백화점이 문을 열고 오는 20일까지 '스트리트 컬쳐'를 테마로 한
            유통업계 최대 규모의 빈티지 팝업 스토어를 선보이는 매장을 직접
            가봤다. '스니커즈 언박스드 서울'과 연계한 이번 팝업스토어는
            1970~1980년대 '스트리트 컬쳐'를 낯설고 또 힙(hip)하게 받아들이는 MZ
            세대를 겨냥해 꾸며진 공간이다. 당시 스트리트 감성을 고스란히 느낄 수
            있는 각종 빈티지 의류와 소품을 한자리에서 만나볼 수 있다.
          </DetailBody>
        </DetailContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

export default StoreScreen;
