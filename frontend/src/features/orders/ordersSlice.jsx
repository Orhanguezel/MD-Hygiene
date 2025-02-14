import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchInvoices } from "@/features/invoices/invoicesSlice"; // ✅ Fatura işlemleri
import API from "@/services/api"; // ✅ API Entegrasyonu

const initialState = {
  orders: [],          // ✅ Tüm siparişleri tutar
  userOrders: [],      // ✅ Kullanıcının siparişlerini tutar
  selectedOrder: null, // ✅ Seçilen siparişin detaylarını tutar
  status: "idle",      // ✅ API çağrısı durumu
  error: null,         // ✅ Hata mesajlarını saklar
};

// 📥 **Tüm siparişleri getir**
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/orders");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "🚨 Siparişler yüklenirken hata oluştu!");
    }
  }
);

// 📥 **Belirli bir siparişi getir**
export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "🚨 Sipariş bulunamadı!");
    }
  }
);

// 📥 **Kullanıcının siparişlerini getir**
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/orders?userId=${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "🚨 Kullanıcı siparişleri getirilemedi!");
    }
  }
);

// ✏️ **Siparişi güncelle fonksiyonunda fatura oluşturma zorunlu olsun**
export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async (updatedOrder, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.put(`/orders/${updatedOrder.id}`, updatedOrder);

      if (updatedOrder.status === "shipped") {
        const SHIPPING_COST = 20; 
        const TAX_RATE = 0.19; 
        const subtotal = updatedOrder.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
        const taxAmount = subtotal * TAX_RATE;
        const totalAmount = subtotal + SHIPPING_COST; 

        // ✅ Fatura oluşturma
        const invoiceData = {
          invoiceNumber: `INV-${Date.now()}`,
          orderId: updatedOrder.id,
          userId: updatedOrder.userId,
          userName: updatedOrder.userName,
          userEmail: updatedOrder.userEmail,
          userAddress: updatedOrder.userAddress,
          items: updatedOrder.items,
          subtotal: parseFloat(subtotal.toFixed(2)),
          taxAmount: parseFloat(taxAmount.toFixed(2)),
          totalAmount: parseFloat(totalAmount.toFixed(2)),
          shippingCost: SHIPPING_COST,
          issuedAt: new Date().toISOString(),
          status: "paid",
        };

        await API.post("/invoices", invoiceData); 
        dispatch(fetchInvoices()); 
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "🚨 Sipariş güncellenemedi!");
    }
  }
);

// ❌ **Siparişi sil**
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      await API.delete(`/orders/${orderId}`);
      return orderId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "🚨 Sipariş silinemedi!");
    }
  }
);

// ➕ **Sipariş oluştur (Checkout'tan gönderilecek)**
export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (order, { rejectWithValue }) => {
    try {
      const response = await API.post("/orders", order);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "🚨 Sipariş oluşturulamadı!");
    }
  }
);





// ✅ **Redux Slice Tanımlaması**
const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    selectedOrder: null,
    status: "idle",
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // 📥 **Tüm siparişleri getir**
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload.map(order => ({
          ...order,
          totalAmount: Number(order.totalAmount || 0), 
        }));
        state.status = "succeeded";
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Siparis olusturma

      .addCase(addOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.unshift(action.payload);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 📥 **Belirli bir siparişi getir**
      .addCase(fetchOrderById.pending, (state) => {
        state.status = "loading";
        state.selectedOrder = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 📥 **Kullanıcının siparişlerini getir**
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userOrders = action.payload;
      })

      // ✏️ **Sipariş güncelleme**
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex((order) => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })

      // ❌ **Sipariş silme işlemi**
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((order) => order.id !== action.payload);
      });
  },
});

// **Reducer ve Actions'ları dışa aktar**
export const { resetOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
