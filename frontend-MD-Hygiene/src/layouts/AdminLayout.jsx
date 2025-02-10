// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

const AdminLayout = () => (
  <div style={{ display: "flex" }}>
    <AdminSidebar />
    <div style={{ flex: 1, marginLeft: "250px" }}>
      <AdminHeader />
      <main style={{ padding: "20px" }}>
        <Outlet /> {/* ✅ Dinamik içerik burada gösterilir */}
      </main>
    </div>
  </div>
);

export default AdminLayout;
