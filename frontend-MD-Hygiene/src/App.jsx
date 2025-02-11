import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import VisitorRoutes from "./routes/VisitorRoutes";
import { GlobalStyles } from "./styles/globalStyles";
import { lightTheme, darkTheme } from "./styles/themes";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useTheme } from "./features/theme/useTheme";
import { useLanguage } from "./features/language/useLanguage";
import Unauthorized from "./pages/auth/Unauthorized";

const App = () => {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  const { theme } = useTheme();
  const { texts } = useLanguage();

  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setIsAppLoading(false);
      }, 1500);
    }
  }, [loading]);

  if (isAppLoading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h3>{texts.app?.loading || "⏳ Yükleniyor, lütfen bekleyin..."}</h3>
      </div>
    );
  }

  return (
    <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <BrowserRouter>
        {error && (
          <div style={{ color: "red", textAlign: "center" }}>{error}</div>
        )}

        <Routes>
          {isAuthenticated ? (
            user?.role === "admin" ? (
              <Route path="/*" element={<AdminRoutes />} />
            ) : (
              <Route path="/*" element={<UserRoutes />} />
            )
          ) : (
            <Route path="/*" element={<VisitorRoutes />} />
          )}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </StyledThemeProvider>
  );
};

export default App;
