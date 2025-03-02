import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

// ✅ **Sepet Toplamlarını Hesapla**
const calculateTotals = (cartItems = []) => {
  const VAT_RATE = 0.19; // %19 KDV
  const SHIPPING_COST = 20;
  let totalPrice = 0;
  let totalQuantity = 0;

  cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
    totalQuantity += item.quantity;
  });

  const netPrice = totalPrice / (1 + VAT_RATE);
  const vatAmount = totalPrice - netPrice;
  const grandTotal = totalPrice + SHIPPING_COST;

  return {
    totalPrice: parseFloat(totalPrice.toFixed(2)),
    netPrice: parseFloat(netPrice.toFixed(2)),
    totalQuantity,
    vatAmount: parseFloat(vatAmount.toFixed(2)),
    shippingCost: SHIPPING_COST,
    grandTotal: parseFloat(grandTotal.toFixed(2)),
  };
};

// 📥 **Sepeti Getir**
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get("/cart/user");
    return response.data || [];
  } catch (error) {
    return rejectWithValue("🚨 Sepet yüklenemedi!");
  }
});

// ➕ **Sepete Ürün Ekle veya Miktar Artır**
export const addToCart = createAsyncThunk("cart/addToCart", async (product, { dispatch, rejectWithValue }) => {
  try {
    if (!product._id) return rejectWithValue("🚨 Ürün ID eksik!");

    const cartResponse = await API.get("/cart/user");
    const cartItems = cartResponse.data || [];

    const existingItem = cartItems.find((item) => item.product._id === product._id);

    if (existingItem) {
      // ✅ Eğer ürün sepette varsa, miktarı artır
      await API.patch(`/cart/increase/${existingItem.product._id}`);
    } else {
      // ✅ Yeni ürün ekle
      const newItem = {
        productId: product._id,
        quantity: 1,
        price: product.price,
        title: product.title,
        images: product.images || [],
      };

      await API.post("/cart", newItem);
    }

    // **Sonuç olarak sepeti tekrar güncelle**
    return dispatch(fetchCart()).unwrap();
  } catch (error) {
    return rejectWithValue("🚨 Ürün sepete eklenemedi!");
  }
});

// 🔺 **Miktar Artır**
export const increaseQuantity = createAsyncThunk("cart/increaseQuantity", async (productId, { dispatch, rejectWithValue }) => {
  try {
    if (!productId) return rejectWithValue("🚨 Ürün ID eksik!");

    await API.patch(`/cart/increase/${productId}`);
    return dispatch(fetchCart()).unwrap();
  } catch (error) {
    return rejectWithValue("🚨 Miktar artırılamadı!");
  }
});

// 🔻 **Miktar Azalt**
export const decreaseQuantity = createAsyncThunk("cart/decreaseQuantity", async (productId, { dispatch, rejectWithValue }) => {
  try {
    if (!productId) return rejectWithValue("🚨 Ürün ID eksik!");

    await API.patch(`/cart/decrease/${productId}`);
    return dispatch(fetchCart()).unwrap();
  } catch (error) {
    return rejectWithValue("🚨 Miktar azaltılamadı!");
  }
});

// ❌ **Sepetten Ürün Kaldır**
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (productId, { dispatch, rejectWithValue }) => {
  try {
    if (!productId) return rejectWithValue("🚨 Ürün ID eksik!");

    await API.delete(`/cart/remove/${productId}`);
    return dispatch(fetchCart()).unwrap();
  } catch (error) {
    return rejectWithValue("🚨 Ürün sepetten kaldırılamadı!");
  }
});

// 🗑️ **Sepeti Temizle**
export const clearCart = createAsyncThunk("cart/clearCart", async (_, { dispatch, rejectWithValue }) => {
  try {
    await API.delete("/cart/clear");
    return dispatch(fetchCart()).unwrap();
  } catch (error) {
    return rejectWithValue("🚨 Sepet temizlenemedi!");
  }
});

// ✅ **Redux Store Tanımlama**
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
    vatAmount: 0,
    shippingCost: 20,
    grandTotal: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📥 **Sepeti Yükle**
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload || [];
        const totals = calculateTotals(state.cartItems);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;
        state.vatAmount = totals.vatAmount;
        state.shippingCost = totals.shippingCost;
        state.grandTotal = totals.grandTotal;
      })

      // ✅ **Sepete Ürün Ekleme**
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload || [];
        const totals = calculateTotals(state.cartItems);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;
        state.vatAmount = totals.vatAmount;
        state.grandTotal = totals.grandTotal;
      })

      // 🔺 **Miktar Artır**
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload || [];
        const totals = calculateTotals(state.cartItems);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;
        state.vatAmount = totals.vatAmount;
        state.grandTotal = totals.grandTotal;
      })

      // 🔻 **Miktar Azalt**
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload || [];
        const totals = calculateTotals(state.cartItems);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;
        state.vatAmount = totals.vatAmount;
        state.grandTotal = totals.grandTotal;
      })

      // ❌ **Sepeti Temizle**
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
        state.vatAmount = 0;
        state.shippingCost = 20;
        state.grandTotal = 0;
      });
  },
});

export default cartSlice.reducer;
