import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
      console.log("📦 API Yanıtı - Tüm Siparişler:", response.data);
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
      console.log(`👤 Kullanıcı (${userId}) Siparişleri:`, response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "🚨 Kullanıcı siparişleri getirilemedi!");
    }
  }
);

// ➕ **Sipariş oluştur**
export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (order, { rejectWithValue }) => {
    try {
      const newOrder = {
        ...order,
        orderDate: new Date().toISOString(),
        status: "pending",      // ✅ Onay bekliyor
        paymentStatus: "pending",
      };

      const response = await API.post("/orders", newOrder);
      console.log("✅ Yeni Sipariş Oluşturuldu:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "🚨 Sipariş oluşturulamadı!");
    }
  }
);

// ✏️ Siparişi güncelle fonksiyonunda fatura oluşturma zorunlu olsun
export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async (updatedOrder, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.put(`/orders/${updatedOrder.id}`, updatedOrder);
      
      if (updatedOrder.status === "shipped") {
        // ✅ Sipariş kargoya verildiğinde fatura oluştur
        const invoiceData = {
          invoiceNumber: `INV-${Date.now()}`,
          orderId: updatedOrder.id,
          userId: updatedOrder.userId,
          userName: updatedOrder.userName,
          items: updatedOrder.items.map((item) => ({
            product: item.title,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            taxRate: item.taxRate || 19,
          })),
          totalAmount: updatedOrder.totalAmount,
          issuedAt: new Date().toISOString(),
          status: "paid",
        };

        await API.post("/invoices", invoiceData); // ✅ Fatura veritabanına ekleniyor
        dispatch(fetchInvoices()); // ✅ Redux'ta faturaları güncelle
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Sipariş güncellenemedi!");
    }
  }
);

// ❌ **Siparişi sil**
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      await API.delete(`/orders/${orderId}`);
      console.log(`🗑️ Sipariş Silindi: ${orderId}`);
      return orderId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "🚨 Sipariş silinemedi!");
    }
  }
);

// ✅ **Redux Slice Tanımlaması**
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // 🔄 **Siparişleri sıfırla**
    resetOrders: (state) => {
      state.orders = [];
      state.userOrders = [];
      state.selectedOrder = null;
      state.status = "idle";
      state.error = null;
      console.log("🔄 Redux Store: Siparişler sıfırlandı!");
    },
  },
  extraReducers: (builder) => {
    builder
      // 📥 **Tüm siparişleri getir**
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        console.log("📦 Redux Güncellendi! Yeni Siparişler:", action.payload);
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
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

      // ➕ **Sipariş ekleme işlemi**
      .addCase(addOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.unshift(action.payload);
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
