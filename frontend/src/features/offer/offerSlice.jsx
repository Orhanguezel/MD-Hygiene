import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

// 📌 **Genel API Çağrı Fonksiyonu**
const handleApiCall = async (method, url, data = null, rejectWithValue) => {
  try {
    const response = await API[method](url, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "🚨 İşlem gerçekleştirilemedi!");
  }
};

// 📥 **Tüm Teklifleri Getir (Müşteri Bilgisi Dahil)**
export const fetchOffers = createAsyncThunk(
  "offers/fetchOffers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/offers");
      const offersWithCustomer = response.data.map((offer) => ({
        ...offer,
        customerName: offer.customer?.contactName || "Bilinmeyen Müşteri",
      }));
      return offersWithCustomer;
    } catch (error) {
      return rejectWithValue(error.response?.data || "🚨 Teklifler getirilemedi!");
    }
  }
);

// 📥 **Belirli Bir Teklifi Getir**
export const fetchOfferById = createAsyncThunk(
  "offers/fetchOfferById",
  async (offerId, { rejectWithValue }) => handleApiCall("get", `/offers/${offerId}`, null, rejectWithValue)
);

// ➕ **Yeni Teklif Ekle**
export const addOffer = createAsyncThunk(
  "offers/addOffer",
  async (newOffer, { rejectWithValue }) => handleApiCall("post", "/offers", newOffer, rejectWithValue)
);

// ✏️ **Teklifi Güncelle**
export const updateOffer = createAsyncThunk(
  "offers/updateOffer",
  async (updatedOffer, { rejectWithValue }) => handleApiCall("put", `/offers/${updatedOffer._id}`, updatedOffer, rejectWithValue)
);

// 🔄 **Teklif Durumunu Güncelle**
export const updateOfferStatus = createAsyncThunk(
  "offers/updateOfferStatus",
  async ({ id, status }, { rejectWithValue }) => handleApiCall("patch", `/offers/${id}/status`, { status }, rejectWithValue)
);

// 📩 **Teklifi E-Posta ile Gönder**
export const sendOfferEmail = createAsyncThunk(
  "offers/sendOfferEmail",
  async ({ id, email }, { rejectWithValue }) => handleApiCall("post", `/offers/${id}/send-email`, { email }, rejectWithValue)
);

// ❌ **Teklifi Sil**
export const deleteOffer = createAsyncThunk(
  "offers/deleteOffer",
  async (offerId, { rejectWithValue }) => handleApiCall("delete", `/offers/${offerId}`, null, rejectWithValue)
);

// 📌 **RTK Slice Yapısı**
const offersSlice = createSlice({
  name: "offers",
  initialState: {
    offers: [],
    selectedOffer: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setSelectedOffer: (state, action) => {
      state.selectedOffer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 📥 **Teklifleri Getir**
      .addCase(fetchOffers.pending, (state) => { state.status = "loading"; })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 📥 **Belirli Bir Teklifi Getir**
      .addCase(fetchOfferById.pending, (state) => { state.status = "loading"; state.selectedOffer = null; })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedOffer = action.payload;
      })
      .addCase(fetchOfferById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ➕ **Yeni Teklif Ekle**
      .addCase(addOffer.fulfilled, (state, action) => {
        state.offers.push(action.payload);
      })
      .addCase(addOffer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ✏️ **Teklifi Güncelle**
      .addCase(updateOffer.fulfilled, (state, action) => {
        const index = state.offers.findIndex((offer) => offer._id === action.payload._id);
        if (index !== -1) state.offers[index] = action.payload;
      })
      .addCase(updateOffer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 🔄 **Teklif Durumunu Güncelle**
      .addCase(updateOfferStatus.fulfilled, (state, action) => {
        const offer = state.offers.find((offer) => offer._id === action.payload.id);
        if (offer) offer.status = action.payload.status;
      })
      .addCase(updateOfferStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 📩 **Teklifi E-Posta ile Gönder**
      .addCase(sendOfferEmail.fulfilled, (state, action) => {
        const offer = state.offers.find((offer) => offer._id === action.payload.id);
        if (offer) offer.sentByEmail = true;
      })
      .addCase(sendOfferEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ❌ **Teklifi Sil**
      .addCase(deleteOffer.fulfilled, (state, action) => {
        state.offers = state.offers.filter((offer) => offer._id !== action.payload);
      })
      .addCase(deleteOffer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setSelectedOffer } = offersSlice.actions;
export default offersSlice.reducer;
