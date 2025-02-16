import { Routes, Route, Outlet } from "react-router-dom";
import Home from "@/pages/visitor/home/Home";
import NotFound from "@/components/common/NotFound";
import Contact from "@/pages/visitor/Contact";
import UserLayout from "@/layouts/UserLayout";
import ProtectedWrapper from "@/pages/auth/ProtectedWrapper";

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
import ProductDetail from "@/pages/visitor/home/components/ProductDetail";

const UserRoutes = () => (
  <Routes>
    <Route path="/" element={<UserLayout />}>
      {/* ✅ Genel Sayfalar */}
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="contact" element={<Contact />} />
      <Route path="/product/:id" element={<ProductDetail />} />

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
        <Route path=":id" element={<ProfileUpdate />} />{" "}
        {/* ✅ Dinamik ID ile düzenleme */}
        <Route path="invoices" element={<Invoices />} />


        <Route path="address-book" element={<AddressBook />} />
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

      {/* ✅ Destek Merkezi */}
      <Route
        path="support"
        element={
          <ProtectedWrapper>
            <Support />
          </ProtectedWrapper>
        }
      />

      {/* ✅ 404 */}
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default UserRoutes;
