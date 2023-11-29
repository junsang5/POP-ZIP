import React from 'react';
import SplashContainer from '../containers/auth/SplashContainer';
import {SafeAreaView} from 'react-native';

function SplashScreen({navigation}) {
  return (
    <SafeAreaView>
      <SplashContainer navigation={navigation} />
    </SafeAreaView>
  );
}

export default SplashScreen;
