import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

const calculateTotals = (cartItems) => {
  const VAT_RATE = 0.19; // %19 KDV
  const SHIPPING_COST = 20;
  let totalPrice = 0;
  let totalQuantity = 0;

  cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
    totalQuantity += item.quantity;
  });

  // 📌 Net Fiyatı Hesapla (Toplam fiyatta KDV zaten var!)
  const netPrice = totalPrice / (1 + VAT_RATE);

  // 📌 KDV Miktarını Hesapla
  const vatAmount = totalPrice - netPrice;

  // 📌 Genel Toplam (Toplam Fiyat + Nakliye Ücreti)
  const grandTotal = totalPrice + SHIPPING_COST;

  return {
    totalPrice: parseFloat(totalPrice.toFixed(2)), // KDV dahil toplam fiyat
    netPrice: parseFloat(netPrice.toFixed(2)), // KDV hariç fiyat
    totalQuantity,
    vatAmount: parseFloat(vatAmount.toFixed(2)), // KDV miktarı
    shippingCost: SHIPPING_COST,
    grandTotal: parseFloat(grandTotal.toFixed(2)), // Genel toplam (nakliye dahil)
  };
};


// **Sepet Verilerini API'den Çekme**
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, thunkAPI) => {
  try {
    const response = await API.get("/cart");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Sepet yüklenemedi.");
  }
});

// **Sepete Ürün Ekleme**
export const addToCart = createAsyncThunk("cart/addToCart", async (product, thunkAPI) => {
  try {
    const response = await API.get("/cart");
    const existingItem = response.data.find((item) => item.productId === product.id);

    if (existingItem) {
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
      await API.patch(`/cart/${existingItem.id}`, updatedItem);
      return updatedItem;
    } else {
      const newItem = {
        productId: product.id,
        quantity: 1,
        price: product.price,
        title: product.title,
        images: product.images?.length ? product.images : ["/placeholder.jpg"],
      };
      const res = await API.post("/cart", newItem);
      return res.data;
    }
  } catch (error) {
    return thunkAPI.rejectWithValue("Ürün sepete eklenemedi.");
  }
});

// **Miktar Artırma**
export const increaseQuantity = createAsyncThunk("cart/increaseQuantity", async (productId, thunkAPI) => {
  try {
    const response = await API.get("/cart");
    const cartItem = response.data.find((item) => item.productId === productId);
    if (!cartItem) return thunkAPI.rejectWithValue("Ürün bulunamadı.");

    const updatedItem = { ...cartItem, quantity: cartItem.quantity + 1 };
    await API.patch(`/cart/${cartItem.id}`, updatedItem);
    return updatedItem;
  } catch (error) {
    return thunkAPI.rejectWithValue("Miktar artırılamadı.");
  }
});

// **Miktar Azaltma**
export const decreaseQuantity = createAsyncThunk("cart/decreaseQuantity", async (productId, thunkAPI) => {
  try {
    const response = await API.get("/cart");
    const cartItem = response.data.find((item) => item.productId === productId);
    if (!cartItem) return thunkAPI.rejectWithValue("Ürün bulunamadı.");

    if (cartItem.quantity > 1) {
      const updatedItem = { ...cartItem, quantity: cartItem.quantity - 1 };
      await API.patch(`/cart/${cartItem.id}`, updatedItem);
      return updatedItem;
    } else {
      await API.delete(`/cart/${cartItem.id}`);
      return productId;
    }
  } catch (error) {
    return thunkAPI.rejectWithValue("Miktar azaltılamadı.");
  }
});

// **Sepetten Ürün Kaldırma**
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (productId, thunkAPI) => {
  try {
    const response = await API.get("/cart");
    const cartItem = response.data.find((item) => item.productId === productId);
    if (!cartItem) return thunkAPI.rejectWithValue("Ürün bulunamadı.");

    await API.delete(`/cart/${cartItem.id}`);
    return productId;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ürün sepetten kaldırılamadı.");
  }
});

// **Ödeme Sonrası Sepeti Sıfırlama**
export const clearCart = createAsyncThunk("cart/clearCart", async (_, thunkAPI) => {
  try {
    // 📌 1. Önce Sepetteki Ürünleri API'den Çek
    const response = await API.get("/cart");
    const cartItems = response.data;

    // 📌 2. Eğer Sepet Boşsa, Direkt Dön
    if (!cartItems.length) {
      console.log("🛒 Sepet zaten boş!");
      return [];
    }

    // 📌 3. Tüm Ürünleri Tek Tek Sil
    await Promise.all(
      cartItems.map((item) => API.delete(`/cart/${item.id}`))
    );

    console.log("✅ Sepet temizlendi!");
    return [];
  } catch (error) {
    console.error("🚨 Sepet temizlenirken hata oluştu:", error);
    return thunkAPI.rejectWithValue("Sepet temizlenemedi.");
  }
});


// **Redux Store Güncelleme**
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
        const existingItem = state.cartItems.find((item) => item.productId === action.payload.productId);
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
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        const item = state.cartItems.find((item) => item.productId === action.payload.productId);
        if (item) item.quantity += 1;
        const totals = calculateTotals(state.cartItems);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;
        state.vatAmount = totals.vatAmount;
        state.grandTotal = totals.grandTotal;
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        const itemIndex = state.cartItems.findIndex((item) => item.productId === action.payload.productId);
        if (itemIndex !== -1) {
          state.cartItems[itemIndex].quantity -= 1;
          if (state.cartItems[itemIndex].quantity === 0) {
            state.cartItems.splice(itemIndex, 1);
          }
        }
        const totals = calculateTotals(state.cartItems);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;
        state.vatAmount = totals.vatAmount;
        state.grandTotal = totals.grandTotal;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter((item) => item.productId !== action.payload);
        const totals = calculateTotals(state.cartItems);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;
        state.vatAmount = totals.vatAmount;
        state.grandTotal = totals.grandTotal;
      })
      .addCase(clearCart.fulfilled, (state) => {
        console.log("✅ Redux Store: Sepet başarıyla temizlendi!");
        state.cartItems = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
        state.vatAmount = 0;
        state.shippingCost = 20;
        state.grandTotal = 0;
      });
      
      ;
  },
});

export default cartSlice.reducer;
