import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedWrapper from "../pages/auth/ProtectedWrapper";
import AdminDashboard from "../components/admin/AdminDashboard";
import Inventory from "../components/admin/Inventory";
import OrderManagement from "../components/admin/OrderManagement";
import ProductManagement from "../components/admin/ProductManagement";
import UserManagement from "../components/admin/UserManagement";
import Shipments from "../components/admin/Shipments";
import InvoiceManagement from "../components/admin/InvoiceManagement";
import DiscountManagement from "../components/admin/DiscountManagement";
import Notifications from "../components/admin/Notifications";
import AuditLogs from "../components/admin/AuditLogs";
import Reports from "../components/admin/Reports";
import Profile from "../components/admin/Profile";
import Settings from "../utils/Settings";
import OfferManagement from "../components/admin/OfferManagement";
import NotFound from "../components/common/NotFound";

const AdminRoutes = () => {
  return (
    <ProtectedWrapper>
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="shipments" element={<Shipments />} />
        <Route path="invoices" element={<InvoiceManagement />} />
        <Route path="discounts" element={<DiscountManagement />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="audit-logs" element={<AuditLogs />} />
        <Route path="reports" element={<Reports />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="offers" element={<OfferManagement />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ProtectedWrapper>
  );
};

export default AdminRoutes;
