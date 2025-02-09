// ✅ src/features/products/productSlice.js
import { createSlice } from '@reduxjs/toolkit';
import productsData from '@/data/products.json';

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("products");
    return data ? JSON.parse(data) : productsData;
  } catch (error) {
    console.error("❌ LocalStorage verisi okunamadı:", error);
    return productsData;
  }
};

const saveToLocalStorage = (products) => {
  try {
    localStorage.setItem("products", JSON.stringify(products));
  } catch (error) {
    console.error("❌ LocalStorage'a veri kaydedilemedi:", error);
  }
};

const initialState = loadFromLocalStorage();

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => action.payload,
    addProduct: (state, action) => {
      state.push(action.payload);
      saveToLocalStorage(state);
    },
    updateProduct: (state, action) => {
      const index = state.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
        saveToLocalStorage(state);
      }
    },
    deleteProduct: (state, action) => {
      const newState = state.filter((product) => product.id !== action.payload);
      saveToLocalStorage(newState);
      return newState;
    },
  },
});

export const { setProducts, addProduct, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;