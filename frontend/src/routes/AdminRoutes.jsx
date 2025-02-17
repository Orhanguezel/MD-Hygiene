import { Routes, Route, Outlet } from "react-router-dom";
import ProtectedWrapper from "@/pages/auth/ProtectedWrapper";
import AppLayout from "@/layouts/AppLayout";

// ✅ Genel Sayfalar
import Home from "@/pages/modules/home/Home";
import ProductDetail from "@/pages/modules/home/components/ProductDetail";
import Cart from "@/pages/modules/cart/Cart";
import Checkout from "@/pages/modules/cart/Checkout";
import OrderConfirmation from "@/pages/modules/cart/OrderConfirmation";

// ✅ Profil Yönetimi
import Profile from "@/pages/modules/profile/Profile";
import ProfileUpdate from "@/pages/modules/profile/components/ProfileUpdate";
import AddressBook from "@/pages/modules/profile/components/AddressInfo";
import OrderHistory from "@/pages/modules/profile/components/OrderHistory";


// ✅ Dashboard
import AdminDashboard from "@/pages/modules/dashboard/AdminDashboard";

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


// ✅ Offers Modülü
import Offers from "@/pages/modules/offer/Offer";
import OfferDetails from "@/pages/modules/offer/components/OfferDetails";
import OfferCreate from "@/pages/modules/offer/components/OfferCreate";
import OfferArchive from "@/pages/modules/offer/components/OfferArchive";

// ✅ Products Modülü
import Products from "@/pages/modules/products/Products";
import ProductForm from "@/pages/modules/products/components/ProductForm";
import ManageStock from "@/pages/modules/products/components/ManageStock";
import ProductList from "@/pages/modules/products/components/ProductList";

// ✅ Ayarlar Modülü
import Settings from "@/pages/modules/settings/Settings";
import CompanyManagement from "@/pages/modules/settings/components/CompanyManagement";
import CustomerManagement from "@/pages/modules/settings/components/CustomerManagement";

// ✅ Diğer Modüller
import Reports from "@/pages/modules/report/Reports";
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

        {/* ✅ Profil Yönetimi */}
        <Route path="profile" element={<Outlet />}>
          <Route index element={<Profile />} />
          <Route path=":id" element={<ProfileUpdate />} />
          <Route path="address-book" element={<AddressBook />} />
          <Route path="orders" element={<OrderHistory />} />
        </Route>

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
        <Route path="products" element={<Products />}>
          <Route index element={<ProductList />} />{" "}
          <Route path="add" element={<ProductForm />} />{" "}
          <Route path="manageStock" element={<ManageStock />} />{" "}
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
