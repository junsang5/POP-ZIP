import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const fetchPopups = createAsyncThunk(
  'popups/fetchPopups',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('[fetchPopups] Storage token: ', token);
      const response = await axios.get('http://localhost:8080/popup/list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('fetch popup success!! popups: ', response.data);
      return response.data;
    } catch (error) {
      console.log('fetch popups error: ', error);
      console.log(error.response.status);
      return rejectWithValue(error.message);
    }
  },
);

const popupsSlice = createSlice({
  name: 'popups',
  initialState: [],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPopups.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default popupsSlice.reducer;
