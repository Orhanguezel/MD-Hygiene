import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api"; // ✅ Merkezi API yapısı
import { toast } from "react-toastify";

// ✅ Ürünleri Çekme
export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, thunkAPI) => {
  try {
    const response = await API.get("/data");
    return response.data;
  } catch (error) {
    toast.error("❌ Ürünler yüklenirken hata oluştu!");
    return thunkAPI.rejectWithValue(error.response?.data || "Ürünler alınırken hata oluştu");
  }
});

// ✅ Kategorileri Çekme
export const fetchCategories = createAsyncThunk("products/fetchCategories", async (_, thunkAPI) => {
  try {
    const response = await API.get("/category");
    return response.data;
  } catch (error) {
    toast.error("❌ Kategoriler yüklenirken hata oluştu!");
    return thunkAPI.rejectWithValue(error.response?.data || "Kategoriler alınırken hata oluştu");
  }
});

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, thunkAPI) => {
    try {
      const newProduct = {
        ...productData,
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock),
        images:
          productData.images.length > 0
            ? productData.images
            : ["/placeholder.jpg"],
        category: productData.category || { id: 1, name: "General", image: "" },
        creationAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log("📌 API'ye gönderilen veri:", newProduct); // 🔍 API'ye giden veriyi görmek için

      const response = await API.post("/data", newProduct);
      toast.success("✅ Ürün başarıyla eklendi!");
      return response.data;
    } catch (error) {
      console.error("❌ API Hatası:", error); // 🔍 API Hatası Göster
      toast.error("❌ Ürün eklenirken hata oluştu!");
      return thunkAPI.rejectWithValue(
        error.response?.data || "Ürün eklenirken hata oluştu"
      );
    }
  }
);

// Ürün Güncelleme
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (productData, thunkAPI) => {
    try {
      const response = await API.put(`/data/${productData.id}`, productData);
      toast.info(`🔄 ${productData.title || "Ürün"} başarıyla güncellendi!`);
      return response.data;
    } catch (error) {
      toast.error("❌ Ürün güncellenirken hata oluştu!");
      return thunkAPI.rejectWithValue(
        error.response?.data || "Ürün güncellenirken hata oluştu"
      );
    }
  }
);

// Ürün Silme
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/data/${id}`);
      toast.warn("🗑️ Ürün başarıyla silindi!");
      return id;
    } catch (error) {
      toast.error("❌ Ürün silinirken hata oluştu!");
      return thunkAPI.rejectWithValue(
        error.response?.data || "Ürün silinirken hata oluştu"
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    filteredProducts: [],
    categories: [],
    selectedCategory: null,
    loading: false,
    error: null,
  },
  reducers: {
    filterByCategory: (state, action) => {
      const categoryId = action.payload;
      state.selectedCategory = categoryId;
      state.filteredProducts = categoryId 
        ? state.products.filter((product) => product.category.id === categoryId)
        : state.products; // 📌 Eğer `null` ise tüm ürünleri göster
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload; // 📌 Başlangıçta tüm ürünleri göster
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ürünler yüklenemedi.";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload || "Kategoriler yüklenemedi.";
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        console.log("✅ Yeni ürün Redux Store'a eklendi:", action.payload); // 🔍 Yeni eklenen ürünü kontrol et
        state.products.push(action.payload);
        state.categories = action.payload.categories;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload || "Ürün eklenemedi.";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload || "Ürün güncellenemedi.";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload || "Ürün silinemedi.";
      });
  },
});

export const { filterByCategory } = productSlice.actions;
export default productSlice.reducer;
