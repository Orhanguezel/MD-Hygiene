import { createContext, useContext, useReducer } from "react";
import { languageReducer, initialLanguage } from "./languageReducer";
import tr from "../locales/tr.json";
import en from "../locales/en.json";
import de from "../locales/de.json";

const LanguageContext = createContext();
const languages = { tr, en, de };

export const LanguageProvider = ({ children }) => {
  const [language, dispatch] = useReducer(languageReducer, initialLanguage);

  const setLanguage = (lang) => {
    dispatch({ type: "CHANGE_LANGUAGE", payload: lang });
  };

  const texts = languages[language] || languages.tr;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, texts }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
