import { createSlice } from "@reduxjs/toolkit";

const pedidoSlice = createSlice({
  name: "pedido",
  initialState: {
    numeroPedido: null,
  },
  reducers: {
    pedidoSuccess: (state, action) => {
      state.numeroPedido = action.payload;
    },
  },
});

export const { pedidoSuccess} = pedidoSlice.actions;
export default pedidoSlice.reducer;