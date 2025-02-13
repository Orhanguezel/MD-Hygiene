import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import ProtectedWrapper from "@/pages/auth/ProtectedWrapper";
import AdminLayout from "@/layouts/AdminLayout";

// ✅ Dashboard
import AdminDashboard from "@/pages/admin/AdminDashboard";

// ✅ Users Modülü
import Users from "@/pages/admin/modules/user/Users";
import UserDetails from "@/pages/admin/modules/user/components/UserDetails";
import AddUserForm from "@/pages/admin/modules/user/components/AddUserForm";

// ✅ Orders Modülü
import Orders from "@/pages/admin/modules/order/Orders";
import OrderDetails from "@/pages/admin/modules/order/components/OrderDetails";

// ✅ Invoices Modülü
import Invoices from "@/pages/admin/modules/invoices/Invoices";
import InvoiceDetails from "@/pages/admin/modules/invoices/components/InvoiceDetails";

// ✅ Offers Modülü
import Offers from "@/pages/admin/modules/offer/Offer";
import OfferDetailForm from "@/pages/admin/modules/offer/components/OfferDetailForm";
import OfferCreate from "@/pages/admin/modules/offer/components/OfferCreate";
import OfferArchive from "@/pages/admin/modules/offer/components/OfferArchive";
import OfferPDF from "@/pages/admin/modules/offer/components/OfferPDF";

// ✅ Products Modülü
import Products from "@/pages/admin/modules/products/Products";
import AddProduct from "@/pages/admin/modules/products/components/AddProduct";
import EditProduct from "@/pages/admin/modules/products/components/EditProduct";
import ProductDetails from "@/pages/admin/modules/products/components/ProductDetails";
import ManageStock from "@/pages/admin/modules/products/components/ManageStock";

// ✅ Diğer Modüller
import Notifications from "@/pages/admin/modules/notification/Notifications";
import Reports from "@/pages/admin/modules/report/Reports";
import AuditLogs from "@/pages/admin/modules/auditlog/AuditLogs";
import Settings from "@/pages/admin/modules/settings/Settings";
import NotFound from "@/components/common/NotFound";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedWrapper role="admin">
            <AdminLayout />
          </ProtectedWrapper>
        }
      >
        {/* ✅ Ana Sayfa Yönlendirmesi */}

        {/* ✅ Dashboard */}
        <Route path="dashboard" element={<AdminDashboard />} />

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
          <Route index element={<Invoices />} />
          <Route path=":id" element={<InvoiceDetails />} />
        </Route>

        {/* ✅ Offers Modülü */}
        <Route path="offers" element={<Outlet />}>
          <Route index element={<Offers />} />
          <Route path="create" element={<OfferCreate />} />
          <Route path="edit/:id" element={<OfferCreate />} />
          <Route path=":id" element={<OfferDetailForm />} />
          <Route path=":id/approve" element={<OfferDetailForm />} />
          <Route path=":id/reject" element={<OfferDetailForm />} />
          <Route path=":id/pdf" element={<OfferPDF />} />
          <Route path="archive" element={<OfferArchive />} />
        </Route>

        {/* ✅ Products Modülü */}
        <Route path="products" element={<Outlet />}>
          <Route index element={<Products />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="edit/:id" element={<EditProduct />} />
          <Route path=":id" element={<ProductDetails />} />
          <Route path="manageStock" element={<ManageStock />} />

        </Route>

        {/* ✅ Diğer Modüller */}
        <Route path="notifications" element={<Notifications />} />
        <Route path="reports" element={<Reports />} />
        <Route path="audit-logs" element={<AuditLogs />} />
        <Route path="settings" element={<Settings />} />

        {/* ✅ 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
