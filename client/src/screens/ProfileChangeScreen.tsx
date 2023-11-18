import * as React from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

const Input = styled.TextInput`
  height: 40px;
  border-color: gray;
  border-width: 1px;
  margin-bottom: 20px;
  padding-left: 10px;
`;

const SaveButton = styled.Button`
  background-color: #000000;
`;

function ProfileChangeScreen() {
  const navigation = useNavigation();
  const [userId, setUserId] = React.useState('');

  const handleSave = () => {
    // 아이디 변경 로직 구현
    console.log('UserId Changed to: ', userId);
    Alert.alert('Profile Updated', 'Your profile has been updated.', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <Container>
      <Input
        value={userId}
        onChangeText={setUserId}
        placeholder="Enter your new UserId"
      />
      <SaveButton title="Save Changes" onPress={handleSave} />
    </Container>
  );
}

export default ProfileChangeScreen;
