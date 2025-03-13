import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

// 🔹 **Kullanıcı Girişi (Login)**
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      console.log("🔄 Giriş isteği gönderiliyor:", credentials);
      const response = await API.post("/auth/login", credentials);
      console.log(
        "🔥 API Dönen Yanıt:",
        JSON.stringify(response.data, null, 2)
      );

      console.log("🔥 API Yanıtı:", response); // 🛠 Hata ayıklamak için buraya ekle
      console.log("🔥 API Yanıtı (data):", response.data);

      // Burada response.data olup olmadığını doğrula
      if (!response || !response.data) {
        console.error("❌ API yanıtı boş veya geçersiz!");
        return rejectWithValue("❌ API'den geçerli bir yanıt alınamadı!");
      }

      const user = response.data.user;
      const token = response.data.token || response.data.user?.token;

      if (!token) {
        console.error("❌ API yanıtında token eksik:", response.data);
        return rejectWithValue("❌ Token alınamadı, lütfen tekrar deneyin!");
      }

      console.log("✅ Token alındı:", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      return { user, token };
    } catch (error) {
      console.error("❌ API Hatası:", error.response?.data || error);
      return rejectWithValue(
        error.response?.data?.message || "❌ Giriş başarısız!"
      );
    }
  }
);

// 🔹 **Kullanıcı Kayıt (Register)**
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/register", userData);
      
      // API Yanıtı Loglama
      console.log("🔥 API Yanıtı:", response.data);

      // **Eksik Token Kontrolü**
      if (!response.data.user || !response.data.user.token) {
        console.error("❌ API yanıtında token eksik!", response.data);
        return rejectWithValue("❌ Kayıt başarılı, ancak token alınamadı!");
      }

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.user.token);

      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "❌ Kayıt başarısız!"
      );
    }
  }
);



// 🔹 **Çıkış Yap (Logout)**
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  return null;
});

// 📌 **Redux Slice**
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("✅ Redux'a token eklendi mi?", action.payload.token); // ✅ Log ekle!
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log("✅ Redux'a eklenen token:", action.payload.token); // ✅ Token Redux'a ekleniyor mu?
        state.loading = false;
        state.isAuthenticated = true;
        if (!state.user || state.user.role !== "admin") {
          state.user = action.payload.user;
        }
        state.token = action.payload.token;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
