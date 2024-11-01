import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  nama_depan: '',
  nama_belakang: '',
  password: '',
  conf_password: '',
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    updateForm: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    resetForm: () => initialState,
  },
});

export const { updateForm, resetForm } = registerSlice.actions;
export default registerSlice.reducer;
