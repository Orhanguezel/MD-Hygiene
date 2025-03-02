import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

// 📥 **Tüm Teklifleri Getir**
export const fetchOffers = createAsyncThunk("offers/fetchOffers", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get("/offers");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "🚨 Teklifler yüklenirken hata oluştu!");
  }
});

// 📥 **Belirli Teklifi Getir**
export const fetchOfferById = createAsyncThunk("offers/fetchOfferById", async (offerNumber, { rejectWithValue }) => {
  try {
    const response = await API.get(`/offers/${offerNumber}`); // ✅ Teklif Numarası ile Getir
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "🚨 Teklif bulunamadı!");
  }
});


// ➕ **Yeni Teklif Ekle**
export const addOffer = createAsyncThunk("offers/addOffer", async (newOffer, { rejectWithValue }) => {
  try {
    const response = await API.post("/offers", newOffer);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "🚨 Teklif eklenemedi!");
  }
});

// ✏️ **Teklifi Güncelle**
export const updateOffer = createAsyncThunk("offers/updateOffer", async (updatedOffer, { rejectWithValue }) => {
  try {
    const response = await API.put(`/offers/${updatedOffer.id}`, updatedOffer);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "🚨 Teklif güncellenemedi!");
  }
});

// 🔄 **Teklif Durumunu Güncelle**
export const updateOfferStatus = createAsyncThunk("offers/updateOfferStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    const response = await API.patch(`/offers/${id}/status`, { status });
    return { id, status };
  } catch (error) {
    return rejectWithValue(error.response?.data || "🚨 Teklif durumu güncellenemedi!");
  }
});

// ❌ **Teklifi Sil**
export const deleteOffer = createAsyncThunk("offers/deleteOffer", async (offerId, { rejectWithValue }) => {
  try {
    await API.delete(`/offers/${offerId}`);
    return offerId;
  } catch (error) {
    return rejectWithValue(error.response?.data || "🚨 Teklif silinemedi!");
  }
});

// 📌 **RTK Slice Yapısı**
const offersSlice = createSlice({
  name: "offers",
  initialState: {
    offers: [],
    selectedOffer: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📥 Teklifleri Getir
      .addCase(fetchOffers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 📥 Belirli Teklifi Getir
      .addCase(fetchOfferById.pending, (state) => {
        state.status = "loading";
        state.selectedOffer = null;
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        console.log("🟢 Teklif API'den Alındı:", action.payload);
        state.status = "succeeded";
        state.selectedOffer = action.payload;
      })
      .addCase(fetchOfferById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ➕ Yeni Teklif Ekle
      .addCase(addOffer.fulfilled, (state, action) => {
        console.log("Teklif Redux Store'a eklendi:", action.payload);
        state.offers.push(action.payload);
      })
      .addCase(addOffer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ✏️ Teklifi Güncelle
      .addCase(updateOffer.fulfilled, (state, action) => {
        const index = state.offers.findIndex((offer) => offer.id === action.payload.id);
        if (index !== -1) {
          state.offers[index] = action.payload;
        }
      })
      .addCase(updateOffer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 🔄 Teklif Durumunu Güncelle
      .addCase(updateOfferStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const offer = state.offers.find((offer) => offer.id === id);
        if (offer) {
          offer.status = status;
        }
      })
      .addCase(updateOfferStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ❌ Teklifi Sil
      .addCase(deleteOffer.fulfilled, (state, action) => {
        state.offers = state.offers.filter((offer) => offer.id !== action.payload);
      })
      .addCase(deleteOffer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default offersSlice.reducer;
