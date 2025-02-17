
// ✅ src/features/auditLogs/auditLogsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import auditLogsData from '@/data/auditLogsData.json';

const initialState = auditLogsData || [];

const auditLogsSlice = createSlice({
  name: 'auditLogs',
  initialState,
  reducers: {
    addLog: (state, action) => {
      state.unshift(action.payload); // ✅ En son eklenen log başa eklenir
    },
    clearLogs: () => [] // ✅ Tüm logları temizler
  },
});

export const { addLog, clearLogs } = auditLogsSlice.actions;
export default auditLogsSlice.reducer;
