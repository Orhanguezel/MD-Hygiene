// ✅ src/features/language/languageSlice.js
import { createSlice } from '@reduxjs/toolkit';
import tr from '../../locales/tr.json';
import en from '../../locales/en.json';
import de from '../../locales/de.json';

const initialLanguage = localStorage.getItem("language") || "tr";
const languages = { tr, en, de };

const languageSlice = createSlice({
  name: "language",
  initialState: {
    language: initialLanguage,
    texts: languages[initialLanguage] || languages.tr,
  },
  reducers: {
    changeLanguage: (state, action) => {
      const lang = action.payload;
      localStorage.setItem("language", lang);
      state.language = lang;
      state.texts = languages[lang] || languages.tr;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;