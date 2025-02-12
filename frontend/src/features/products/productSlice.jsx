import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Ürünleri Çekme
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get("http://localhost:3000/data");
  return response.data;
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    filteredProducts: [], // ✅ Filtrelenmiş ürünler için alan
    loading: false,
    error: null,
  },
  reducers: {
    filterByCategory: (state, action) => {
      const categoryId = action.payload;
      state.filteredProducts = state.products.filter(
        (product) => product.category.id === categoryId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload; // ✅ Başlangıçta tüm ürünler gösterilir
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { filterByCategory } = productSlice.actions; // ✅ Aksiyon export edildi
export default productSlice.reducer;
