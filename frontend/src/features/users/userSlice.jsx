import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "@/services/api"; // ✅ API Merkezi Yönetim

const initialState = {
  users: [],
  selectedUser: null, // ✅ Belirli bir kullanıcıyı saklar
  loading: false,
  error: null,
};

// 📥 **Tüm Kullanıcıları Getir**
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/auth/users");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "❌ Kullanıcılar getirilemedi!");
    }
  }
);

// 📥 **Belirli Bir Kullanıcıyı Getir (ID ile)**
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/auth/users/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "❌ Kullanıcı bulunamadı!");
    }
  }
);

// ➕ **Yeni Kullanıcı Ekle**
export const addUser = createAsyncThunk(
  "users/addUser",
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/users", newUser);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "❌ Kullanıcı eklenemedi!");
    }
  }
);

// ✏️ **Kullanıcıyı Güncelle**
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/auth/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "❌ Kullanıcı güncellenemedi!");
    }
  }
);

// ❌ **Kullanıcıyı Sil**
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await API.delete(`/auth/users/${userId}`);
      return userId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "❌ Kullanıcı silinemedi!");
    }
  }
);

// ✅ **Kullanıcının Aktiflik Durumunu Değiştir**
export const toggleUserStatus = createAsyncThunk(
  "users/toggleUserStatus",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.put(`/auth/users/${userId}/status`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "❌ Kullanıcı durumu değiştirilemedi!");
    }
  }
);

// 🔹 **Kullanıcı Rolünü Güncelle**
export const updateUserRole = createAsyncThunk(
  "users/updateUserRole",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/auth/users/${userId}/role`, { role });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "❌ Rol güncellenemedi!");
    }
  }
);

// ✅ **Adres Güncelleme**
export const updateAddress = createAsyncThunk(
  "users/updateAddress",
  async ({ userId, address }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/auth/users/${userId}`, { address });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "❌ Adres güncellenemedi!");
    }
  }
);

// 📥 **Favorileri Getir**
export const fetchUserFavorites = createAsyncThunk(
  "users/fetchUserFavorites",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/auth/users/${userId}/favorites`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "❌ Favoriler yüklenemedi!");
    }
  }
);

// 📌 **Redux Slice**
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ **Tüm Kullanıcıları Getir**
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ **Tek Kullanıcı Getir**
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })

      // ✅ **Kullanıcı Güncelle**
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      })

      // ✅ **Kullanıcı Sil**
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })

      // ✅ **Rol Güncelle**
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      })

      // ✅ **Kullanıcı Durumunu Değiştir**
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      })

      // ✅ **Adres Güncelleme**
      .addCase(updateAddress.fulfilled, (state, action) => {
        if (state.selectedUser?.id === action.payload.id) {
          state.selectedUser = action.payload;
        }
      })

      // ✅ **Favorileri Getir**
      .addCase(fetchUserFavorites.fulfilled, (state, action) => {
        if (state.selectedUser?.id === action.payload.id) {
          state.selectedUser.favorites = action.payload.favorites;
        }
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
