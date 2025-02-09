// ✅ src/features/orders/ordersSlice.js
import { createSlice } from '@reduxjs/toolkit';
import ordersData from '@/data/orders.json';

const initialState = ordersData || [];

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload); // ✅ Yeni siparişi ekler
    },
    updateOrder: (state, action) => {
      const index = state.findIndex((order) => order.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload }; // ✅ Siparişi günceller
      }
    },
    deleteOrder: (state, action) => {
      return state.filter((order) => order.id !== action.payload); // ✅ Siparişi siler
    },
  },
});

export const { addOrder, updateOrder, deleteOrder } = ordersSlice.actions;
export default ordersSlice.reducer;