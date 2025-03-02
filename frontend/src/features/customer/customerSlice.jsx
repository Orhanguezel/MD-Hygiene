import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

// 📥 **Tüm müşterileri getir**
export const fetchCustomers = createAsyncThunk("customer/fetchCustomers", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get("/customers");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "🚨 Müşteriler yüklenirken hata oluştu!");
  }
});

// 📥 **Yeni müşteri ekle**
export const addCustomer = createAsyncThunk("customer/addCustomer", async (newCustomer, { rejectWithValue }) => {
  try {
    const response = await API.post("/customers", newCustomer);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "🚨 Müşteri eklenirken hata oluştu!");
  }
});

// 📥 **Müşteri bilgilerini güncelle**
export const updateCustomerInfo = createAsyncThunk("customer/updateCustomerInfo", async (updatedData, { rejectWithValue }) => {
  try {
    const response = await API.put(`/customers/${updatedData._id}`, updatedData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "🚨 Müşteri güncellenirken hata oluştu!");
  }
});

// 📥 **Müşteri sil**
export const deleteCustomer = createAsyncThunk("customer/deleteCustomer", async (id, { rejectWithValue }) => {
  try {
    await API.delete(`/customers/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data || "🚨 Müşteri silinirken hata oluştu!");
  }
});

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
      .addCase(fetchCustomers.pending, (state) => { state.status = "loading"; })
      .addCase(fetchCustomers.fulfilled, (state, action) => { state.status = "succeeded"; state.customers = action.payload; })
      .addCase(fetchCustomers.rejected, (state, action) => { state.status = "failed"; state.error = action.payload; })
      .addCase(addCustomer.fulfilled, (state, action) => { state.customers.push(action.payload); })
      .addCase(updateCustomerInfo.fulfilled, (state, action) => {
        const index = state.customers.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) state.customers[index] = action.payload;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter((c) => c._id !== action.payload);
      });
  },
});

export default customerSlice.reducer;
