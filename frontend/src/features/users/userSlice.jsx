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
      const response = await API.get("/users");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Bir hata oluştu!");
    }
  }
);

// 📥 **Belirli Bir Kullanıcıyı Getir (ID ile)**
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Kullanıcı bulunamadı!");
    }
  }
);

// ➕ **Yeni Kullanıcı Ekle**
export const addUser = createAsyncThunk(
  "users/addUser",
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await API.post("/users", newUser);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Kullanıcı eklenemedi!");
    }
  }
);

// ✏️ **Kullanıcıyı Güncelle**
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (updatedUser, { rejectWithValue }) => {
    try {
      const response = await API.put(`/users/${updatedUser.id}`, updatedUser);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Kullanıcı güncellenemedi!");
    }
  }
);

// ❌ **Kullanıcıyı Sil**
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await API.delete(`/users/${userId}`);
      return userId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Kullanıcı silinemedi!");
    }
  }
);

// ✅ **Kullanıcının Aktiflik Durumunu Değiştir**
export const toggleUserStatus = createAsyncThunk(
  "users/toggleUserStatus",
  async (userId, { getState, rejectWithValue }) => {
    try {
      const user = getState().user.users.find((u) => u.id === userId);
      const updatedUser = { ...user, isActive: !user.isActive };
      const response = await API.put(`/users/${userId}`, updatedUser);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Durum değiştirilemedi!");
    }
  }
);

// ✅ **Adres Güncelleme**
export const updateAddress = createAsyncThunk(
  "users/updateAddress",
  async ({ userId, address }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/users/${userId}`, { address });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Adres güncellenemedi!");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📥 **Tüm Kullanıcıları Getir**
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📥 **Belirli Kullanıcıyı Getir (ID ile)**
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.selectedUser = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ➕ **Yeni Kullanıcı Ekle**
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ✏️ **Kullanıcı Güncelleme**
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ❌ **Kullanıcı Silme**
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ✅ **Kullanıcı Durumunu Değiştir**
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ✅ **Adres Güncelleme**
      .addCase(updateAddress.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
