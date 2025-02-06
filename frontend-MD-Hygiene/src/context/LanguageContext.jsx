import { createContext, useReducer, useContext } from "react";
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

  const texts = languages[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, texts }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ✅ Eksik olan export default eklendi
export default LanguageContext;

export const useLanguage = () => useContext(LanguageContext);
