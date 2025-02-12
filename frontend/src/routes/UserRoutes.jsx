import { Routes, Route, Outlet } from "react-router-dom";
import Home from "@/pages/visitor/home/Home";
import NotFound from "@/components/common/NotFound";
import Contact from "@/pages/visitor/Contact";
import UserLayout from "@/layouts/UserLayout";
import ProtectedWrapper from "@/pages/auth/ProtectedWrapper";

// ✅ Kullanıcı Sayfaları
import Profile from "@/pages/user/modules/profile/Profile";
import ProfileUpdate from "@/pages/user/modules/profile/components/ProfileUpdate";
import Product from "@/pages/visitor/Products";
import Cart from "@/pages/user/modules/cart/Cart";
import Checkout from "@/pages/user/modules/cart/Checkout";
import Favorites from "@/pages/user/Favorites";
import Notifications from "@/pages/user/Notifications";
import AddressBook from "@/pages/user/AddressBook";
import Support from "@/pages/user/Support";
import Category from "@/pages/user/Category";

const UserRoutes = () => (
  <Routes>
    <Route path="/" element={<UserLayout />}>

      {/* ✅ Genel Sayfalar */}
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="category" element={<Category />} />
      <Route path="products" element={<Product />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="contact" element={<Contact />} />

      {/* ✅ Profil Yönetimi */}
      <Route
        path="profile"
        element={
          <ProtectedWrapper>
            <Outlet />
          </ProtectedWrapper>
        }
      >
        <Route index element={<Profile />} />
        <Route path="edit" element={<ProfileUpdate />} />
      </Route>

      {/* ✅ Favoriler */}
      <Route
        path="favorites"
        element={
          <ProtectedWrapper>
            <Favorites />
          </ProtectedWrapper>
        }
      />

      {/* ✅ Bildirimler */}
      <Route
        path="notifications"
        element={
          <ProtectedWrapper>
            <Notifications />
          </ProtectedWrapper>
        }
      />

      {/* ✅ Adres Defteri */}
      <Route
        path="address-book"
        element={
          <ProtectedWrapper>
            <AddressBook />
          </ProtectedWrapper>
        }
      />

      {/* ✅ Destek Merkezi */}
      <Route
        path="support"
        element={
          <ProtectedWrapper>
            <Support />
          </ProtectedWrapper>
        }
      />

      {/* ✅ 404 - Bulunamadı */}
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default UserRoutes;
