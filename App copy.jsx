import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./frontend-MD-Hygiene/src/context/UserContext";
import { ThemeProvider } from "./frontend-MD-Hygiene/src/context/ThemeContext";
import { LanguageProvider } from "./frontend-MD-Hygiene/src/context/LanguageContext";
import { AuthProvider } from "./frontend-MD-Hygiene/src/context/AuthContext";
//import AdminRoutes from "./routes/AdminRoutes";
//import UserRoutes from "./routes/UserRoutes";
import Login from "./frontend-MD-Hygiene/src/pages/auth/Login";
import Register from "./frontend-MD-Hygiene/src/pages/auth/Register";
import NotFound from "./frontend-MD-Hygiene/src/components/common/NotFound";
import { useContext } from "react";
import LanguageContext from "./frontend-MD-Hygiene/src/context/LanguageContext";
import styled, { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./frontend-MD-Hygiene/src/styles/themes";
import ThemeContext from "./frontend-MD-Hygiene/src/context/ThemeContext";
import CommonHeader from "./frontend-MD-Hygiene/src/components/common/CommonHeader";
import CommonSidebar from "./frontend-MD-Hygiene/src/components/common/CommonSidebar";

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
           {/*<Route path="/admin/*" element={<AdminRoutes />} />*/ } 
            {/*<Route path="/*" element={<UserRoutes />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </StyledThemeProvider>
  );
};

export default App;
