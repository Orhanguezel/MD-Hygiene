import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

// ✅ **Kategorileri API’den çekme**
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/categories");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Kategoriler alınırken hata oluştu");
    }
  }
);

// ✅ **Kategori ekleme**
export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryData, thunkAPI) => {
    try {
      const response = await API.post("/categories", categoryData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Kategori eklenirken hata oluştu");
    }
  }
);

// ✅ **Kategori güncelleme**
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, categoryData }, thunkAPI) => {
    try {
      const response = await API.put(`/categories/${id}`, categoryData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Kategori güncellenirken hata oluştu");
    }
  }
);

// ✅ **Kategori silme**
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/categories/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Kategori silinirken hata oluştu");
    }
  }
);

// ✅ **Kategori Slice**
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
      // ✅ **Kategorileri getirirken yüklenme durumu**
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
        state.error = action.payload;
      })

      // ✅ **Kategori ekleme**
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ **Kategori güncelleme**
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.map((category) =>
          category._id === action.payload._id ? action.payload : category
        );
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ **Kategori silme**
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter((category) => category._id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
