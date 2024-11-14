// redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  otpData: {},
};

const otpSlice = createSlice({
  name: "otpData",
  initialState,
  reducers: {
    storeOTPData(state, action) {
      state.otpData = action.payload;
    },
    removeOTPData(state) {
      state.otpData = null;
    },
  },
});

export const { storeOTPData, removeOTPData } = otpSlice.actions;
export default otpSlice.reducer;
