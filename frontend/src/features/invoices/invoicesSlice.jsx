import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api"; // ✅ API Bağlantısı

const initialState = {
  invoices: [],          // ✅ Tüm faturalar
  userInvoices: [],      // ✅ Kullanıcının faturaları
  selectedInvoice: null, // ✅ Seçilen fatura detayları
  status: "idle",        // ✅ API çağrı durumu
  error: null,           // ✅ Hata yönetimi
};

// 📥 **Tüm faturaları getir**
export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/invoices");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Faturalar yüklenirken hata oluştu!");
    }
  }
);

// 📥 **Belirli bir faturayı getir ve kullanıcı bilgisiyle birlikte al**
export const fetchInvoiceById = createAsyncThunk(
  "invoices/fetchInvoiceById",
  async (invoiceId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/invoices/${invoiceId}`);
      const invoiceData = response.data;

      // ✅ Kullanıcı bilgilerini de al
      const userResponse = await API.get(`/users/${invoiceData.userId}`);
      const userData = userResponse.data;

      return { invoiceData, userData };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fatura veya kullanıcı bilgisi bulunamadı!");
    }
  }
);

// 📥 **Kullanıcının faturalarını getir**
export const fetchUserInvoices = createAsyncThunk(
  "invoices/fetchUserInvoices",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/invoices?userId=${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Kullanıcı faturaları yüklenirken hata oluştu!");
    }
  }
);

// ➕ **Yeni fatura oluştur**
export const createInvoice = createAsyncThunk(
  "invoices/createInvoice",
  async (invoiceData, { rejectWithValue }) => {
    try {
      const response = await API.post("/invoices", invoiceData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fatura oluşturulamadı!");
    }
  }
);

// ✏️ **Faturayı güncelle**
export const updateInvoice = createAsyncThunk(
  "invoices/updateInvoice",
  async (updatedInvoice, { rejectWithValue }) => {
    try {
      const response = await API.put(`/invoices/${updatedInvoice.id}`, updatedInvoice);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fatura güncellenemedi!");
    }
  }
);

// ❌ **Faturayı sil**
export const deleteInvoice = createAsyncThunk(
  "invoices/deleteInvoice",
  async (invoiceId, { rejectWithValue }) => {
    try {
      await API.delete(`/invoices/${invoiceId}`);
      return invoiceId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fatura silinemedi!");
    }
  }
);

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [],
    selectedInvoice: null,
    selectedUser: null, // ✅ Kullanıcı bilgisi eklendi
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📌 Fatura Listeleme İşlemleri
      .addCase(fetchInvoices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 📌 Kullanıcıya Ait Faturaları Listeleme
      .addCase(fetchUserInvoices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInvoices = action.payload;
      })
      .addCase(fetchUserInvoices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 📌 Tekil Fatura Detayı Getirme
      .addCase(fetchInvoiceById.pending, (state) => {
        state.status = "loading";
        state.selectedInvoice = null;
      })
      .addCase(fetchInvoiceById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedInvoice = action.payload.invoiceData;
        state.selectedUser = action.payload.userData; // ✅ Kullanıcı bilgisi de eklendi
      })
      .addCase(fetchInvoiceById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 📌 Yeni Fatura Ekleme
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.invoices.unshift(action.payload);
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 📌 Fatura Güncelleme
      .addCase(updateInvoice.fulfilled, (state, action) => {
        const index = state.invoices.findIndex((inv) => inv.id === action.payload.id);
        if (index !== -1) {
          state.invoices[index] = action.payload;
        }
      })
      .addCase(updateInvoice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 📌 Fatura Silme
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.invoices = state.invoices.filter((inv) => inv.id !== action.payload);
      })
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default invoicesSlice.reducer;
