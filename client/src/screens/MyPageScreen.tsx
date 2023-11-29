import * as React from 'react';
import {Linking, Alert, SafeAreaView, View} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {clearUser} from '../redux/auth/authSlice';
import {clearIsLoggedIn} from '../redux/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const UserEmail = styled.Text`
  font-size: 16px;
  color: #555;
  padding: 0px 2px;
`;

// 프로필 카드 컴포넌트
const UserProfileCard = ({imageUrl, userName, userId, userEmail}) => {
  return (
    <ProfileContainer>
      <ProfileImage source={imageUrl} />
      <UserInfo>
        <UserName>{userName}</UserName>
        <UserId>Id: {userId}</UserId>
        <UserEmail>Email: {userEmail}</UserEmail>
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
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  // 로그아웃 함수
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Yes',
        onPress: async () => {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('userid');
          dispatch(clearUser());
          dispatch(clearIsLoggedIn());
          console.log('Logged Out');
          navigation.navigate('SignIn');
        },
      },
    ]);
  };

  return (
    <>
      {user && (
        <SafeAreaView style={{flex: 1}}>
          <View>
            <UserProfileCard
              imageUrl={require('../assets/images/person.png')}
              userName={`${user.username}`}
              userId={`${user.userid}`}
              userEmail={`${user.email}`}
            />
          </View>
          <MenuContainer>
            <MenuItem onPress={handleLogout}>
              <MenuText>로그아웃</MenuText>
            </MenuItem>
          </MenuContainer>
        </SafeAreaView>
      )}
      {!user && (
        <MenuContainer>
          <MenuItem onPress={handleLogout}>
            <MenuText>로그아웃</MenuText>
          </MenuItem>
        </MenuContainer>
      )}
    </>
  );
}

export default MyPageScreen;
