import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axiosInstance from '../../axiosInstance';

export const checkUserLogin = createAsyncThunk(
  'auth/checkUserLogin',
  async (_, {rejectWithValue}) => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (!storedUser) {
        return rejectWithValue('No user data found');
      }

      const user = JSON.parse(storedUser);
      const response = await axiosInstance.post(
        'http://localhost:8080/login',
        user,
      );
      // const response = await axios.post('http://localhost:8080/login', user);

      if (response.data === true) {
        return user;
      } else {
        console.log('checkUserLogin res.data: ', response.data);
        return rejectWithValue('User not authenticated');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserLogin.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(checkUserLogin.rejected, (state, action) => {
        state.user = null;
      });
  },
});

export const {setUser, clearUser} = authSlice.actions;
export default authSlice.reducer;
