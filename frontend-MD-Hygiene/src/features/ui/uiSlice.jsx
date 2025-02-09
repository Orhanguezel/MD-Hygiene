// ✅ src/features/ui/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: true,
  modalOpen: false,
  loading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen; // ✅ Sidebar'ı aç/kapat
    },
    toggleModal: (state) => {
      state.modalOpen = !state.modalOpen; // ✅ Modal'ı aç/kapat
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // ✅ Yükleme durumunu ayarla
    },
  },
});

export const { toggleSidebar, toggleModal, setLoading } = uiSlice.actions;
export default uiSlice.reducer;