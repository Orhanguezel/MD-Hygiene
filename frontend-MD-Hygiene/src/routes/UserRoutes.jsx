import { Routes, Route, Outlet } from "react-router-dom";
import Home from "@/pages/visitor/Home";
import NotFound from "@/components/common/NotFound";
import About from "@/pages/visitor/About";
import Contact from "@/pages/visitor/Contact";
import UserLayout from "@/layouts/UserLayout";
import ProtectedWrapper from "@/pages/auth/ProtectedWrapper";
import Profile from "@/pages/user/modules/profile/Profile";
import ProfileUpdate from "@/pages/user/modules/profile/components/ProfileUpdate";
import Product from "@/pages/visitor/Products";
import Order from "@/pages/user/Order";
import Cart from "@/pages/user/Cart";
import Dashboard from "@/pages/user/Dashboard";
import Favorites from "@/pages/user/Favorites";
import Notifications from "@/pages/user/Notifications";
import AddressBook from "@/pages/user/AddressBook";
import Support from "@/pages/user/Support";

const UserRoutes = () => (
  <Routes>
    <Route path="/" element={<UserLayout />}>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="products" element={<Product />} />
      <Route path="orders" element={<Order />} />
      <Route path="cart" element={<Cart />} />

      {/* ✅ Kullanıcı Dashboard */}
      <Route
        path="dashboard"
        element={
          <ProtectedWrapper>
            <Dashboard />
          </ProtectedWrapper>
        }
      />

      {/* ✅ Profil */}
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

      {/* ✅ Yönlendirme */}
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default UserRoutes;
