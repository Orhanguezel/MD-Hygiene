// ✅ src/features/invoices/invoicesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import invoicesData from '@/data/invoices.json';

const initialState = {
  invoices: invoicesData || [],
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    addInvoice: (state, action) => {
      state.invoices.unshift(action.payload); // ✅ Yeni faturayı listenin başına ekler
    },
    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter((inv) => inv.id !== action.payload); // ✅ ID'ye göre siler
    },
  },
});

export const { addInvoice, deleteInvoice } = invoicesSlice.actions;
export default invoicesSlice.reducer;