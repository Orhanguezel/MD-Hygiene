import { createSlice } from "@reduxjs/toolkit";

// LocalStorage'dan sepet verilerini yükle
const loadCartFromLocalStorage = () => {
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Sepet verileri yüklenemedi:", error);
    return [];
  }
};

// LocalStorage'a kaydetme
const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Sepet verileri kaydedilemedi:", error);
  }
};

// Toplam miktar ve fiyatı hesaplama
const calculateTotals = (cartItems) => {
  const totalQuantity = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.quantity || 0) * (item.price || 0), 0);
  return { totalQuantity, totalPrice };
};

const initialState = {
  cartItems: loadCartFromLocalStorage(),
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1; // Quantity her zaman tanımlı olur
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      const { totalQuantity, totalPrice } = calculateTotals(state.cartItems);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
      saveCartToLocalStorage(state.cartItems);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      const { totalQuantity, totalPrice } = calculateTotals(state.cartItems);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
      saveCartToLocalStorage(state.cartItems);
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        item.quantity = (item.quantity || 0) + 1;
      }
      const { totalQuantity, totalPrice } = calculateTotals(state.cartItems);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
      saveCartToLocalStorage(state.cartItems);
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        state.cartItems = state.cartItems.filter(cartItem => cartItem.id !== item.id);
      }
      const { totalQuantity, totalPrice } = calculateTotals(state.cartItems);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
      saveCartToLocalStorage(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      saveCartToLocalStorage(state.cartItems);
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
