import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "@/pages/navbar/Sidebar"; // 🔥 Sidebar sadece adminler için
import Header from "@/pages/navbar/Header"; // 🔥 Tek header kullanılıyor
import Footer from "@/pages/navbar/Footer";
import { LayoutContainer, MainContent } from "./styles/LayoutStyles";
import { useTheme } from "@/features/theme/useTheme"; // ✅ Tema desteği

const AppLayout = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { theme } = useTheme(); // ✅ Tema desteği

  return (
    <LayoutContainer theme={theme}>
      {/* 🔥 Tek Header Kullanımı */}
      <Header />

      <div style={{ display: "flex", flex: 1 }}>
        {/* 🔥 Sidebar Sadece Admin Kullanıcıları İçin */}
        {user?.role === "admin" && <Sidebar />}
        
        <MainContent>
          <Outlet />
        </MainContent>
      </div>

      <Footer />
    </LayoutContainer>
  );
};

export default AppLayout;
