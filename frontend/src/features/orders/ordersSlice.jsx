import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

const initialState = {
  orders: [],
  userOrders: [],
  selectedOrder: null,
  status: "idle",
  error: null,
};

// 📥 **Tüm Siparişleri Getir**
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get("/orders");
    return response.data;
  } catch (error) {
    console.error("🚨 Siparişler yüklenemedi!", error);
    return rejectWithValue(error.response?.data || "🚨 Siparişler yüklenemedi!");
  }
});

// 📥 **Belirli Bir Siparişi Getir**
export const fetchOrderById = createAsyncThunk("orders/fetchOrderById", async (orderId, { rejectWithValue }) => {
  try {
    if (!orderId) throw new Error("🚨 Sipariş ID eksik!");
    console.log(`📌 API Çağrısı: /orders/${orderId}`);
    const response = await API.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("🚨 Sipariş bulunamadı!", error);
    return rejectWithValue(error.response?.data || "🚨 Sipariş bulunamadı!");
  }
});

// 📥 **Kullanıcının Siparişlerini Getir**
export const fetchUserOrders = createAsyncThunk("orders/fetchUserOrders", async (_, { getState, rejectWithValue }) => {
  try {
    const userId = getState().auth.user?.id;
    if (!userId) return rejectWithValue("🚨 Kullanıcı oturum açmamış!");

    const response = await API.get(`/orders/user/${userId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "🚨 Siparişler yüklenemedi!");
  }
});

// ✏️ **Sipariş Güncelleme (Admin)**
export const updateOrder = createAsyncThunk("orders/updateOrder", async ({ orderId, status }, { rejectWithValue, dispatch }) => {
  try {
    console.log(`📌 API Çağrısı: /orders/${orderId}/status - Yeni Durum: ${status}`);
    const response = await API.put(`/orders/${orderId}/status`, { status });

    dispatch(fetchOrderById(orderId)); // ✅ Güncellenen siparişi Redux Store’a çek
    dispatch(fetchOrders()); // ✅ Sipariş listesini de güncelle

    return response.data;
  } catch (error) {
    console.error("🚨 Sipariş güncellenemedi!", error);
    return rejectWithValue(error.response?.data || "🚨 Sipariş güncellenemedi!");
  }
});


// ❌ **Siparişi Sil (Admin)**
export const deleteOrder = createAsyncThunk("orders/deleteOrder", async (orderId, { rejectWithValue }) => {
  try {
    await API.delete(`/orders/${orderId}`);
    return orderId;
  } catch (error) {
    console.error("🚨 Sipariş silinemedi!", error);
    return rejectWithValue(error.response?.data || "🚨 Sipariş silinemedi!");
  }
});

// ➕ **Yeni Sipariş Oluştur (Checkout)**
export const addOrder = createAsyncThunk("orders/addOrder", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const user = state.auth.user;
    const cartItems = state.cart.cartItems;

    if (!user) return rejectWithValue("🚨 Kullanıcı oturum açmamış!");
    if (!cartItems.length) return rejectWithValue("🚨 Sepetiniz boş!");

    const SHIPPING_COST = 20;
    const TAX_RATE = 0.19;
    const subtotal = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const taxAmount = (subtotal * TAX_RATE) / (1 + TAX_RATE);
    const finalAmount = subtotal + SHIPPING_COST;

    const newOrder = {
      user: user.id,
      products: cartItems.map((item) => ({
        productId: item.product._id,
        name: item.product?.title || "Ürün adı eksik!",
        quantity: item.quantity,
        unitPrice: item.price,
      })),
      totalAmount: parseFloat(finalAmount.toFixed(2)),
      taxAmount: parseFloat(taxAmount.toFixed(2)),
      shippingAddress: user.address || { street: "", city: "", postalCode: "", country: "" },
      status: "pending",
      paymentStatus: "pending",
      orderDate: new Date().toISOString(),
    };

    console.log("📌 Sipariş Verisi:", newOrder);

    const response = await API.post("/orders", newOrder);
    return response.data;
  } catch (error) {
    console.error("🚨 Sipariş oluşturulamadı!", error);
    return rejectWithValue(error.response?.data || "🚨 Sipariş oluşturulamadı!");
  }
});

// ✅ **Redux Slice Tanımlaması**
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;

        // Redux store içindeki sipariş listesini güncelle
        const index = state.orders.findIndex((order) => order._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(order => order._id !== action.payload);
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export const { setSelectedOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
