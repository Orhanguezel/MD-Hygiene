import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import API from "@/services/api";

const initialState = {
  invoices: [],
  selectedInvoice: null,
  status: "idle",
  error: null,
};

// 📥 Tüm faturaları getir
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

// 📥 Siparişten Fatura Oluştur
export const createInvoiceFromOrder = createAsyncThunk(
  "invoices/createInvoiceFromOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const invoiceData = {
        id: `INV-${uuidv4()}`,
        invoiceNumber: `INV-${uuidv4()}`,
        orderId: orderData.id,
        userId: orderData.userId,
        userName: orderData.userName,
        userEmail: orderData.userEmail,
        userAddress: orderData.userAddress,
        items: orderData.items,
        subtotal: orderData.subtotal,
        taxAmount: orderData.taxAmount,
        totalAmount: orderData.totalAmount,
        shippingCost: orderData.shippingCost,
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
