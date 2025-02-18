import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

// ✅ **Hesaplama Fonksiyonu**
export const calculateTotals = (cartItems) => {
  let subtotal = 0;
  let totalQuantity = 0;
  const VAT_RATE = 0.19; // %19 KDV
  const SHIPPING_COST = 20;

  cartItems.forEach((item) => {
    subtotal += item.quantity * item.price;
    totalQuantity += item.quantity;
  });

  // ✅ KDV'yi toplam fiyatın içinden ayır
  const vatAmount = (subtotal * VAT_RATE) / (1 + VAT_RATE);

  // ✅ Genel toplamı doğru hesapla (KDV tekrar eklenmiyor!)
  const grandTotal = subtotal + SHIPPING_COST;

  return {
    totalPrice: parseFloat(subtotal.toFixed(2)), // KDV dahil toplam fiyat
    vatAmount: parseFloat(vatAmount.toFixed(2)), // KDV miktarı
    totalQuantity,
    shippingCost: SHIPPING_COST,
    grandTotal: parseFloat(grandTotal.toFixed(2)), // Genel toplam (KDV + kargo dahil)
  };
};

// **Sepet Verilerini API'den Çekme**
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/cart");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Sepet yüklenemedi.");
    }
  }
);

// **Sepete Ürün Ekleme**
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product, thunkAPI) => {
    try {
      const response = await API.get("/cart");
      const existingItem = response.data.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        await API.patch(`/cart/${existingItem.id}`, updatedItem);
        return updatedItem;
      } else {
        const newItem = {
          productId: product.id,
          quantity: 1,
          price: product.price,
          title: product.title,
          images: product.images?.length
            ? product.images
            : ["/placeholder.jpg"],
        };
        const res = await API.post("/cart", newItem);
        return res.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("Ürün sepete eklenemedi.");
    }
  }
);

// **Miktar Artırma**
export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async (productId, thunkAPI) => {
    try {
      // ✅ Mevcut ürünün bilgilerini al
      const response = await API.get("/cart");
      const cartItem = response.data.find((item) => item.productId === productId);
      if (!cartItem) return thunkAPI.rejectWithValue("Ürün bulunamadı.");

      // ✅ Miktarı artır
      const updatedItem = { ...cartItem, quantity: cartItem.quantity + 1 };
      await API.patch(`/cart/${cartItem.id}`, updatedItem);
      return updatedItem;
    } catch (error) {
      return thunkAPI.rejectWithValue("Miktar artırılamadı.");
    }
  }
);
// ✅ **Miktar Azaltma (Eğer miktar 1 ise, ürün kaldırılacak)**
export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async (productId, thunkAPI) => {
    try {
      const response = await API.get("/cart");
      const cartItem = response.data.find((item) => item.productId === productId);
      if (!cartItem) return thunkAPI.rejectWithValue("Ürün bulunamadı.");

      if (cartItem.quantity > 1) {
        // ✅ Miktarı azalt
        const updatedItem = { ...cartItem, quantity: cartItem.quantity - 1 };
        await API.patch(`/cart/${cartItem.id}`, updatedItem);
        return updatedItem;
      } else {
        // ✅ Ürün tamamen kaldırılacak
        await API.delete(`/cart/${cartItem.id}`);
        return { id: cartItem.id, removed: true }; // 🚀 Ürün kaldırıldığında `removed: true` ekledik
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("Miktar azaltılamadı.");
    }
  }
);

// **Ürün Kaldırma**
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, thunkAPI) => {
    try {
      await API.delete(`/cart/${productId}`);
      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ürün kaldırılamadı.");
    }
  }
);


// **Ödeme Sonrası Sepeti Sıfırlama**
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/cart");
      const cartItems = response.data;

      if (!cartItems.length) {
        return [];
      }

      await Promise.all(
        cartItems.map((item) => API.delete(`/cart/${item.id}`))
      );
      return [];
    } catch (error) {
      return thunkAPI.rejectWithValue("Sepet temizlenemedi.");
    }
  }
);

// ✅ **Redux Store Güncelleme**
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
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        const totals = calculateTotals(action.payload);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;
        state.vatAmount = totals.vatAmount;
        state.shippingCost = totals.shippingCost;
        state.grandTotal = totals.grandTotal;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const existingItem = state.cartItems.find(
          (item) => item.productId === action.payload.productId
        );
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.cartItems.push(action.payload);
        }
        const totals = calculateTotals(state.cartItems);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;
        state.vatAmount = totals.vatAmount;
        state.grandTotal = totals.grandTotal;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
        state.vatAmount = 0;
        state.shippingCost = 20;
        state.grandTotal = 0;
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        const item = state.cartItems.find((i) => i.id === action.payload.id);
        if (item) item.quantity = action.payload.quantity;
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        if (action.payload.removed) {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
        } else {
            const item = state.cartItems.find(i => i.id === action.payload.id);
            if (item) item.quantity = action.payload.quantity;
        }
    
        // ✅ Sepet hesaplamalarını güncelle
        const totals = calculateTotals(state.cartItems);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;
        state.vatAmount = totals.vatAmount;
        state.grandTotal = totals.grandTotal;
    })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      });
  },
});

export default cartSlice.reducer;
