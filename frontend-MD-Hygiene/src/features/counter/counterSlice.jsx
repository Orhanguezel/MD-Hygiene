// src/features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',         // Slice adı
  initialState: { value: 0 }, // Başlangıç state
  reducers: {
    increment: (state) => {
      state.value += 1;    // State’i doğrudan değiştirebiliriz (immer.js sayesinde)
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;  // Payload ile değer arttırma
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
