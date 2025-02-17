import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

// 📌 **Tüm şirketleri çek ve ilkini kullan**
export const fetchCompanyInfo = createAsyncThunk("company/fetchCompanyInfo", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get("/companies");

    if (!response.data.length) {
      throw new Error("❌ Şirket bilgisi bulunamadı!");
    }

    return response.data[0]; // **İlk şirketi döndür**
  } catch (error) {
    return rejectWithValue(error.response?.data || "Şirket bilgileri yüklenemedi!");
  }
});

// 📌 **Şirket Bilgilerini Güncelle**
export const updateCompanyInfo = createAsyncThunk("company/updateCompanyInfo", async (updatedData, { rejectWithValue }) => {
  try {

    const response = await API.put(`/companies/${updatedData.id}`, updatedData);

    return response.data;
  } catch (error) {
    console.error("❌ Hata (updateCompanyInfo):", error);
    return rejectWithValue(error.response?.data || "Şirket bilgileri güncellenemedi!");
  }
});

// 📌 **Redux Slice Yapısı**
const companySlice = createSlice({
  name: "company",
  initialState: {
    company: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompanyInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.company = action.payload;
      })
      .addCase(fetchCompanyInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateCompanyInfo.fulfilled, (state, action) => {
        state.company = action.payload;
      });
  },
});

export default companySlice.reducer;
