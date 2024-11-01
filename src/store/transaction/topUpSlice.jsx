import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inputAmount: '',
  topUpAmount: 0,
  error: '',
  isModalOpen: false,
  invoiceNumber: '',
};

const topUpSlice = createSlice({
  name: 'topUp',
  initialState,
  reducers: {
    setInputAmount(state, action) {
      state.inputAmount = action.payload;
    },
    setTopUpAmount(state, action) {
      state.topUpAmount = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    toggleModal(state) {
      state.isModalOpen = !state.isModalOpen;
    },
    setInvoiceNumber(state, action) {
      state.invoiceNumber = action.payload;
    },
    resetTopUp(state) {
      state.inputAmount = '';
      state.topUpAmount = 0;
      state.error = '';
      state.isModalOpen = false;
      state.invoiceNumber = '';
    },
  },
});

export const {
  setInputAmount,
  setTopUpAmount,
  setError,
  toggleModal,
  setInvoiceNumber,
  resetTopUp,
} = topUpSlice.actions;

export default topUpSlice.reducer;
