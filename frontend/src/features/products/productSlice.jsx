import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

// ✅ **Ürünleri API’den çekme**
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/products");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Ürünler alınırken hata oluştu");
    }
  }
);

// ✅ **Ürün Ekleme**
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, thunkAPI) => {
    try {
      const formattedData = {
        ...productData,
        category: productData.category._id || productData.category,
        images: Array.isArray(productData.images) ? productData.images : [productData.images], 
      };
      

      const response = await API.post("/products", formattedData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Ürün eklenirken hata oluştu");
    }
  }
);

// ✅ **Ürün Güncelleme**
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }, thunkAPI) => {
    try {
      const response = await API.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Ürün güncellenirken hata oluştu");
    }
  }
);

// ✅ **Ürün Silme**
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/products/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Ürün silinirken hata oluştu");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    filteredProducts: [],
    selectedCategory: "all", // ✅ Varsayılan olarak "all"
    loading: false,
    error: null,
  },
  reducers: {
    filterByCategory: (state, action) => {
      state.selectedCategory = action.payload;

      // ✅ Kategoriye göre filtreleme yap (category bir ObjectId veya string olabilir)
      state.filteredProducts =
        action.payload === "all"
          ? state.products
          : state.products.filter((product) =>
              product.category?._id?.toString() === action.payload.toString() ||
              product.category?.toString() === action.payload.toString()
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
        state.filteredProducts =
          state.selectedCategory === "all"
            ? action.payload
            : action.payload.filter((product) => product.category === state.selectedCategory);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        if (state.selectedCategory === "all" || action.payload.category === state.selectedCategory) {
          state.filteredProducts.push(action.payload);
        }
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );

        // ✅ Eğer güncellenen ürün seçili kategorideyse, filteredProducts’ı güncelle
        state.filteredProducts = state.selectedCategory === "all"
          ? state.products
          : state.products.filter((product) => product.category === state.selectedCategory);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product._id !== action.payload);
        state.filteredProducts = state.filteredProducts.filter((product) => product._id !== action.payload);
      });
  },
});

export const { filterByCategory } = productSlice.actions;
export default productSlice.reducer;
