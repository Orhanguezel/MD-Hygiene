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

  // 🔄 **Eğer yetkilendirme bilgileri henüz yüklenmediyse bekleme ekranı**
  if (isAuthenticated === null) {
    return <p>🔄 Sayfa yükleniyor...</p>;
  }

  return (
    <LayoutContainer theme={theme}>
      {/* 🔥 Tek Header Kullanımı */}
      <Header />

      <div style={{ display: "flex", flex: 1 }}>
        {/* 🔥 Sidebar: Eğer admin değilse, boş div ile yüklenmeyi hızlandır */}
        {isAuthenticated && user?.role === "admin" ? <Sidebar /> : <div style={{ width: "250px" }}></div>}

        <MainContent>
          <Outlet />
        </MainContent>
      </div>

      <Footer />
    </LayoutContainer>
  );
};

export default AppLayout;
