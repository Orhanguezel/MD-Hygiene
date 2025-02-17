import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

// 📌 Tüm yorumları çekme
export const fetchReviews = createAsyncThunk("reviews/fetchReviews", async (_, thunkAPI) => {
  try {
    const response = await API.get("/reviews");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Yorumlar yüklenemedi.");
  }
});

// 📌 Yeni yorum ekleme
export const addReview = createAsyncThunk("reviews/addReview", async (reviewData, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const user = state.auth.user;

    if (!user) {
      return thunkAPI.rejectWithValue("Giriş yapmış bir kullanıcı bulunamadı!");
    }

    const newReview = {
      ...reviewData,
      userId: user.id,
      name: user.name,
      avatar: user.avatar || "https://randomuser.me/api/portraits/lego/1.jpg",
    };

    const response = await API.post("/reviews", newReview);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Yorum eklenirken hata oluştu!");
  }
});

// 📌 Yorum Silme (Sadece Admin)
export const deleteReview = createAsyncThunk("reviews/deleteReview", async (reviewId, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const user = state.auth.user;

    if (!user || user.role !== "admin") {
      return thunkAPI.rejectWithValue("Yalnızca admin yorum silebilir!");
    }

    await API.delete(`/reviews/${reviewId}`);
    return reviewId;
  } catch (error) {
    return thunkAPI.rejectWithValue("Yorum silinemedi!");
  }
});

// 📌 Redux Slice
const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter((review) => review.id !== action.payload);
      });
  },
});

export default reviewSlice.reducer;
