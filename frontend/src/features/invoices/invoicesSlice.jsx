import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

const initialState = {
  invoices: [],
  selectedInvoice: null,
  status: "idle",
  fetchStatus: "idle",
  error: null,
};

// 📌 **Genel API Çağrısı Yönetimi**
const apiCall = async (method, url, data = null, rejectWithValue) => {
  try {
    const response = await API[method](url, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "🚨 İşlem gerçekleştirilemedi!");
  }
};

// 📥 **Tüm faturaları getir (Admin Panel)**
export const fetchInvoices = createAsyncThunk("invoices/fetchInvoices", async (_, { rejectWithValue }) =>
  apiCall("get", "/invoices", null, rejectWithValue)
);

// 📥 **Kullanıcının faturalarını getir**
export const fetchUserInvoices = createAsyncThunk("invoices/fetchUserInvoices", async (_, { rejectWithValue }) =>
  apiCall("get", "/invoices/user", null, rejectWithValue)
);

// 📥 **Belirli bir faturayı getir**
export const fetchInvoiceById = createAsyncThunk("invoices/fetchInvoiceById", async (invoiceId, { rejectWithValue }) => {
  if (!invoiceId) return rejectWithValue("🚨 Fatura ID eksik!");
  return apiCall("get", `/invoices/${invoiceId}`, null, rejectWithValue);
});

// 📥 **Siparişten Fatura Oluştur**
export const createInvoiceFromOrder = createAsyncThunk(
  "invoices/createInvoiceFromOrder",
  async (orderData, { rejectWithValue }) => {
    console.log("📌 Fatura oluşturulacak sipariş verisi:", orderData);

    if (!orderData || !orderData.order) return rejectWithValue("🚨 Sipariş verisi eksik!");
    if (!orderData.company) return rejectWithValue("🚨 Şirket bilgisi eksik!");

    const invoiceData = {
      invoiceNumber: `INV-${Date.now()}`,
      order: orderData.order,
      user: orderData.user, // ✅ burada "user" doğru şekilde geliyor
      company: orderData.company,
      items: orderData.products.map((item) => ({
        product: item.productId,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
      totalAmount: orderData.totalAmount,
      taxAmount: orderData.taxAmount,
      issuedAt: new Date().toISOString(),
      status: "pending",
    };

    console.log("📌 Oluşturulan fatura verisi:", invoiceData);

    return apiCall("post", "/invoices", invoiceData, rejectWithValue);
  }
);



// 📥 **Fatura PDF oluştur ve indir**
export const fetchInvoicePDF = createAsyncThunk("invoices/fetchInvoicePDF", async (invoiceId, { rejectWithValue }) => {
  if (!invoiceId) return rejectWithValue("🚨 Fatura ID eksik!");

  try {
    const response = await API.get(`/invoices/${invoiceId}/pdf`, { responseType: "blob" });
    if (!response.data) return rejectWithValue("🚨 Fatura PDF verisi boş!");

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
});

// ✅ **Redux Slice Tanımlaması**
const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📌 **Tüm Faturalar**
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.invoices = action.payload;
        state.status = "succeeded";
      })

      // 📌 **Kullanıcı Faturaları**
      .addCase(fetchUserInvoices.fulfilled, (state, action) => {
        state.invoices = action.payload;
        state.status = "succeeded";
      })

      // 📌 **Belirli Bir Fatura**
      .addCase(fetchInvoiceById.fulfilled, (state, action) => {
        state.selectedInvoice = action.payload;
        state.status = "succeeded";
      })

      // 📌 **Siparişten Fatura Oluştur**
      .addCase(createInvoiceFromOrder.fulfilled, (state, action) => {
        state.invoices.push(action.payload);
        state.status = "succeeded";
      })

      // 📌 **Fatura PDF İndirme**
      .addCase(fetchInvoicePDF.fulfilled, (state) => {
        state.status = "succeeded";
      })

      // 🔄 **Tüm Pending İşlemler İçin**
      .addMatcher((action) => action.type.endsWith("/pending"), (state) => {
        state.status = "loading";
      })

      // ❌ **Tüm Rejected İşlemler İçin**
      .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default invoicesSlice.reducer;
