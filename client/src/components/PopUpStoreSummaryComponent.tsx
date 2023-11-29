import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import styled from '@emotion/native';

const Container = styled.Pressable`
  display: flex;
  flex-direction: row;
  width: 340px;
  height: auto;
  min-height: 160px;
  background-color: #e9f9ff;
  margin: 10px auto;
  border-radius: 24px;
  padding: 0;
  align-items: center;
`;

const InfoContainer = styled.View`
  flex-direction: column;
  // flex: 1;
  padding-left: 10px; // 이미지와 세부 정보 사이 간격 추가
`;

const PopUpImage = styled.Image`
  width: 40%;
  height: 100%;
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 10%;
  margin-bottom: 8px; // 아이템 사이 간격 추가
`;

const Icon = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 8px; // 아이콘과 텍스트 사이 간격 추가
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px; // 타이틀 아래 마진 추가
  margin-right: 40%;
`;

const DetailsText = styled.Text`
  font-size: 12px;
  font-weight: 600;
`;

const getLastWords = (words, numberOfWords) => {
  if (!words) {
    return '??';
  }
  const wordsList = words.split(' ');
  let addWord;
  if (wordsList.length > numberOfWords) {
    addWord = '..';
  } else {
    addWord = '';
  }
  return addWord + wordsList.slice(-numberOfWords).join(' ');
};

const PopUpStoreSummaryComponent = ({onPress, data}) => {
  const {name, brand, imageurl, address, category, start_date, end_date} = data;
  const [imageLoadSuccess, setImageLoadSuccess] = useState(true);
  const fallbackImage = require('../assets/images/popzip_main.png');

  const displayName = getLastWords(name, 4);
  const displayAddress = getLastWords(address, 4);

  return (
    <Container onPress={onPress}>
      <PopUpImage
        source={imageLoadSuccess ? {uri: imageurl} : fallbackImage}
        onError={() => setImageLoadSuccess(false)}
        resizeMode={imageLoadSuccess ? 'cover' : 'contain'}
      />
      <InfoContainer>
        <Title>{displayName}</Title>
        <Row>
          <Icon source={require('../assets/images/category_map.png')} />
          <DetailsText>{displayAddress}</DetailsText>
        </Row>
        <Row>
          <Icon source={require('../assets/images/category_date.png')} />
          <DetailsText>{`${start_date} ~ ${end_date}`}</DetailsText>
        </Row>
        <Row>
          <Icon source={require('../assets/images/category_category.png')} />
          <DetailsText>{category ? category : '??'}</DetailsText>
        </Row>
      </InfoContainer>
    </Container>
  );
};

export default PopUpStoreSummaryComponent;
