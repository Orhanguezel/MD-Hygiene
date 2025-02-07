import { Routes, Route, Outlet } from "react-router-dom";
import ProtectedWrapper from "../pages/auth/ProtectedWrapper";
import Users from "../pages/modules/user/Users";
import Orders from "../pages/modules/order/Orders";
import Invoices from "../pages/admin/Invoices";
import Notifications from "../pages/modules/notification/Notifications.jsx";
import Reports from "../pages/modules/report/Reports.jsx";
import AuditLogs from "../pages/modules/authlog/AuditLogs.jsx";
import Settings from "../pages/admin/Settings";
import NotFound from "../components/common/NotFound";
import CommonSidebar from "../components/common/CommonSidebar";
import CommonHeader from "../components/common/CommonHeader";
import UserDetails from "../pages/modules/user/components/UserDetails.jsx";
import AddUserForm from "../pages/modules/user/components/AddUserForm.jsx";
import OrderDetails from "../pages/modules/order/components/OrderDetails";

const AdminLayout = () => (
  <div style={{ display: "flex" }}>
    <CommonSidebar />
    <div style={{ flex: 1, marginLeft: "250px" }}>
      <CommonHeader />
      <main style={{ padding: "20px" }}>
        <Outlet /> {/* ✅ Sayfa içeriği burada yüklenecek */}
      </main>
    </div>
  </div>
);

const AdminRoutes = () => {
  return (
    <ProtectedWrapper>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          {/* ✅ Users Modülü */}
          <Route path="users" element={<Outlet />}>
            <Route index element={<Users />} /> {/* /users */}
            <Route path="add" element={<AddUserForm />} /> {/* /users/add */}
            <Route path="edit/:email" element={<AddUserForm />} />{" "}
            {/* /users/edit/:email */}
            <Route path=":email" element={<UserDetails />} />{" "}
            {/* /users/:email */}
          </Route>

          {/* ✅ Diğer Modüller */}
          <Route path="orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />  {/* ✅ Detay sayfası için rota */}
          <Route path="invoices" element={<Invoices />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="reports" element={<Reports />} />
          <Route path="audit-logs" element={<AuditLogs />} />
          <Route path="settings" element={<Settings />} />

          {/* ✅ 404 Sayfası */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ProtectedWrapper>
  );
};

export default AdminRoutes;
