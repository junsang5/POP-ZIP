import React, {useState} from 'react';
import {ScrollView, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';

const StyledSafeAreaView = styled.SafeAreaView`
  background-color: white;
`;
const BackButtonContainer = styled.View`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
`;
const BackButton = styled.TouchableOpacity`
  margin-top: 10px;
`;
const BackIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

const StyledScrollView = styled.ScrollView`
  margin-top: 30px;
`;

const PopupImage = styled.Image`
  width: 100%;
  height: 400px;
`;

const PopupName = styled.Text`
  font-size: 24px;
  margin: 12px 12px;
  font-weight: 700;
`;

const BrandText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  margin-left: 14px;
`;

const InfoContainer = styled.View`
  margin: 5px;
`;

const DetailContainer = styled.View`
  flex: 1;
  margin: 0px 10px;
`;

const DetailTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
`;

const DetailBody = styled.Text`
  font-size: 13px;
  font-weight: 500;
  line-height: 24px;
  margin-bottom: 24px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px;
`;

const Icon = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 4px;
`;

const InfoText = styled.Text`
  font-size: 12px;
  font-weight: 600;
`;

function StoreScreen({route}) {
  const [imageLoadSuccess, setImageLoadSuccess] = useState(true);
  const fallbackImage = require('../assets/images/popzip_main.png');
  const navigation = useNavigation();
  const {
    name,
    category,
    address,
    start_date,
    end_date,
    brand,
    imageurl,
    description,
  } = route.params.popup;
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <StyledSafeAreaView style={{flex: 1}}>
      <BackButtonContainer>
        <BackButton onPress={() => navigation.goBack()}>
          <BackIcon source={require('../assets/images/arrow_back.png')} />
        </BackButton>
      </BackButtonContainer>
      <StyledScrollView showsVerticalScrollIndicator={false}>
        <PopupImage
          source={imageLoadSuccess ? {uri: imageurl} : fallbackImage}
          onError={() => setImageLoadSuccess(false)}
          resizeMode={imageLoadSuccess ? 'cover' : 'contain'}
        />
        <PopupName>{name ? name : '??'}</PopupName>
        <BrandText>{brand ? brand : '??'}</BrandText>
        <InfoContainer>
          <Row>
            <Icon source={require('../assets/images/category_map.png')} />
            <InfoText>{address ? address : '??'}</InfoText>
          </Row>
          <Row>
            <Icon source={require('../assets/images/category_date.png')} />
            <InfoText>{`${start_date} ~ ${end_date}`}</InfoText>
          </Row>
          <Row>
            <Icon source={require('../assets/images/category_category.png')} />
            <InfoText>{category ? category : '??'}</InfoText>
          </Row>
        </InfoContainer>
        {description && (
          <DetailContainer>
            <DetailTitle>상세</DetailTitle>
            <DetailBody>{description}</DetailBody>
          </DetailContainer>
        )}
      </StyledScrollView>
    </StyledSafeAreaView>
  );
}

export default StoreScreen;
