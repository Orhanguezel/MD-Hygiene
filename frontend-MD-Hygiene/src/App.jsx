import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import Login from "./pages/auth/Login";
import AdminRoutes from "./routes/AdminRoutes";
import { GlobalStyles } from "./styles/globalStyles";
import { lightTheme, darkTheme } from "./styles/themes";
import styled, { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useTheme } from "./features/theme/useTheme";
import { useLanguage } from "./features/language/useLanguage";
import Home from "./pages/user/Home";
import Unauthorized from "./pages/auth/Unauthorized";

const App = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const { theme } = useTheme();
  const { texts } = useLanguage();

  if (loading) return <div>{texts?.loading || "Yükleniyor..."}</div>;

  return (
    <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <BrowserRouter>
        {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}

        <Routes>
          {isAuthenticated ? (
            user?.role === "admin" ? (
              <Route path="/*" element={<AdminRoutes />} />
            ) : (
              <Route path="/home" element={<Home />} />
            )
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </StyledThemeProvider>
  );
};

export default App;
