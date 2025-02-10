import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import AdminRoutes from "./routes/AdminRoutes";
import { GlobalStyles } from "./styles/globalStyles";
import { lightTheme, darkTheme } from "./styles/themes";
import styled, { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useAuth } from "./features/auth/useAuth";
import { useTheme } from "./features/theme/useTheme";
import { useLanguage } from "./features/language/useLanguage";
import Home from "./pages/user/Home";

const App = () => {
  const { user, loading } = useAuth();             // ✅ Redux'tan kullanıcı verisi
  const { theme } = useTheme();                    // ✅ Redux'tan tema yönetimi
  const { texts } = useLanguage();                 // ✅ Redux'tan dil yönetimi

  if (loading) return <div>{texts?.loading || "Yükleniyor..."}</div>; // Yüklenme durumu

  return (
    <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {user ? (
            <Route path="/*" element={<AdminRoutes />} /> // ✅ Giriş yapılmışsa admin sayfalarına yönlendir
          ) : (
            <>
            <Route path="/home" element={<Home />} />
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
