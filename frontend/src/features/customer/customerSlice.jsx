import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

// 📌 **Genel API Çağrısı Yönetimi (Kod Tekrarını Önler)**
const apiCall = async (method, url, data = null, rejectWithValue) => {
  try {
    const response = await API[method](url, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "🚨 İşlem başarısız oldu!");
  }
};

// 📥 **Tüm müşterileri getir**
export const fetchCustomers = createAsyncThunk(
  "customer/fetchCustomers",
  async (_, { rejectWithValue }) => apiCall("get", "/customers", null, rejectWithValue)
);

// ➕ **Yeni müşteri ekle**
export const addCustomer = createAsyncThunk(
  "customer/addCustomer",
  async (newCustomer, { rejectWithValue }) => apiCall("post", "/customers", newCustomer, rejectWithValue)
);

// ✏️ **Müşteri bilgilerini güncelle**
export const updateCustomerInfo = createAsyncThunk(
  "customer/updateCustomerInfo",
  async (updatedData, { rejectWithValue }) => {
    if (!updatedData._id) return rejectWithValue("🚨 Güncellenecek müşteri ID bulunamadı!");
    return apiCall("put", `/customers/${updatedData._id}`, updatedData, rejectWithValue);
  }
);

// ❌ **Müşteri sil**
export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async (id, { rejectWithValue }) => {
    if (!id) return rejectWithValue("🚨 Silinecek müşteri ID bulunamadı!");
    return apiCall("delete", `/customers/${id}`, null, rejectWithValue);
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customers: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📥 **Müşteri Listesi Çekme**
      .addCase(fetchCustomers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customers = action.payload || []; // Eğer boş dönerse, hata olmasın diye boş array ekledik
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ➕ **Müşteri Ekleme**
      .addCase(addCustomer.fulfilled, (state, action) => {
        if (action.payload) {
          state.customers.push(action.payload);
        }
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ✏️ **Müşteri Güncelleme**
      .addCase(updateCustomerInfo.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.customers.findIndex((c) => c._id === action.payload._id);
          if (index !== -1) {
            state.customers[index] = action.payload;
          }
        }
      })
      .addCase(updateCustomerInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ❌ **Müşteri Silme**
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter((c) => c._id !== action.payload);
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default customerSlice.reducer;
