import { useContext, useState } from "react";
import { Menu } from "@headlessui/react";
import AuthContext from "../AuthContext";
import logo from "../assets/logo.png";
import { FaCog, FaUser } from "react-icons/fa";

import {
  HeaderContainer,
  LogoContainer,
  LogoImage,
  LogoText,
  Nav,
  NavItem,
  ProfileButton,
  UserImage, // ✅ `UserImage` düzgün bir şekilde içe aktarıldı
  UserDropdown,
} from "../styles/HeaderStyles";

export default function Header() {
  const { user, signout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <HeaderContainer>
      {/* ✅ Logo ve Başlık */}
      <LogoContainer>
        <LogoImage src={logo} alt="Admin Dashboard" />
        <LogoText>MD-Hygienelogistik</LogoText>
      </LogoContainer>

      {/* ✅ Ana Menü (Minimal - Sadece Hızlı Erişim Linkleri) */}
      <Nav>
        <NavItem to="/admin/dashboard">🏠 Startseite</NavItem>
        <NavItem to="/admin/inventory">📦 Inventar</NavItem>
      </Nav>

      {/* ✅ Profil ve Ayarlar Dropdown */}
      <Menu as="div" className="relative">
        <ProfileButton onClick={() => setDropdownOpen(!dropdownOpen)}>
          <UserImage src={user?.imageUrl || "/default-profile.png"} alt="Profil" />
        </ProfileButton>
        <UserDropdown $isOpen={dropdownOpen}>
          <NavItem to="/admin/profile"><FaUser /> Profil</NavItem>
          <NavItem to="/admin/settings"><FaCog /> Einstellungen</NavItem>
          <NavItem to="/login" onClick={signout}>🚪 Abmelden</NavItem>
        </UserDropdown>
      </Menu>
    </HeaderContainer>
  );
}
