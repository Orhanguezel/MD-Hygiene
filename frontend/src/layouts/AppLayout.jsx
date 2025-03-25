import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "@/pages/navbar/Sidebar";
import Header from "@/pages/navbar/Header";
import Footer from "@/pages/navbar/Footer";
import { LayoutContainer, MainContent } from "./styles/LayoutStyles";
import { useTheme } from "@/features/theme/useTheme";

const AppLayout = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { theme } = useTheme();


  if (typeof isAuthenticated !== "boolean") {
    return <p>🔄 Sayfa yükleniyor...</p>;
  }

  return (
    <LayoutContainer theme={theme}>
      <Header />

      <div style={{ display: "flex", flex: 1 }}>
        {isAuthenticated && user?.role === "admin" ? (
          <Sidebar />
        ) : (
          <div style={{ width: "0px" }}></div> 
        )}

        <MainContent>
          <Outlet />
        </MainContent>
      </div>

      <Footer />
    </LayoutContainer>
  );
};

export default AppLayout;
