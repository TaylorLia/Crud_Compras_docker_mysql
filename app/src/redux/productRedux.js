import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    isFetching: false,
    error: false,
    success : null
  },
  reducers: {
    saveStart: (state) => {
      state.isFetching = true;
    },
    saveSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
      state.success = true;
    },
    saveFailure: (state) => {
      state.success = false;
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { saveStart, saveSuccess, saveFailure } = productSlice.actions;
export default productSlice.reducer;