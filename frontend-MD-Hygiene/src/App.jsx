import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/modules/user/Users";
import Orders from "./pages/modules/order/Orders";
import Invoices from "./pages/admin/Invoices";
import Notifications from "./pages/modules/notification/Notifications.jsx";
import Reports from "./pages/modules/report/Reports.jsx";
import AuditLogs from "./pages/modules/authlog/AuditLogs.jsx";
import Settings from "./pages/admin/Settings";
import NotFound from "./components/common/NotFound";
import { GlobalStyles } from "./styles/globalStyles";
import Layout from "./components/common/Layout";
import { lightTheme, darkTheme } from "./styles/themes";
import styled, { ThemeProvider as StyledThemeProvider } from "styled-components";
import AdminRoutes from "./routes/AdminRoutes";
import { useLanguage } from "./context/LanguageContext";
import { useTheme } from "./context/ThemeContext";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { theme } = useTheme();
  const { texts } = useLanguage();
  const { user, loading } = useAuth();

  if (loading) return <div>{texts.loading || "Yükleniyor..."}</div>;

  return (
    <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <Layout>
          <Routes>
            {user ? (
              <>
                <Route path="/*" element={<AdminRoutes />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/audit-logs" element={<AuditLogs />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )}
          </Routes>
        </Layout>
      </BrowserRouter>
    </StyledThemeProvider>
  );
};

export default App;
