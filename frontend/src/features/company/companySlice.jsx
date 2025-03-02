import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

// 📥 **Şirket bilgisini getir (İlk şirket)**
export const fetchCompanyInfo = createAsyncThunk("company/fetchCompanyInfo", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get("/companies");
    return response.data; // ✅ İlk şirket bilgisi döndürülüyor
  } catch (error) {
    return rejectWithValue(error.response?.data || "🚨 Şirket bilgileri yüklenemedi!");
  }
});

// 📥 **Şirket bilgilerini güncelle**
export const updateCompanyInfo = createAsyncThunk("company/updateCompanyInfo", async (updatedData, { rejectWithValue }) => {
  try {
    const response = await API.put(`/companies/${updatedData._id}`, updatedData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "🚨 Şirket bilgileri güncellenemedi!");
  }
});

// 📥 **Yeni şirket oluştur (Eğer yoksa)**
export const createCompany = createAsyncThunk("company/createCompany", async (newCompany, { rejectWithValue }) => {
  try {
    const response = await API.post("/companies", newCompany);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "🚨 Şirket oluşturulamadı!");
  }
});

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
      .addCase(fetchCompanyInfo.pending, (state) => { state.status = "loading"; })
      .addCase(fetchCompanyInfo.fulfilled, (state, action) => { state.status = "succeeded"; state.company = action.payload; })
      .addCase(fetchCompanyInfo.rejected, (state, action) => { state.status = "failed"; state.error = action.payload; })
      .addCase(updateCompanyInfo.fulfilled, (state, action) => { state.company = action.payload; })
      .addCase(createCompany.fulfilled, (state, action) => { state.company = action.payload; });
  },
});

export default companySlice.reducer;
