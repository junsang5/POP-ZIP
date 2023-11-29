import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import popupsReducer from './popups/popupSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    popups: popupsReducer,
  },
});

export default store;
