// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import CommonSidebar from "@/components/common/CommonSidebar";
import CommonHeader from "@/components/common/CommonHeader";

const AdminLayout = () => (
  <div style={{ display: "flex" }}>
    <CommonSidebar />
    <div style={{ flex: 1, marginLeft: "250px" }}>
      <CommonHeader />
      <main style={{ padding: "20px" }}>
        <Outlet /> {/* ✅ Dinamik içerik burada gösterilir */}
      </main>
    </div>
  </div>
);

export default AdminLayout;
