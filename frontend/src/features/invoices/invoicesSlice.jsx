import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api"; // ✅ API Bağlantısı

const initialState = {
  invoices: [],         // ✅ Tüm faturalar
  selectedInvoice: null,// ✅ Seçilen fatura detayları
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

// 📥 **Siparişten Fatura Oluştur (Doğrudan Sipariş Verilerini Kullan)**
export const createInvoiceFromOrder = createAsyncThunk(
  "invoices/createInvoiceFromOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const invoiceData = {
        id: `INV-${Date.now()}`,
        invoiceNumber: `INV-${Date.now()}`,
        orderId: orderData.id,
        userId: orderData.userId,
        userName: orderData.userName,
        userEmail: orderData.userEmail,
        userAddress: orderData.userAddress,
        items: orderData.items, // ✅ Ürünleri direkt al
        subtotal: orderData.subtotal, // ✅ Siparişten al
        taxAmount: orderData.taxAmount, // ✅ Siparişten al
        totalAmount: orderData.totalAmount, // ✅ Siparişten al
        shippingCost: orderData.shippingCost, // ✅ Siparişten al
        issuedAt: new Date().toISOString(),
        status: "pending",
      };

      const response = await API.post("/invoices", invoiceData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "🚨 Fatura oluşturulamadı!");
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
      .addCase(createInvoiceFromOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.invoices.push(action.payload);
      })
      .addCase(createInvoiceFromOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default invoicesSlice.reducer;
