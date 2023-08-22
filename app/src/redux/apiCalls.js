import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "./userRedux";
import { saveStart, saveSuccess, saveFailure } from "./productRedux";
import { saveCartStart, saveCartSuccess, saveCartFailure }  from "./cartRedux";
import { pedidoSuccess }  from "./pedidoRedux";
import { publicRequest, userRequest } from "../requestMethods";

//REGISTER
export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

//LOGIN
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

//CADASTRO DE PRODUTO
export const saveProduct = async (dispatch, produto, token) => {
  dispatch(saveStart());
  try {
    const res = await userRequest.post("/products", produto, { headers :{ 'token': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjg3NTg3NzYxLCJleHAiOjE2ODc4NDY5NjF9.o1u0gF7YOEOB4X6RMAAqSLZPqfbDUSgAYYnsZOpUvOw"} });
    dispatch(saveSuccess());
  } catch (err) {
    console.log(err);
    dispatch(saveFailure());
  }
};
export const saveCart = async (dispatch, cart) => {
  dispatch(saveCartStart());
  try {
    const res = await userRequest.post("/orders", cart, { headers :{ 'token': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjg3NTg3NzYxLCJleHAiOjE2ODc4NDY5NjF9.o1u0gF7YOEOB4X6RMAAqSLZPqfbDUSgAYYnsZOpUvOw"} });
    dispatch(saveCartSuccess());
    console.log(res.data?.pedido, 'AAAA, toma o numero do pedido')
    dispatch(pedidoSuccess(res.data?.pedido))
  } catch (err) {
    console.log(err);
    dispatch(saveCartFailure());
  }
};