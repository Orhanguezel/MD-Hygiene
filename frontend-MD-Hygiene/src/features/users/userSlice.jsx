import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

const initialState = {
    users: [],
    loading: false,
    error: null
};

// 📥 Tüm Kullanıcıları Getir
export const getAllUsers = createAsyncThunk('users/getAllUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Bir hata oluştu!');
    }
});

// ➕ Yeni Kullanıcı Ekle
export const addUser = createAsyncThunk('users/addUser', async (newUser, { rejectWithValue }) => {
    try {
        const response = await axios.post(API_URL, newUser);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Kullanıcı eklenemedi!');
    }
});

// ✏️ Kullanıcıyı Güncelle
export const updateUser = createAsyncThunk('users/updateUser', async (updatedUser, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_URL}/${updatedUser.id}`, updatedUser);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Kullanıcı güncellenemedi!');
    }
});

// ❌ Kullanıcıyı Sil
export const deleteUser = createAsyncThunk('users/deleteUser', async (userId, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/${userId}`);
        return userId;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Kullanıcı silinemedi!');
    }
});

// Kullanıcının aktiflik durumunu değiştirme
export const toggleUserStatus = createAsyncThunk(
    'users/toggleUserStatus',
    async (userId, { getState, rejectWithValue }) => {
        try {
            const user = getState().user.users.find((u) => u.id === userId);
            const updatedUser = { ...user, isActive: !user.isActive };
            const response = await axios.put(`${API_URL}/${userId}`, updatedUser);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Durum değiştirilemedi!');
        }
    }
);



export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get Users
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

            // Add User
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Update User
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Delete User
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Toggle User Status
            .addCase(toggleUserStatus.fulfilled, (state, action) => {
                const index = state.users.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload; // Durumu güncelle
                }
            })
            .addCase(toggleUserStatus.rejected, (state, action) => {
                state.error = action.payload;
            });



    }
});

export default userSlice.reducer;
