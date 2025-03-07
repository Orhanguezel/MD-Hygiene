import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";
import { toast } from "react-toastify";
import { useLanguage } from "@/features/language/useLanguage";

// ✅ Kullanıcının favorilerini çekme
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/favorites/user"); // ✅ Kullanıcı JWT'den çekildiği için userId gerekmez
      return response.data; // ✅ Backend sadece productId listesi döndürüyor
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Favoriler yüklenemedi!");
    }
  }
);

// 📌 Favorilere ürün ekleme
export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async (product, thunkAPI) => {
    try {
      await API.post("/favorites", { productId: product.id });
      toast.success(`${product.title} favorilere eklendi!`); // ✅ Kullanıcıya bildirim göster
      return product.id;
    } catch (error) {
      toast.error("Favori eklenirken hata oluştu!");
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Favori eklenemedi!");
    }
  }
);

// 📌 Favoriden ürün kaldırma
export const removeFavorite = createAsyncThunk(
  "favorites/removeFavorite",
  async (product, thunkAPI) => {
    try {
      await API.delete(`/favorites/remove/${product.id}`);
      toast.info(`${product.title} favorilerden kaldırıldı!`); // ✅ Kullanıcıya bildirim göster
      return product.id;
    } catch (error) {
      toast.error("Favori silinirken hata oluştu!");
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Favori silinemedi!");
    }
  }
);

// 📌 Favori ekleme/kaldırma (toggle)
export const toggleFavorite = createAsyncThunk(
  "favorites/toggleFavorite",
  async (product, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const isFavorite = state.favorite.favorites.includes(product.id);

      if (isFavorite) {
        await API.delete(`/favorites/remove/${product.id}`);
        toast.info(`${product.title} favorilerden kaldırıldı!`);
        return { productId: product.id, removed: true };
      } else {
        await API.post("/favorites", { productId: product.id });
        toast.success(`${product.title} favorilere eklendi!`);
        return { productId: product.id, removed: false };
      }
    } catch (error) {
      toast.error("Favori işlemi başarısız!");
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Favori işlemi başarısız!");
    }
  }
);

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favorites: [],
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
        state.favorites = action.payload; // ✅ Backend sadece `productId` listesi döndürüyor
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter((id) => id !== action.payload);
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        if (action.payload.removed) {
          state.favorites = state.favorites.filter((id) => id !== action.payload.productId);
        } else {
          state.favorites.push(action.payload.productId);
        }
      });
  },
});

export default favoriteSlice.reducer;
