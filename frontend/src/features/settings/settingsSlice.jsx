import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "EUR", // Varsayılan para birimi
  shippingCost: 50, // Varsayılan nakliye ücreti
  taxRate: 19, // Varsayılan vergi oranı (%)
  paymentMethods: {
    paypal: false,
    stripe: false,
    bankTransfer: false,
  },
  texts: {
    settings: {
      title: "Genel Ayarlar",
      currency: "Para Birimi",
      shippingCost: "Nakliye Ücreti",
      taxRate: "Vergi Oranı",
      paymentMethods: "Ödeme Yöntemleri",
      paypal: "PayPal",
      stripe: "Stripe",
      bankTransfer: "Banka Havalesi",
      saveSettings: "Ayarları Kaydet",
    },
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setShippingCost: (state, action) => {
      state.shippingCost = action.payload;
    },
    setTaxRate: (state, action) => {
      state.taxRate = action.payload;
    },
    togglePaymentMethod: (state, action) => {
      state.paymentMethods[action.payload] = !state.paymentMethods[action.payload];
    },
  },
});

export const { setCurrency, setShippingCost, setTaxRate, togglePaymentMethod } = settingsSlice.actions;
export default settingsSlice.reducer;
