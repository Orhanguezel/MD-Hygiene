import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";
import { toast } from "react-toastify";

// 📌 Favorileri getir
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/favorites/user");
      return response.data || []; // ✅ Boş dizi olarak döndür
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Favoriler yüklenemedi!");
    }
  }
);

// 📌 Favoriye Ekle/Çıkar (toggle)
export const toggleFavorite = createAsyncThunk(
  "favorites/toggleFavorite",
  async (product, { getState, rejectWithValue }) => {
    const state = getState();
    const favorites = state.favorite.favorites || []; // ✅ undefined kontrolü yap

    const isFavorite = Array.isArray(favorites) ? favorites.includes(product._id) : false;
    
    try {
      if (isFavorite) {
        await API.delete(`/favorites/remove/${product._id}`);
        return { productId: product._id, removed: true };
      } else {
        await API.post("/favorites", { productId: product._id });
        return { productId: product._id, removed: false };
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Favori işlemi başarısız!");
    }
  }
);

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favorites: [], // ✅ Başlangıçta boş dizi olmalı
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favorites = action.payload || []; // ✅ Undefined yerine boş dizi ata
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const { productId, removed } = action.payload;

        if (removed) {
          state.favorites = state.favorites.filter((id) => id !== productId);
        } else {
          state.favorites.push(productId);
        }
      });
  },
});

export default favoriteSlice.reducer;
