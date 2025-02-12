// src/features/settings/settingsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'tr',
  theme: 'light',
  texts: {
    settings: {
      title: 'Ayarlar',
      profileSettings: 'Profil Ayarları',
      name: 'Ad Soyad',
      email: 'E-posta',
      updateProfile: 'Profili Güncelle',
      appSettings: 'Uygulama Ayarları',
      theme: 'Tema',
      darkMode: 'Karanlık Mod',
      lightMode: 'Aydınlık Mod',
      language: 'Dil',
      passwordSettings: 'Şifre Ayarları',
      newPassword: 'Yeni Şifre',
      confirmPassword: 'Şifreyi Onayla',
      updatePassword: 'Şifreyi Güncelle',
    },
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { setLanguage, toggleTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
