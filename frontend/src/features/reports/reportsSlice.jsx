// ✅ src/features/reports/reportsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reportsData from '@/data/reportsData.json'; // Dummy data import

// Async thunk for future API integration
export const fetchReports = createAsyncThunk('reports/fetchReports', async () => {
  // Simulate API call with dummy data
  return reportsData;
});

const reportsSlice = createSlice({
  name: 'reports',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default reportsSlice.reducer; // ✅ Export reducer
