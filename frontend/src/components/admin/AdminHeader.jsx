import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { logout } from "@/features/auth/authSlice"; // ✅ Doğrudan authSlice'tan logout
import { Link, useNavigate } from "react-router-dom";
import {
  HeaderContainer,
  Logo,
  Nav,
  NavItem,
  Button,
  ProfileSection,
  ProfileDropdown,
  ProfileImage,
  ThemeToggleButton,
} from "./styles/adminHeaderStyles";
import { FaBell, FaUserCircle, FaCog, FaSun, FaMoon, FaSignOutAlt } from "react-icons/fa";
import logo from "@/assets/logo.png";

export default function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language, setLanguage, texts } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user } = useSelector((state) => state.auth); // ✅ Kullanıcı bilgisi authSlice'tan

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout()); // ✅ Logout işlemi
    navigate("/login"); // ✅ Çıkış sonrası login sayfasına yönlendirme
  };

  return (
    <HeaderContainer>
      <Link to="/">
        <Logo src={logo} alt="MD-Hygienelogistik" />
      </Link>

      <Nav>
        {/* ✅ Tema Toggle */}
        <ThemeToggleButton onClick={toggleTheme}>
          {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
        </ThemeToggleButton>

        {/* ✅ Dil Seçimi */}
        <Button onClick={() => setLanguage("tr")} disabled={language === "tr"}>
          🇹🇷
        </Button>
        <Button onClick={() => setLanguage("de")} disabled={language === "de"}>
          🇩🇪
        </Button>
        <Button onClick={() => setLanguage("en")} disabled={language === "en"}>
          🇬🇧
        </Button>

        {/* ✅ Bildirim İkonu */}
        <NavItem>
          <Button>
            <FaBell size={18} />
          </Button>
        </NavItem>

        {/* ✅ Kullanıcı Profil */}
        <ProfileSection onClick={handleProfileClick}>
          {user?.profileImage ? (
            <ProfileImage src={`/${user.profileImage.replace(/^\\/, '')}`} alt={user.name} />

          ) : (
            <FaUserCircle size={24} />
          )}
          <span>{user?.name || "Kullanıcı"}</span>

          {/* ✅ Dropdown Menü */}
          {dropdownOpen && (
            <ProfileDropdown>
              <Link to="/profile">
                <FaUserCircle /> {texts?.profile?.title || "Profilim"}
              </Link>
              <Link to="/settings">
                <FaCog /> {texts?.settings?.title || "Ayarlar"}
              </Link>
              <Button onClick={handleLogout}>
                <FaSignOutAlt /> {texts?.logout || "Çıkış Yap"}
              </Button>
            </ProfileDropdown>
          )}
        </ProfileSection>

        {/* ✅ Çıkış Yap Butonu */}
        {!dropdownOpen && (
          <Button onClick={handleLogout}>
            <FaSignOutAlt size={18} /> {texts?.logout || "Çıkış Yap"}
          </Button>
        )}
      </Nav>
    </HeaderContainer>
  );
}
