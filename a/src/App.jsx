import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
//import AdminRoutes from "./routes/AdminRoutes";
//import UserRoutes from "./routes/UserRoutes";
//import Login from "./pages/auth/Login";
//import Register from "./pages/auth/Register";
import Home from "./components/Home";
import NotFound from "./components/common/NotFound";
import { useContext } from "react";
import LanguageContext from "./context/LanguageContext";
import styled, { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/themes";
import ThemeContext from "./context/ThemeContext";
import CommonHeader from "./components/common/CommonHeader";
import CommonSidebar from "./components/common/CommonSidebar";

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <CommonSidebar />
      <div style={{ flex: 1, marginLeft: "250px" }}>
        <CommonHeader />
        <main style={{ padding: "20px", marginTop: "80px" }}>{children}</main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <ThemeProvider>
          <LanguageProvider>
            <AppContent />
          </LanguageProvider>
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
};

const AppContent = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);

  return (
    <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </StyledThemeProvider>
  );
};

export default App;
