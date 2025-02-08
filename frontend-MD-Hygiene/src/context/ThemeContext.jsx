import { createContext, useContext, useReducer } from "react";
import { themeReducer, initialTheme } from "./themeReducer";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, dispatch] = useReducer(themeReducer, initialTheme);

  const toggleTheme = () => dispatch({ type: "TOGGLE_THEME" });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
