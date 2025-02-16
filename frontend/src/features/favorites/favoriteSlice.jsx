import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";
import { toast } from "react-toastify";

// ✅ Kullanıcının favorilerini çekme
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const userId = state.auth.user?.id; // ✅ Giriş yapan kullanıcının ID'sini al

      if (!userId) {
        return thunkAPI.rejectWithValue("Giriş yapmış bir kullanıcı bulunamadı!");
      }

      const response = await API.get(`/favorites?userId=${userId}`); // ✅ Sadece kullanıcının favorilerini getir
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Favoriler yüklenemedi!");
    }
  }
);


// 📌 Favorilere Ürün Ekleme
export const addFavorite = createAsyncThunk(
  "favorite/addFavorite",
  async (productId, thunkAPI) => {
    try {
      await API.post("/favorites", { productId });
      toast.success("✅ Ürün favorilere eklendi!");
      return productId;
    } catch (error) {
      toast.error("❌ Ürün favorilere eklenirken hata oluştu!");
      return thunkAPI.rejectWithValue(error.response?.data || "Favori eklenirken hata oluştu");
    }
  }
);

// 📌 Favoriden Ürün Silme
export const removeFavorite = createAsyncThunk(
  "favorite/removeFavorite",
  async (productId, thunkAPI) => {
    try {
      const response = await API.get("/favorites");
      const favorite = response.data.find((fav) => fav.productId === productId);

      if (favorite) {
        await API.delete(`/favorites/${favorite.id}`);
        toast.warn("🗑️ Ürün favorilerden kaldırıldı!");
        return productId;
      }
    } catch (error) {
      toast.error("❌ Ürün favorilerden kaldırılırken hata oluştu!");
      return thunkAPI.rejectWithValue(error.response?.data || "Favori silinirken hata oluştu");
    }
  }
);

// ✅ Favori ekleme/silme işlemi (userId ile)
export const toggleFavorite = createAsyncThunk(
  "favorites/toggleFavorite",
  async (productId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const userId = state.auth.user?.id; // ✅ Giriş yapan kullanıcıyı al

      if (!userId) {
        return thunkAPI.rejectWithValue("Giriş yapmış bir kullanıcı bulunamadı!");
      }

      // 📌 Mevcut favorileri kontrol et
      const response = await API.get(`/favorites?userId=${userId}&productId=${productId}`);
      const existingFavorite = response.data[0];

      if (existingFavorite) {
        // ❌ Eğer favoride varsa, sil
        await API.delete(`/favorites/${existingFavorite.id}`);
        return { productId, removed: true };
      } else {
        // ✅ Favoriye ekle
        const newFavorite = { userId, productId };
        const addResponse = await API.post("/favorites", newFavorite);
        return addResponse.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Favori işlemi başarısız!");
    }
  }
);



const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favorites: [],
    status: "idle",
    loading: false,
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
      state.favorites = action.payload.map((fav) => fav.productId); // ✅ Sadece productId'leri kaydet
    })
    .addCase(fetchFavorites.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })

      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter((id) => id !== action.payload);
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.error = action.payload;
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
