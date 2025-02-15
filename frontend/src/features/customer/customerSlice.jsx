import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

// 📌 API'den müşteri bilgilerini çekme
export const fetchCustomers = createAsyncThunk("customer/fetchCustomers", async () => {
  const response = await API.get("/customers");
  return response.data;
});

// 📌 Yeni müşteri ekleme
export const addCustomer = createAsyncThunk("customer/addCustomer", async (newCustomer) => {
  if (!newCustomer.companyName) throw new Error("Firma ismi zorunludur!");
  const response = await API.post("/customers", newCustomer);
  return response.data;
});

// 📌 Müşteri bilgilerini güncelleme
export const updateCustomerInfo = createAsyncThunk("customer/updateCustomerInfo", async (updatedData) => {
  if (!updatedData.companyName) throw new Error("Firma ismi zorunludur!");
  const response = await API.put(`/customers/${updatedData.id}`, updatedData);
  return response.data;
});

// 📌 Müşteri silme işlemi
export const deleteCustomer = createAsyncThunk("customer/deleteCustomer", async (id) => {
  await API.delete(`/customers/${id}`);
  return id;
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
      .addCase(fetchCustomers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        if (!action.payload.id) {
          console.error("❌ ID değeri alınamadı!");
        }
        state.customers.push(action.payload);
      })
      .addCase(updateCustomerInfo.fulfilled, (state, action) => {
        const index = state.customers.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.customers[index] = action.payload;
        }
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter((c) => c.id !== action.payload);
      });
  },
});

export default customerSlice.reducer;
