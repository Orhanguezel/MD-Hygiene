import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";
import { createInvoiceFromOrder } from "@/features/invoices/invoicesSlice";

const SHIPPING_COST = 20;
const TAX_RATE = 0.19;

const initialState = {
  orders: [],
  userOrders: [],
  selectedOrder: null,
  invoices: [],
  ordersStatus: "idle",
  orderDetailsStatus: "idle",
  actionStatus: "idle",
  error: null,
};

// 📌 Genel API Çağrısı Fonksiyonu (Kod tekrarını önlemek için)
const apiCall = async (method, url, data = null, rejectWithValue) => {
  try {
    const response = await API[method](url, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "🚨 İşlem gerçekleştirilemedi!");
  }
};

// 📥 Tüm Siparişleri Getir
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => apiCall("get", "/orders", null, rejectWithValue)
);

// 📥 Belirli Bir Siparişi Getir
export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (orderId, { rejectWithValue }) => apiCall("get", `/orders/${orderId}`, null, rejectWithValue)
);

// 📥 Kullanıcının Siparişlerini Getir
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { getState, rejectWithValue }) => {
    const userId = getState().auth.user?.id;
    if (!userId) return rejectWithValue("🚨 Kullanıcı oturum açmamış!");
    return apiCall("get", `/orders/user/${userId}`, null, rejectWithValue);
  }
);

// ✏️ Sipariş Güncelleme (Admin)
export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ orderId, status }, { rejectWithValue, dispatch }) => {
    const response = await apiCall("put", `/orders/${orderId}/status`, { status }, rejectWithValue);
    
    console.log("📌 Güncellenmiş Sipariş (Frontend):", response);

    // 🔥 **Burada order nesnesi var mı kontrol et**
    const updatedOrder = response.order || response; // Bazı API'ler "order" içinde döndürür

    if (!updatedOrder.user?._id || !updatedOrder.company?._id) {
      console.error("🚨 Kullanıcı veya şirket bilgisi eksik! Güncellenen sipariş:", updatedOrder);
      return rejectWithValue("🚨 Kullanıcı veya şirket bilgisi eksik!");
    }

    if (status === "shipped") {
      const invoiceData = {
        order: updatedOrder._id,
        user: updatedOrder.user._id,
        company: updatedOrder.company._id,
        products: updatedOrder.products.map(item => ({
          productId: item.product._id,
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
        totalAmount: updatedOrder.totalAmount,
        taxAmount: updatedOrder.taxAmount,
      };

      await dispatch(createInvoiceFromOrder(invoiceData)).unwrap();
    }

    return updatedOrder;
  }
);



// ➕ Yeni Sipariş Oluştur (Checkout)
export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const user = state.auth.user;
    const cartItems = state.cart.cartItems;
    const company = state.company.company;

    if (!user) return rejectWithValue("🚨 Kullanıcı oturum açmamış!");
    if (!cartItems.length) return rejectWithValue("🚨 Sepetiniz boş!");
    if (!company || !company._id) return rejectWithValue("🚨 Şirket bilgisi eksik veya geçersiz!");

    const subtotal = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const taxAmount = (subtotal * TAX_RATE) / (1 + TAX_RATE);
    const finalAmount = subtotal + SHIPPING_COST;

    const orderData = {
      user: user._id,
      company: company._id,
      products: cartItems.map((item) => ({
        productId: item.product._id,
        name: item.product.title,
        quantity: item.quantity,
        unitPrice: item.price,
      })),
      totalAmount: parseFloat(finalAmount.toFixed(2)),
      taxAmount: parseFloat(taxAmount.toFixed(2)),
      shippingCost: SHIPPING_COST,
      shippingAddress: user.address || { street: "", city: "", postalCode: "", country: "" },
      status: "pending",
      paymentStatus: "pending",
      orderDate: new Date().toISOString(),
    };

    return apiCall("post", "/orders", orderData, rejectWithValue);
  }
);

// ❌ Sipariş Silme
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId, { rejectWithValue }) =>
    apiCall("delete", `/orders/${orderId}`, null, rejectWithValue)
);

// 📌 Redux Slice Tanımı
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
      // Tüm siparişleri getir
      .addCase(fetchOrders.pending, (state) => {
        state.ordersStatus = "loading";
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.ordersStatus = "succeeded";
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.ordersStatus = "failed";
        state.error = action.payload;
      })

      // Tek sipariş detayını getir
      .addCase(fetchOrderById.pending, (state) => {
        state.orderDetailsStatus = "loading";
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
        state.orderDetailsStatus = "succeeded";
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.orderDetailsStatus = "failed";
        state.error = action.payload;
      })

      // Sipariş güncelle
      .addCase(updateOrder.pending, (state) => {
        state.actionStatus = "loading";
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
        state.actionStatus = "succeeded";
        const index = state.orders.findIndex((order) => order._id === action.payload._id);
        if (index !== -1) state.orders[index] = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.payload;
      })

      // Sipariş oluştur
      .addCase(addOrder.pending, (state) => {
        state.actionStatus = "loading";
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.actionStatus = "succeeded";
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.payload;
      })

      // Sipariş sil
      .addCase(deleteOrder.pending, (state) => {
        state.actionStatus = "loading";
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((order) => order._id !== action.payload._id);
        state.actionStatus = "succeeded";
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.payload;
      })

      // Fatura oluştur
      .addCase(createInvoiceFromOrder.fulfilled, (state, action) => {
        state.invoices.push(action.payload);
      });
  },
});

export const { setSelectedOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
