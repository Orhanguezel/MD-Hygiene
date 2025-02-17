import { Routes, Route, Outlet } from "react-router-dom";
import ProtectedWrapper from "@/pages/auth/ProtectedWrapper";
import AppLayout from "@/layouts/AppLayout";

// ✅ Genel Kullanıcı Sayfaları
import Home from "@/pages/visitor/home/Home";
import NotFound from "@/pages/navbar/NotFound";
import ProductDetail from "@/pages/visitor/home/components/ProductDetail";

// ✅ Kullanıcı Sayfaları
import Profile from "@/pages/user/modules/profile/Profile";
import ProfileUpdate from "@/pages/user/modules/profile/components/ProfileUpdate";
import Invoices from "@/pages/user/modules/profile/components/InvoiceList";
import AddressBook from "@/pages/user/modules/profile/components/AddressInfo";
import Favorites from "@/pages/user/Favorites";
import Notifications from "@/pages/user/Notifications";
import Support from "@/pages/user/Support";
import Cart from "@/pages/user/modules/cart/Cart";
import Checkout from "@/pages/user/modules/cart/Checkout";
import OrderConfirmation from "@/pages/user/modules/cart/OrderConfirmation";
import OrderHistory from "@/pages/user/modules/profile/components/OrderHistory"; 

const UserRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <ProtectedWrapper>
          <AppLayout />
        </ProtectedWrapper>
      }
    >
      <Route index element={<Home />} />
      <Route path="product/:id" element={<ProductDetail />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="order-confirmation" element={<OrderConfirmation />} />

      {/* ✅ Profil Yönetimi */}
      <Route path="profile" element={<Outlet />}>
        <Route index element={<Profile />} />
        <Route path=":id" element={<ProfileUpdate />} /> 
        <Route path="invoices" element={<Invoices />} />
        <Route path="address-book" element={<AddressBook />} />
        <Route path="orders" element={<OrderHistory />} />
      </Route>

      {/* ✅ Favoriler */}
      <Route path="favorites" element={<Favorites />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="support" element={<Support />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default UserRoutes;
