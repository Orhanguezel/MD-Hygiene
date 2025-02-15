import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

// 📌 Kullanıcı profilini güncelleme (Ad, Soyad, E-posta)
export const updateProfile = createAsyncThunk(
  "settings/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await API.put(`/users/${profileData.id}`, profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Profil güncellenemedi!");
    }
  }
);

// 📌 Şirket bilgilerini güncelleme
export const updateCompanyInfo = createAsyncThunk(
  "settings/updateCompanyInfo",
  async (companyData, { rejectWithValue }) => {
    try {
      const response = await API.put(`/companies/${companyData.id}`, companyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Firma bilgileri güncellenemedi!");
    }
  }
);

// 📌 Kullanıcı şifresini güncelleme
export const updatePassword = createAsyncThunk(
  "settings/updatePassword",
  async ({ id, newPassword }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/users/update-password`, { id, password: newPassword });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Şifre güncellenemedi!");
    }
  }
);

const initialState = {
  language: "tr",
  theme: "light",
  user: null, // Kullanıcı bilgileri burada saklanır
  company: null, // Şirket bilgileri burada saklanır
  texts: {
    settings: {
      title: "Ayarlar",
      profileSettings: "Profil Ayarları",
      name: "Ad Soyad",
      email: "E-posta",
      updateProfile: "Profili Güncelle",
      appSettings: "Uygulama Ayarları",
      theme: "Tema",
      darkMode: "Karanlık Mod",
      lightMode: "Aydınlık Mod",
      language: "Dil",
      passwordSettings: "Şifre Ayarları",
      newPassword: "Yeni Şifre",
      confirmPassword: "Şifreyi Onayla",
      updatePassword: "Şifreyi Güncelle",
      companySettings: "Firma Bilgileri",
      companyName: "Firma Adı",
      companyAddress: "Adres",
      companyEmail: "Firma E-Posta",
      updateCompany: "Firma Bilgilerini Güncelle",
    },
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateCompanyInfo.fulfilled, (state, action) => {
        state.company = action.payload;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.status = "succeeded";
      });
  },
});

export const { setLanguage, toggleTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
