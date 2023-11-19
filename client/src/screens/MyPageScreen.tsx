import * as React from 'react';
import {Linking, Alert, SafeAreaView, View} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

const ProfileContainer = styled.View`
  background-color: #ffffff;
  padding: 10px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
`;

const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-left: 10px;
`;

// 사용자 이름과 상태 메시지를 포함하는 컨테이너
const UserInfo = styled.View`
  margin-left: 10px;
`;

// 사용자 이름 텍스트 스타일
const UserName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  padding: 3px 2px;
`;

// 상태 메시지 텍스트 스타일
const UserId = styled.Text`
  font-size: 16px;
  color: #555;
  padding: 0px 2px;
`;

const UserType = styled.Text`
  font-size: 16px;
  color: #555;
  padding: 0px 2px;
`;

// 프로필 카드 컴포넌트
const UserProfileCard = ({imageUrl, userName, userId, userType}) => {
  return (
    <ProfileContainer>
      <ProfileImage source={{uri: imageUrl}} />
      <UserInfo>
        <UserName>{userName}</UserName>
        <UserId>{userId}</UserId>
        <UserType>{userType}</UserType>
      </UserInfo>
    </ProfileContainer>
  );
};

const MenuContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

const MenuItem = styled.TouchableOpacity`
  background-color: #ffffff;
  padding: 20px;
  width: 90%;
  margin-bottom: 10px;
  border-radius: 10px;
  align-items: center;
`;

const MenuText = styled.Text`
  color: #000000;
  font-size: 16px;
`;

function MyPageScreen() {
  const navigation = useNavigation();

  // 회원정보 수정 스크린으로 라우팅 함수
  const handleEditProfile = () => {
    navigation.navigate('ProfileChange');
    console.log('move to profilechange');
  };

  // 로그아웃 함수
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Yes', onPress: () => console.log('Logged Out')}, // 로그아웃 처리 로직 구현
    ]);
  };

  const handleDeleteAccount = () => {
    // 회원 탈퇴 로직 구현
    Alert.alert('Delete Account', 'Do you want to delete your account?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'OK',
        onPress: () => {
          console.log('Account Deleted');
          navigation.navigate('Home');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <UserProfileCard
          imageUrl="https://k.kakaocdn.net/dn/OgWSd/btsvoWU2HOn/TybFyU1PsqperlcIAOxZu0/img_640x640.jpg"
          userName="김효원"
          userId="kev_hy1042"
          userType="스트릿 매니아"
        />
      </View>

      <MenuContainer>
        <MenuItem onPress={handleEditProfile}>
          <MenuText>회원정보 수정</MenuText>
        </MenuItem>
        <MenuItem onPress={handleLogout}>
          <MenuText>로그아웃</MenuText>
        </MenuItem>
        <MenuItem onPress={handleDeleteAccount}>
          <MenuText>탈퇴</MenuText>
        </MenuItem>
      </MenuContainer>
    </SafeAreaView>
  );
}

export default MyPageScreen;
