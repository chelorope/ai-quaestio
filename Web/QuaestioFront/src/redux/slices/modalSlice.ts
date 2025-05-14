import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type: "",
};

export const counterSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.type = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { openModal, closeModal } = counterSlice.actions;

export default counterSlice.reducer;
