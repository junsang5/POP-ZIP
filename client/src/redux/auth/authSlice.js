import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import axiosInstance from '../../axiosInstance';

export const getUserInfo = createAsyncThunk(
  'auth/getUserInfo',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userid = await AsyncStorage.getItem('userid');
      const response = await axios.get(`http://localhost:8080/user/${userid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!token || !userid) {
        return rejectWithValue(
          'getUserInfo: No user data found (in AsyncStorage)',
        );
      }
      console.log('[getUserInfo] response user: ', response.data);
      console.log('[getUserInfo] finish!! response success!!');
      return response.data; // {id, userId, email, userName, role}
    } catch (error) {
      console.error('getUserInfo:', error);
      return rejectWithValue(error.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({userid, password}, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/auth/authenticate',
        {
          userid: userid,
          password: password,
        },
      );
      const res = response.data;
      const user = res.user;
      const token = res.token;
      console.log('[loginUser] response user: ', res.user);
      console.log('[loginUser] response token: ', res.token);

      if (!res || res.error) {
        throw new Error('로그인에 실패했습니다.');
      }

      await AsyncStorage.setItem('token', token);
      console.log('[loginUser] Storage token: ', token);
      console.log('[loginUser] finish!! response success!!');
      return {user, token};
    } catch (error) {
      console.error('loginUser:', error);
      return rejectWithValue(error.message);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // {"email": "이메일", "id": null, "role": "ROLE_USER", "userId": "아이디", "userName": "이름"}
    isLoggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = null;
    },
    setIsLoggedIn: state => {
      state.isLoggedIn = true;
    },
    clearIsLoggedIn: state => {
      state.isLoggedIn = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        // getUserInfo 액션의 결과로 받아온 사용자 정보를 스토어에 저장 {"email": "이메일", "id": null, "role": "ROLE_USER", "userId": "아이디", "userName": "이름"}
        state.user = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.user = null;
      });
  },
});

export const {setUser, clearUser, setIsLoggedIn, clearIsLoggedIn} =
  authSlice.actions;
export default authSlice.reducer;
