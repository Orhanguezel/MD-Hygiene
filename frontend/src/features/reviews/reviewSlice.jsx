import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

// 📌 **Tüm yorumları çekme**
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/reviews");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Yorumlar yüklenemedi.");
    }
  }
);

// 📌 **Belirli bir ürünün yorumlarını çekme**
export const fetchProductReviews = createAsyncThunk(
  "reviews/fetchProductReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/reviews/product/${productId}`);
      return response.data.reviews;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Ürün yorumları yüklenemedi.");
    }
  }
);

// 📌 **Yeni yorum ekleme (Kullanıcı giriş yapmış olmalı)**
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async (reviewData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const user = auth.user;

      if (!user) {
        return rejectWithValue("Giriş yapmış bir kullanıcı bulunamadı!");
      }

      const response = await API.post("/reviews", reviewData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Yorum eklenirken hata oluştu!");
    }
  }
);

// 📌 **Yorumu Güncelleme**
export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ reviewId, updateData }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const token = auth.user?.token;

      const response = await API.put(`/reviews/${reviewId}`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Yorum güncellenemedi!");
    }
  }
);

// 📌 **Yorum Silme**
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const token = auth.user?.token;

      await API.delete(`/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return reviewId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Yorum silinemedi!");
    }
  }
);

// 📌 **Redux Slice**
const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
    productReviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.productReviews = action.payload;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.productReviews.push(action.payload);
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.map((review) =>
          review._id === action.payload._id ? action.payload : review
        );
        state.productReviews = state.productReviews.map((review) =>
          review._id === action.payload._id ? action.payload : review
        );
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter((review) => review._id !== action.payload);
        state.productReviews = state.productReviews.filter((review) => review._id !== action.payload);
      });
  },
});

export default reviewSlice.reducer;
