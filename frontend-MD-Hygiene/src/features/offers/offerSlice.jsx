import { createSlice } from '@reduxjs/toolkit';
import offersData from '@/data/offers.json';

const offersFromStorage = JSON.parse(localStorage.getItem("offers")) || [];
const initialState = offersFromStorage.length ? offersFromStorage : offersData;

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    setOffers: (state, action) => {
      return [...action.payload];
    },
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
    updateStatus: (state, action) => {
      const { id, status, isActive } = action.payload;
      const offer = state.find((o) => o.id === id);
      if (offer) {
        if (status) offer.status = status;
        if (typeof isActive !== "undefined") offer.isActive = isActive;
      }
    },
    archiveOffer: (state, action) => {
      const offer = state.find((o) => o.id === action.payload);
      if (offer) {
        offer.isArchived = true;
      }
    },
  },
});

export const { setOffers, addOffer, updateOffer, deleteOffer, updateStatus, archiveOffer } = offerSlice.actions;
export default offerSlice.reducer;
