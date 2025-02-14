import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api"; 

// ✅ Kategorileri Çek
export const fetchCategories = createAsyncThunk("categories/fetchCategories", async (_, thunkAPI) => {
  try {
    const response = await API.get("/categories"); // API'deki kategori endpointi
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Kategoriler alınırken hata oluştu");
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Kategoriler yüklenemedi.";
      });
  },
});

export default categorySlice.reducer;
