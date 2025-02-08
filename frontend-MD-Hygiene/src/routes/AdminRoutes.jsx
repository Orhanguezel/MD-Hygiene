// src/routes/AdminRoutes.jsx
import { Routes, Route, Outlet } from "react-router-dom";
import ProtectedWrapper from "../pages/auth/ProtectedWrapper";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/modules/user/Users";
import Orders from "../pages/modules/order/Orders";
import Invoices from "../pages/modules/invoices/Invoices.jsx";
import Notifications from "../pages/modules/notification/Notifications.jsx";
import Reports from "../pages/modules/report/Reports.jsx";
import AuditLogs from "../pages/modules/authlog/AuditLogs.jsx";
import Settings from "../pages/modules/settings/Settings.jsx";
import NotFound from "../components/common/NotFound";
import UserDetails from "../pages/modules/user/components/UserDetails.jsx";
import AddUserForm from "../pages/modules/user/components/AddUserForm.jsx";
import OrderDetails from "../pages/modules/order/components/OrderDetails";
import InvoiceDetails from "../pages/modules/invoices/components/InvoiceDetails.jsx";
import Offers from "../pages/modules/offer/Offer.jsx";
import Products from "../pages/modules/products/Products.jsx";
// import OfferDetails from "../pages/modules/offer/components/OfferDetails.jsx";

// ✅ AdminLayout import edildi
import AdminLayout from "../layouts/AdminLayout";

const AdminRoutes = () => {
  return (
    <ProtectedWrapper>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* ✅ Users Modülü */}
          <Route path="users" element={<Outlet />}>
            <Route index element={<Users />} />
            <Route path="add" element={<AddUserForm />} />
            <Route path="edit/:id" element={<AddUserForm />} />
            <Route path=":id" element={<UserDetails />} />
          </Route>

          {/* ✅ Orders Modülü */}
          <Route path="orders" element={<Outlet />}>
            <Route index element={<Orders />} />
            <Route path=":id" element={<OrderDetails />} />
          </Route>

          {/* ✅ Invoices Modülü */}
          <Route path="invoices" element={<Outlet />}>
            <Route index element={<Invoices />} /> {/* /invoices */}
            <Route path=":id" element={<InvoiceDetails />} />{" "}
            {/* /invoices/:id */}
          </Route>

          {/* ✅ Offers Modülü */}
          <Route path="offers" element={<Outlet />}>
            <Route index element={<Offers />} />
            {/*<Route path=":id" element={<OfferDetails />} />*/}
          </Route>

          {/* ✅ Product Modülü */}
          <Route path="products" element={<Outlet />}>
            <Route index element={<Products />} />
            {/*<Route path=":id" element={<OfferDetails />} />*/}
          </Route>

          {/* ✅ Diğer Modüller */}
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
