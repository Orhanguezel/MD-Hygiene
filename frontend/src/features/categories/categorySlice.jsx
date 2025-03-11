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
      console.error("❌ Kategorileri çekerken hata:", error);
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
      console.error("❌ Kategori eklenirken hata:", error);
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
      console.error("❌ Kategori güncellenirken hata:", error);
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Kategori güncellenirken hata oluştu");
    }
  }
);

// ✅ **Kategori silme (Güncellenmiş)**
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, thunkAPI) => {
    try {
      console.log(`🗑️ Kategori Silme Başlatıldı: ${id}`);
      const response = await API.delete(`/categories/${id}`);

      // ✅ Backend hata döndürmezse başarılı say
      if (response.status === 200) {
        console.log(`✅ Kategori başarıyla silindi: ${id}`);
        return id;
      } else {
        throw new Error("Kategori silinemedi.");
      }
    } catch (error) {
      console.error("❌ Kategori silinirken hata:", error);
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

      // ✅ **Kategori silme (Güncellenmiş)**
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
        console.error("❌ Kategori silme işlemi başarısız:", action.payload);
      });
  },
});

export default categorySlice.reducer;
