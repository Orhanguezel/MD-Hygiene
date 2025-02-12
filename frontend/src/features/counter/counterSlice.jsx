// src/features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 10 || [],
};

const counterSlice = createSlice({

  name: 'counter',         // Slice adı
  initialState,             // Başlangıç state
  reducers: {
    increment: (state) => {
      state.count += 1;    // State’i doğrudan değiştirebiliriz (immer.js sayesinde)
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;  // Payload ile değer arttırma
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
