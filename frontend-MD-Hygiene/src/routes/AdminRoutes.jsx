import { Routes, Route, Outlet } from "react-router-dom";
import ProtectedWrapper from "@/pages/auth/ProtectedWrapper";
import Dashboard from "@/pages/admin/Dashboard";

// ✅ Users Modülü
import Users from "@/pages/modules/user/Users";
import UserDetails from "@/pages/modules/user/components/UserDetails";
import AddUserForm from "@/pages/modules/user/components/AddUserForm";

// ✅ Orders Modülü
import Orders from "@/pages/modules/order/Orders";
import OrderDetails from "@/pages/modules/order/components/OrderDetails";

// ✅ Invoices Modülü
import Invoices from "@/pages/modules/invoices/Invoices";
import InvoiceDetails from "@/pages/modules/invoices/components/InvoiceDetails";

// ✅ Diğer Modüller
import Notifications from "@/pages/modules/notification/Notifications";
import Reports from "@/pages/modules/report/Reports";
import AuditLogs from "@/pages/modules/authlog/AuditLogs";
import Settings from "@/pages/modules/settings/Settings";
import NotFound from "@/components/NotFound";

// ✅ Offers Modülü
import Offers from "@/pages/modules/offer/Offer";
import OfferDetailForm from "@/pages/modules/offer/components/OfferDetailForm";
import OfferCreate from "@/pages/modules/offer/components/OfferCreate";


// ✅ Products Modülü
import Products from "@/pages/modules/products/Products";
import AddProduct from "@/pages/modules/products/components/AddProduct";
import EditProduct from "@/pages/modules/products/components/EditProduct";
import ProductDetails from "@/pages/modules/products/components/ProductDetails";

// ✅ AdminLayout
import AdminLayout from "@/layouts/AdminLayout";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedWrapper role="admin">
            {" "}
            {/* ✅ Yalnızca admin erişebilir */}
            <AdminLayout />
          </ProtectedWrapper>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />

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

        <Route path="offers" element={<Outlet />}>
          <Route index element={<Offers />} /> {/* ✅ Teklif Ana Sayfası */}
          <Route path="create" element={<OfferCreate />} />{" "}
          {/* ✅ Yeni Teklif */}
          <Route path="edit/:id" element={<OfferCreate />} />{" "}
          {/* ✅ Düzenleme */}
          <Route path=":id" element={<OfferDetailForm />} />{" "}
          {/* ✅ Teklif Detayı */}
          {/* ✅ Teklif İşlemleri */}
          <Route path=":id/approve" element={<OfferDetailForm />} />{" "}
          {/* ✅ Onaylama */}
          <Route path=":id/reject" element={<OfferDetailForm />} />{" "}
          {/* ✅ Reddetme */}
        </Route>

        {/* ✅ Products Modülü */}
        <Route path="products" element={<Outlet />}>
          <Route index element={<Products />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="edit/:id" element={<EditProduct />} />
          <Route path=":id" element={<ProductDetails />} />
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
  );
};

export default AdminRoutes;
