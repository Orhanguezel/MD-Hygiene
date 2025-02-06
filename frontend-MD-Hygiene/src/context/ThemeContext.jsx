import { createContext, useReducer, useContext } from "react";
import { themeReducer, initialTheme } from "./themeReducer";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, dispatch] = useReducer(themeReducer, initialTheme);

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ✅ Eksik olan export default eklendi
export default ThemeContext;

export const useTheme = () => useContext(ThemeContext);
