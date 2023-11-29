import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getUserInfo} from '../../redux/auth/authSlice';
import Splash from '../../components/Splash';
import {setUser} from '../../redux/auth/authSlice';

function SplashContainer({navigation}) {
  const dispatch = useDispatch();

  useEffect(() => {
    // 3초 지연 후에 로그인 상태 확인
    const timer = setTimeout(() => {
      dispatch(getUserInfo())
        .unwrap()
        .then(user => {
          // fulfilled (user = {userId, userName, age})
          console.log('Splash getUserInfo: user => ', user);
          navigation.replace('Root');
        })
        .catch(error => {
          // rejected
          console.error('Splash getUserInfo Error: ', error);
          navigation.replace('Root', {screen: 'SignIn'});
        });
    }, 3000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearTimeout(timer);
  }, [dispatch, navigation]);

  return <Splash />;
}

export default SplashContainer;
