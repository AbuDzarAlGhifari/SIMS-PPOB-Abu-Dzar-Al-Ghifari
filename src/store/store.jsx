import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import topUpReducer from './transaction/topUpSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    topUp: topUpReducer,
  },
});

export default store;
