import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

// 🔑 **Kullanıcı Girişi (Login)**
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/login", credentials);

      const user = response.data.user;
      const token = response.data.user.token; // Token al

      // ✅ Kullanıcı ve token'ı localStorage'a kaydet
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      return { user, token };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "❌ Giriş başarısız!");
    }
  }
);

// 📝 **Kayıt İşlemi (Register)**
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/register", userData);

      const user = response.data.user;
      const token = response.data.user.token;

      // ✅ Kullanıcı ve token'ı localStorage'a kaydet
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      return { user, token };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "❌ Kayıt başarısız!");
    }
  }
);

// 🚪 **Çıkış Yapma (Logout)**
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  return null;
});

// 🔹 **Redux Slice**
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("user"),
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
      // 🟢 **Giriş İşlemi (Login)**
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

      // 🟢 **Çıkış İşlemi (Logout)**
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })

      // 🟢 **Kayıt İşlemi (Register)**
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
