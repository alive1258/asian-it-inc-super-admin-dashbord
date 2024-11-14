import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attributes: [],
};

const dragDropAttribute = createSlice({
  name: "attribute",
  initialState,
  reducers: {
    addAttribute: (state, action) => {
      if (!state.attributes.includes(action.payload)) {
        state.attributes.push(action.payload);
      }
    },
    removeAttribute: (state, action) => {
      state.attributes = state.attributes.filter(
        (attribute) => attribute !== action.payload
      );
    },
    resetAttribute: (state) => {
      state.attributes = [];
    },
  },
});

export const { addAttribute, removeAttribute, resetAttribute } =
  dragDropAttribute.actions;

export default dragDropAttribute.reducer;
