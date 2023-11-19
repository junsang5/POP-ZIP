import React from 'react';
import SplashContainer from '../containers/auth/SplashContainer';
import {View} from 'react-native';

function SplashScreen({navigation}) {
  return (
    <View>
      <SplashContainer navigation={navigation} />
    </View>
  );
}

export default SplashScreen;
