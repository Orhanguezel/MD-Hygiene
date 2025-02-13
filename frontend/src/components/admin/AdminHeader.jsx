import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { logout } from "@/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  HeaderContainer,
  LogoLink,
  Logo,
  Name,
  Nav,
  NavItem,
  LanguageSelect,
  ThemeToggleButton,
  ControlContainer,
  ProfileSection,
  ProfileImage,
  ProfileDropdown
} from "./styles/adminHeaderStyles";
import { FaHome, FaUserCircle, FaCog, FaSignOutAlt, FaSun, FaMoon, FaBell } from "react-icons/fa";
import logo from "@/assets/logo.png";

export default function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language, setLanguage, texts } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user } = useSelector((state) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <HeaderContainer>
      {/* ✅ Logo */}
      <LogoLink to="/">
        <Logo src={logo} alt="MD-Hygienelogistik" />
        <Name>MD-HL</Name>
      </LogoLink>

      {/* ✅ Kontroller (Dil, Tema, Bildirim) */}
      <ControlContainer>
        <LanguageSelect value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="tr">🇹🇷</option>
          <option value="en">🇬🇧</option>
          <option value="de">🇩🇪</option>
        </LanguageSelect>

        <ThemeToggleButton onClick={toggleTheme}>
          {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
        </ThemeToggleButton>

        <NavItem as={Link} to="/notifications">
          <FaBell size={18} />
        </NavItem>
      </ControlContainer>

      {/* ✅ Navbar (Mobilde Sadece İkonlar Gösteriliyor) */}
      <Nav>
        <NavItem as={Link} to="/">
          <FaHome size={22} />
        </NavItem>
        <NavItem as={Link} to="/settings">
          <FaCog size={22} />
        </NavItem>
      </Nav>

      {/* ✅ Profil Alanı */}
      <ProfileSection onClick={handleProfileClick}>
        {user?.profileImage ? (
          <ProfileImage src={`/${user.profileImage.replace(/^\\/, '')}`} alt={user.name} />
        ) : (
          <FaUserCircle size={24} />
        )}
        {/* ✅ Dropdown Menü */}
        {dropdownOpen && (
          <ProfileDropdown>
            <Link to="/profile">
              <FaUserCircle /> {texts?.profile?.title || "Profilim"}
            </Link>
            <Link to="/settings">
              <FaCog /> {texts?.settings?.title || "Ayarlar"}
            </Link>
            <button onClick={handleLogout}>
              <FaSignOutAlt /> {texts?.logout || "Çıkış Yap"}
            </button>
          </ProfileDropdown>
        )}
      </ProfileSection>
    </HeaderContainer>
  );
}
