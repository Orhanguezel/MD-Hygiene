import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import AdminRoutes from "./routes/AdminRoutes";
import { GlobalStyles } from "./styles/globalStyles";
import { lightTheme, darkTheme } from "./styles/themes";
import styled, { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useLanguage } from "./context/LanguageContext";
import { useTheme } from "./context/ThemeContext";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { theme } = useTheme();
  const { texts } = useLanguage();
  const { user, loading } = useAuth();

  if (loading) return <div>{texts?.loading || "Yükleniyor..."}</div>;

  return (
    <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {user ? (
            <Route path="/*" element={<AdminRoutes />} />
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </StyledThemeProvider>
  );
};

export default App;
