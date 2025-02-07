import { createContext, useReducer, useContext } from "react";

const LanguageContext = createContext();

const languageReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_LANGUAGE":
      return { language: state.language === "de" ? "en" : "de" };
    default:
      return state;
  }
};

export const LanguageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(languageReducer, { language: "de" });

  const toggleLanguage = () => {
    dispatch({ type: "TOGGLE_LANGUAGE" });
  };

  return (
    <LanguageContext.Provider value={{ language: state.language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export default LanguageContext;
