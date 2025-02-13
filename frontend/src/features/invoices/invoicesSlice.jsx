import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api"; // ✅ API Bağlantısı

const initialState = {
  invoices: [],         // ✅ Tüm faturalar
  userInvoices: [],     // ✅ Kullanıcının faturaları
  selectedInvoice: null,// ✅ Seçilen fatura detayları
  selectedUser: null,   // ✅ Kullanıcı bilgisi
  status: "idle",       // ✅ API çağrı durumu
  error: null,          // ✅ Hata yönetimi
};

// 📥 **Tüm faturaları getir**
export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/invoices");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "🚨 Faturalar yüklenirken hata oluştu!");
    }
  }
);

// 📥 **Belirli bir faturayı getir**
export const fetchInvoiceById = createAsyncThunk(
  "invoices/fetchInvoiceById",
  async (invoiceId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/invoices/${invoiceId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "🚨 Fatura bulunamadı!");
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
      return rejectWithValue(error.response?.data || "🚨 Kullanıcı faturaları yüklenirken hata oluştu!");
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
      return rejectWithValue(error.response?.data || "🚨 Fatura oluşturulamadı!");
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
      return rejectWithValue(error.response?.data || "🚨 Fatura güncellenemedi!");
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
      return rejectWithValue(error.response?.data || "🚨 Fatura silinemedi!");
    }
  }
);

// ✅ **Redux Slice Tanımlaması**
const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📌 **Tüm faturaları getir**
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

      // 📌 **Kullanıcının faturalarını getir**
      .addCase(fetchUserInvoices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInvoices = action.payload;
      })
      .addCase(fetchUserInvoices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 📌 **Tek bir faturayı getir**
      .addCase(fetchInvoiceById.pending, (state) => {
        state.status = "loading";
        state.selectedInvoice = null;
      })
      .addCase(fetchInvoiceById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedInvoice = action.payload;
      })
      .addCase(fetchInvoiceById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 📌 **Yeni fatura oluştur**
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.invoices.unshift(action.payload);
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 📌 **Faturayı güncelle**
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

      // 📌 **Faturayı sil**
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