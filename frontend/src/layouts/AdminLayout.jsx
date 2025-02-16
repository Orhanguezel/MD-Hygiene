import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import Footer from "@/components/common/Footer";
import { LayoutContainer, MainContent } from "./styles/LayoutStyles";

const AdminLayout = () => {
  return (
    <LayoutContainer>
      <AdminHeader />
      <div style={{ display: "flex", flex: 1 }}>
        <AdminSidebar />
        <MainContent>
          <Outlet />
        </MainContent>
      </div>
      <Footer />
    </LayoutContainer>
  );
};

export default AdminLayout;
