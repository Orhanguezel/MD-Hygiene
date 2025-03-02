import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import API from "@/services/api";

const initialState = {
  invoices: [],
  selectedInvoice: null,
  status: "idle",
  fetchStatus: "idle",
  error: null,
};

// 📥 **Tüm faturaları getir (Admin Panel)**
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

// 📥 **Kullanıcının faturalarını getir**
export const fetchUserInvoices = createAsyncThunk(
  "invoices/fetchUserInvoices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/invoices/user");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "🚨 Kullanıcı faturaları alınamadı!");
    }
  }
);

// 📥 **Belirli bir faturayı getir**
export const fetchInvoiceById = createAsyncThunk(
  "invoices/fetchInvoiceById",
  async (invoiceId, { rejectWithValue }) => {
    try {
      if (!invoiceId) {
        console.error("🚨 HATA: API çağrısı yapılamadı. invoiceId eksik!");
        return rejectWithValue("Fatura ID eksik!");
      }

      console.log("📌 API Çağrısı Yapılıyor: /invoices/" + invoiceId);
      const response = await API.get(`/invoices/${invoiceId}`);
      return response.data;
    } catch (error) {
      console.error("🚨 API Hatası:", error);
      return rejectWithValue(error.response?.data || "Fatura bulunamadı!");
    }
  }
);


// 📝 **Siparişten Fatura Oluştur**
export const createInvoiceFromOrder = createAsyncThunk(
  "invoices/createInvoiceFromOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      if (!orderData || !orderData._id) {
        return rejectWithValue("🚨 Sipariş verisi eksik!");
      }

      const invoiceData = {
        invoiceNumber: `INV-${Date.now()}-${uuidv4()}`,
        order: orderData._id,
        user: orderData.userId,
        items: orderData.items.map(item => ({
          product: item.product?._id || "Bilinmeyen Ürün",
          name: item.product?.title || item.product?.name || "Bilinmeyen Ürün",
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
        totalAmount: orderData.totalAmount,
        taxAmount: orderData.taxAmount,
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


// 📥 **Fatura PDF oluştur ve indir**
export const fetchInvoicePDF = createAsyncThunk(
  "invoices/fetchInvoicePDF",
  async (invoiceId, { rejectWithValue }) => {
    try {
      if (!invoiceId) {
        return rejectWithValue("🚨 Fatura ID eksik!");
      }

      const response = await API.get(`/invoices/${invoiceId}/pdf`, {
        responseType: "blob", // ✅ PDF dosyası indirilecek
      });

      if (!response.data) {
        return rejectWithValue("🚨 Fatura PDF verisi boş geldi!");
      }

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return invoiceId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "🚨 Fatura PDF alınamadı!");
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
      // 📌 **Tüm Faturalar**
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

      // 📌 **Kullanıcı Faturaları**
      .addCase(fetchUserInvoices.pending, (state) => {
        state.fetchStatus = "loading"; // ✅ Yeni state tanımlandı
      })
      .addCase(fetchUserInvoices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.invoices = action.payload;
      })
      .addCase(fetchUserInvoices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 📌 **Belirli Bir Fatura**
      .addCase(fetchInvoiceById.pending, (state) => {
        state.status = "loading";
        // Eğer daha önce fatura varsa koru, null yapma
        if (!state.selectedInvoice) {
          state.selectedInvoice = null;
        }
      })
      .addCase(fetchInvoiceById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedInvoice = action.payload;
      })
      .addCase(fetchInvoiceById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 📌 **Siparişten Fatura Oluştur**
      .addCase(createInvoiceFromOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createInvoiceFromOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.invoices.push(action.payload);
      })
      .addCase(createInvoiceFromOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 📌 **Fatura PDF İndirme**
      .addCase(fetchInvoicePDF.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInvoicePDF.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(fetchInvoicePDF.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default invoicesSlice.reducer;
