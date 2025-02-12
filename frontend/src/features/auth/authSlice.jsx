import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/services/api';

// 🔑 Giriş Yapma (Login)
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await API.get('/users', {
      params: { email: credentials.email, password: credentials.password },
    });

    if (response.data.length === 0) {
      return rejectWithValue('Geçersiz email veya şifre!');
    }

    const user = response.data[0];

    if (!user.isActive) {
      return rejectWithValue('Hesabınız aktif değil!');
    }

    localStorage.setItem('user', JSON.stringify(user));
    return { user };
  } catch (error) {
    return rejectWithValue('Giriş başarısız! Lütfen tekrar deneyin.');
  }
});


// ✅ Register İşlemi (Geçici Çözüm)
export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await API.post('/users', { 
      ...userData, 
      role: 'user', 
      isActive: true, 
      createdAt: new Date().toISOString() 
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Kayıt başarısız!');
  }
});


// 🚪 Çıkış Yapma (Logout)
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
  return true;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('user'),
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
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })


      // Register İşlemleri
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
