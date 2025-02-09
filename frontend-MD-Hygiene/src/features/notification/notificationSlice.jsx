// ✅ src/features/notification/notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.unshift(action.payload); // ✅ Yeni bildirimi başa ekler
    },
    markAsRead: (state, action) => {
      const index = state.findIndex((n) => n.id === action.payload);
      if (index !== -1) {
        state[index].status = 'read'; // ✅ Bildirimi okundu olarak işaretler
      }
    },
    deleteNotification: (state, action) => {
      return state.filter((n) => n.id !== action.payload); // ✅ Bildirimi siler
    },
  },
});

export const { addNotification, markAsRead, deleteNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
