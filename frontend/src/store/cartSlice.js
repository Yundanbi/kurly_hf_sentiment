import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    name: "[차려낸] 살얼음 육수 냉메밀소바 2인분",
    quantity: 1,
    thumbnail: "img/json/1.jpg",
    product_choice: {
      discount_price: "7,900원",
      original: "9,900원",
    },
  },
  {
    id: "2",
    name: "[넉넉] 고구마 듬뿍 사워도우 (380g)",
    quantity: 1,
    thumbnail: "img/json/2.jpg",
    product_choice: {
      discount_price: "6,800원",
      original: "8,200원",
    },
  },
  {
    id: "3",
    name: "[빕스] 바베큐 폭립 오리지날 450g",
    quantity: 1,
    thumbnail: "img/json/3.jpeg",
    product_choice: {
      discount_price: "12,180원",
      original: "17,500원",
    },
  },
];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exists = state.find((item) => item.id === action.payload.id);
      if (exists) {
        exists.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    changeQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, changeQuantity } = cartSlice.actions;
export default cartSlice.reducer;
