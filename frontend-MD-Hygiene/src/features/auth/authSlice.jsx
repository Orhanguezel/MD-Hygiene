import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginAPI, getUserProfile } from '@/api/authApi';
import usersData from "@/data/users.json"; // JSON verileri

// ✅ Kullanıcı Profilini Getirme (AsyncThunk)
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserProfile();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Login İşlemi (AsyncThunk)
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await loginAPI(email, password);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleUserStatus = createAsyncThunk(
  'auth/toggleUserStatus',
  async ({ userId, currentStatus }) => {
    // Burada API'ye istek atarak kullanıcının durumunu değiştir
    return { userId, currentStatus };
  }
);

// ✅ Kullanıcıları JSON'dan Getirme
export const fetchUsers = createAsyncThunk(
  'auth/fetchUsers',
  async () => {
    return usersData; // JSON'dan verileri döner
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  users: [],
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

// ✅ Eksiksiz Exportlar
export const { logoutUser, setUser, setAuthError, addUser } = authSlice.actions;
export default authSlice.reducer;

+^