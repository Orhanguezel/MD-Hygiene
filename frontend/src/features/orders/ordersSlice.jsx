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

      // 📌 **Sipariş "shipped" olduğunda fatura oluştur**
      if (updatedOrder.status === "shipped") {
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
          subtotal: updatedOrder.totalAmount - updatedOrder.shippingCost,
          vatAmount: updatedOrder.vatAmount,
          totalAmount: updatedOrder.totalAmount,
          shippingCost: updatedOrder.shippingCost,
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

      // 📌 **Toplam tutar kontrolü** (cartSlice ile tutarlı mı?)
      if (cart.grandTotal !== cart.totalPrice + cart.shippingCost) {
        return rejectWithValue("Sepet toplamı değişti, lütfen tekrar deneyin.");
      }

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
        totalAmount: cart.grandTotal, // 📌 **CartSlice'tan alındı**
        shippingCost: cart.shippingCost, // 📌 **CartSlice'tan alındı**
        vatAmount: cart.vatAmount, // 📌 **CartSlice'tan alındı**
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
  initialState: {
    orders: [],
    userOrders: [],
    selectedOrder: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.unshift(action.payload);
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedOrder = action.payload; // ✅ Seçili siparişi güncelle
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.selectedOrder = null;
      });
  },
});

export default ordersSlice.reducer;
