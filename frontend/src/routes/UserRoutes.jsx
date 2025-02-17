import { Routes, Route, Outlet } from "react-router-dom";
import ProtectedWrapper from "@/pages/auth/ProtectedWrapper";
import AppLayout from "@/layouts/AppLayout";

// ✅ Genel Kullanıcı Sayfaları
import Home from "@/pages/modules/home/Home";
import NotFound from "@/pages/navbar/NotFound";
import ProductDetail from "@/pages/modules/home/components/ProductDetail";

// ✅ Kullanıcı Sayfaları
import Profile from "@/pages/modules/profile/Profile";
import ProfileUpdate from "@/pages/modules/profile/components/ProfileUpdate";
import AddressBook from "@/pages/modules/profile/components/AddressInfo";
import Cart from "@/pages/modules/cart/Cart";
import Checkout from "@/pages/modules/cart/Checkout";
import OrderConfirmation from "@/pages/modules/cart/OrderConfirmation";
import OrderHistory from "@/pages/modules/profile/components/OrderHistory"; 

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
        <Route path="address-book" element={<AddressBook />} />
        <Route path="orders" element={<OrderHistory />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default UserRoutes;
