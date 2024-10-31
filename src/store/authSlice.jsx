import { loginUser } from '@/services/authService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk('auth/login', async (userData) => {
  const response = await loginUser(userData.email, userData.password);
  if (response.status !== 0) {
    throw new Error(response.message);
  }
  return response.data.token;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
