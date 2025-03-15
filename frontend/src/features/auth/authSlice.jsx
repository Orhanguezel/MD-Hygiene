import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

// 🔹 **Kullanıcı Girişi (Login)**
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/login", credentials);

      if (!response.data || !response.data.user || !response.data.user.token) {
        console.error("❌ API yanıtında eksik bilgi var:", response.data);
        return rejectWithValue("❌ Giriş başarısız! API'den geçerli bir yanıt alınamadı.");
      }

      const user = response.data.user;
      const token = user.token;

      console.log("✅ Token alındı:", token);

      // Token ve kullanıcı bilgilerini kaydet
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      return { user, token };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "❌ Giriş başarısız!");
    }
  }
);

// 🔹 **Kullanıcı Kayıt (Register)**
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/register", userData);

      if (!response.data || !response.data.user || !response.data.user.token) {
        return rejectWithValue("❌ Kayıt başarılı, ancak token alınamadı!");
      }

      const user = response.data.user;
      const token = user.token;

      console.log("✅ Yeni kullanıcı kaydedildi:", user);

      // Token ve kullanıcı bilgilerini kaydet
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      return { user, token };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "❌ Kayıt başarısız!");
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
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
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
