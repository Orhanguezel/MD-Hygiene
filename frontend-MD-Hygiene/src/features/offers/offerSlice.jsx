// ✅ src/features/offer/offerSlice.js
import { createSlice } from '@reduxjs/toolkit';
import offersData from '@/data/offers.json';

const initialState = JSON.parse(localStorage.getItem("offers")) || offersData;

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    setOffers: (state, action) => action.payload,
    addOffer: (state, action) => {
      state.push(action.payload);
    },
    updateOffer: (state, action) => {
      const index = state.findIndex((offer) => offer.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
    deleteOffer: (state, action) => {
      return state.filter((offer) => offer.id !== action.payload);
    },
    changeStatus: (state, action) => {
      const offer = state.find((offer) => offer.id === action.payload.id);
      if (offer) {
        offer.status = action.payload.status;
      }
    },
  },
});

export const { setOffers, addOffer, updateOffer, deleteOffer, changeStatus } = offerSlice.actions;
export default offerSlice.reducer;