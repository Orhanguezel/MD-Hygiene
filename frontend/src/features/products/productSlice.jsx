import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api"; // ✅ Merkezi API yapısı

// 📌 Ürünleri API’den çekme
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/products"); // ✅ Güncellenmiş endpoint
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Ürünler alınırken hata oluştu");
    }
  }
);

// ✅ Kategorileri Çekme
export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/products/categories"); // ✅ Güncellenmiş endpoint
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Kategoriler alınırken hata oluştu");
    }
  }
);

// ✅ Ürün Ekleme
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, thunkAPI) => {
    try {
      const response = await API.post("/products", productData, {
        headers: { Authorization: `Bearer ${thunkAPI.getState().auth.token}` }, // ✅ Yetkilendirme eklendi
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Ürün eklenirken hata oluştu");
    }
  }
);

// ✅ Ürün Güncelleme
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }, thunkAPI) => {
    try {
      const response = await API.put(`/products/${id}`, productData, {
        headers: { Authorization: `Bearer ${thunkAPI.getState().auth.token}` }, // ✅ Yetkilendirme eklendi
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Ürün güncellenirken hata oluştu");
    }
  }
);

// ✅ Ürün Silme
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${thunkAPI.getState().auth.token}` }, // ✅ Yetkilendirme eklendi
      });

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Ürün silinirken hata oluştu");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    filteredProducts: [],
    categories: [],
    selectedCategory: null,
    loading: false,
    error: null,
  },
  reducers: {
    // 📌 Kategoriye Göre Ürünleri Filtreleme
    filterByCategory: (state, action) => {
      const categoryId = action.payload;
      state.selectedCategory = categoryId;
      state.filteredProducts = categoryId
        ? state.products.filter((product) => product.category.id === categoryId)
        : state.products;
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
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ürünler yüklenemedi.";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload || "Kategoriler yüklenemedi.";
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload || "Ürün eklenemedi.";
        state.loading = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload || "Ürün güncellenemedi.";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload || "Ürün silinemedi.";
      });
  },
});

export const { filterByCategory } = productSlice.actions;
export default productSlice.reducer;
