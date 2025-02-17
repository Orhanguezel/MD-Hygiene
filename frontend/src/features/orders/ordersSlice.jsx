import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { fetchInvoices } from "@/features/invoices/invoicesSlice";
import API from "@/services/api";

const initialState = {
  orders: [],
  userOrders: [],
  selectedOrder: null,
  status: "idle",
  error: null,
};

// 📥 **Tüm siparişleri getir (Admin Panel)**
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/orders");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Siparişler yüklenemedi!");
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
      return rejectWithValue(error.response?.data || "Sipariş bulunamadı!");
    }
  }
);

// 📥 **Kullanıcının Siparişlerini Getir**
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/orders?userId=${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Siparişler yüklenemedi!");
    }
  }
);

// ✏️ **Sipariş Güncelleme (Admin Panel)**
export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async (updatedOrder, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.put(`/orders/${updatedOrder.id}`, updatedOrder);

      if (updatedOrder.status === "shipped") {
        const SHIPPING_COST = 20;
        const TAX_RATE = 0.19;

        const subtotal = updatedOrder.items.reduce(
          (sum, item) => sum + item.quantity * item.unitPrice,
          0
        );

        const taxAmount = (subtotal * TAX_RATE) / (1 + TAX_RATE);
        const totalAmount = subtotal + SHIPPING_COST;

        const now = new Date();
        const invoiceDate = `${now.getDate().toString().padStart(2, "0")}.${(now.getMonth() + 1)
          .toString()
          .padStart(2, "0")}.${now.getFullYear()} - ${now
          .getHours()
          .toString()
          .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

        const invoiceData = {
          id: `INV-${uuidv4()}`,
          invoiceNumber: `INV-${uuidv4()}`,
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
          issuedAt: invoiceDate,
          status: "paid",
        };

        await API.post("/invoices", invoiceData);
        dispatch(fetchInvoices());
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Sipariş güncellenemedi!");
    }
  }
);

// ❌ **Siparişi Sil (Admin Panel)**
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      await API.delete(`/orders/${orderId}`);
      return orderId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Sipariş silinemedi!");
    }
  }
);

// ➕ **Yeni Sipariş Oluştur (Checkout Sayfası)**
export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (cartItems, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const user = state.auth.user;
      const cart = state.cart;

      if (!user) {
        return rejectWithValue("Kullanıcı oturum açmamış.");
      }

      const totalAmount = cart.totalPrice ? parseFloat(cart.totalPrice).toFixed(2) : "0.00";
      const shippingCost = cart.shippingCost ? parseFloat(cart.shippingCost).toFixed(2) : "0.00";

      const now = new Date();
      const formattedDate = `${now.getDate().toString().padStart(2, "0")}.${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}.${now.getFullYear()} - ${now
        .getHours()
        .toString()
        .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

      const newOrder = {
        id: `ORD-${uuidv4()}`,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        userAddress: user.address,
        orderDate: formattedDate,
        items: cartItems.map((item) => ({
          productId: item.id,
          title: item.title,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
        totalAmount,
        shippingCost,
        status: "pending",
        paymentStatus: "pending",
      };

      const response = await API.post("/orders", newOrder);
      return response.data;
    } catch (error) {
      return rejectWithValue("Sipariş oluşturulamadı.");
    }
  }
);

// ✅ **Redux Slice Tanımlaması**
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.status = "succeeded";
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.unshift(action.payload);
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      });
  },
});

export default ordersSlice.reducer;
