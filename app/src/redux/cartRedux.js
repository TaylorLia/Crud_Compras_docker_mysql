import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    error: false,
    success : null,
    isFetching: false
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    saveCartStart : (state, action) => {
      state.isFetching = true
    },
    saveCartSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
      state.success = true;
    },
    saveCartFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.success = false;
    },
  },
});

export const { addProduct, saveCartStart, saveCartSuccess, saveCartFailure } = cartSlice.actions;
export default cartSlice.reducer;