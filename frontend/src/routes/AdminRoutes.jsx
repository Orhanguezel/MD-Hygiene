import { Routes, Route, Outlet } from "react-router-dom";
import ProtectedWrapper from "@/pages/auth/ProtectedWrapper";
import AppLayout from "@/layouts/AppLayout";

// ✅ Genel Sayfalar
import Home from "@/pages/visitor/home/Home";
import ProductDetail from "@/pages/visitor/home/components/ProductDetail";
import Cart from "@/pages/user/modules/cart/Cart";
import Checkout from "@/pages/user/modules/cart/Checkout";
import OrderConfirmation from "@/pages/user/modules/cart/OrderConfirmation";

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
import OfferDetails from "@/pages/admin/modules/offer/components/OfferDetails";
import OfferCreate from "@/pages/admin/modules/offer/components/OfferCreate";
import OfferArchive from "@/pages/admin/modules/offer/components/OfferArchive";

// ✅ Products Modülü
import Products from "@/pages/admin/modules/products/Products";
import ProductForm from "@/pages/admin/modules/products/components/ProductForm";
import ManageStock from "@/pages/admin/modules/products/components/ManageStock";
import ProductList from "@/pages/admin/modules/products/components/ProductList";

// ✅ Ayarlar Modülü
import Settings from "@/pages/admin/modules/settings/Settings";
import CompanyManagement from "@/pages/admin/modules/settings/components/CompanyManagement";
import CustomerManagement from "@/pages/admin/modules/settings/components/CustomerManagement";

// ✅ Diğer Modüller
import Reports from "@/pages/admin/modules/report/Reports";
import NotFound from "@/pages/navbar/NotFound";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedWrapper role="admin">
            <AppLayout />
          </ProtectedWrapper>
        }
      >
        {/* ✅ Dashboard */}
        <Route path="dashboard" element={<AdminDashboard />} />

        {/* ✅ Genel Kullanıcı Sayfaları */}
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-confirmation" element={<OrderConfirmation />} />
        <Route path="product/:id" element={<ProductDetail />} />

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
          <Route path=":id" element={<OfferDetails />} />
          <Route path="archive" element={<OfferArchive />} />
        </Route>

        {/* ✅ Ayarlar Modülü */}
        <Route path="settings" element={<Settings />} />
        <Route path="company-management" element={<CompanyManagement />} />
        <Route path="customer-management" element={<CustomerManagement />} />

        {/* ✅ Products Modülü */}
        <Route path="products" element={<Outlet />}>
          <Route index element={<Products />} />
          <Route path="add" element={<ProductForm />} />
          <Route path="list" element={<ProductList />} />
          <Route path="manageStock" element={<ManageStock />} />
        </Route>

        {/* ✅ Diğer Modüller */}
        <Route path="reports" element={<Reports />} />

        {/* ✅ 404 Sayfası */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
