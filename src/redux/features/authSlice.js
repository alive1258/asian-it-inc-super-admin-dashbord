// redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { storeUser, logout } = authSlice.actions;
export default authSlice.reducer;
