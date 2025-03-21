import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

// 📌 Genel API Çağrısı Yönetimi (Kod Tekrarını Önler)
const apiCall = async (method, url, data = null, rejectWithValue) => {
  try {
    const response = await API[method](url, data);
    console.log(`📌 API Yanıtı (${method.toUpperCase()} ${url}):`, response.data);
    return response.data;
  } catch (error) {
    console.error(`🚨 API Hatası (${method.toUpperCase()} ${url}):`, error.response?.data || error.message);
    return rejectWithValue(error.response?.data || "🚨 İşlem gerçekleştirilemedi!");
  }
};

// 📥 **Şirket bilgisini getir**
export const fetchCompanyInfo = createAsyncThunk(
  "company/fetchCompanyInfo",
  async (_, { rejectWithValue }) => {
    const data = await apiCall("get", "/companies", null, rejectWithValue);

    if (!data || !data._id) {
      console.error("🚨 API Yanıtı boş veya geçersiz geldi! Şirket bilgisi bulunamadı.");
      return rejectWithValue("🚨 Şirket bilgisi bulunamadı!");
    }

    console.log("📌 Redux Store'a Kaydedilecek Şirket:", data);
    return data; // ✅ Gelen tek şirket verisi kaydediliyor
  }
);

// ✏️ **Şirket Bilgilerini Güncelle**
export const updateCompanyInfo = createAsyncThunk(
  "company/updateCompanyInfo",
  async (updatedData, { rejectWithValue }) =>
    apiCall("put", `/companies/${updatedData._id}`, updatedData, rejectWithValue)
);

// ➕ **Yeni Şirket Oluştur (Eğer Yoksa)**
export const createCompany = createAsyncThunk(
  "company/createCompany",
  async (newCompany, { rejectWithValue }) =>
    apiCall("post", "/companies", newCompany, rejectWithValue)
);

// 📌 **Redux Slice Tanımlaması**
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
      // Şirket Bilgisi Getirme Durumları
      .addCase(fetchCompanyInfo.pending, (state) => {
        state.status = "loading";
        state.error = null;
        console.log("🔄 Şirket bilgisi yükleniyor...");
      })
      .addCase(fetchCompanyInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.company = action.payload;
        console.log("📌 Redux Store'a Kaydedilen Şirket:", action.payload);
      })
      .addCase(fetchCompanyInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error("🚨 Şirket bilgisi yüklenirken hata:", action.payload);
      })

      // Şirket Bilgisi Güncelleme Durumları
      .addCase(updateCompanyInfo.fulfilled, (state, action) => {
        state.company = action.payload;
        console.log("📌 Şirket bilgisi güncellendi:", action.payload);
      })
      .addCase(updateCompanyInfo.rejected, (state, action) => {
        state.error = action.payload;
        console.error("🚨 Şirket güncelleme hatası:", action.payload);
      })

      // Yeni Şirket Oluşturma Durumları
      .addCase(createCompany.fulfilled, (state, action) => {
        state.company = action.payload;
        console.log("📌 Yeni şirket oluşturuldu:", action.payload);
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.error = action.payload;
        console.error("🚨 Yeni şirket oluşturma hatası:", action.payload);
      });
  },
});

export default companySlice.reducer;
