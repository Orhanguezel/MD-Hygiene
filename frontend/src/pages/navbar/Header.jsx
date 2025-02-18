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
  ControlContainer,
  ProfileSection,
  ProfileImage,
  ProfileDropdown,
  LanguageSelect,
  ThemeToggleButton,
} from "./styles/headerStyles";
import {
  FaHome,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaSun,
  FaMoon,
  FaShoppingCart,
} from "react-icons/fa";
import logo from "@/assets/logo.png";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language, setLanguage, texts } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const totalItems = useSelector((state) =>
    state.cart.cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0)
  );

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

      {/* ✅ Dil & Tema Seçenekleri */}
      <ControlContainer>
        <LanguageSelect
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="tr">🇹🇷</option>
          <option value="en">🇬🇧</option>
          <option value="de">🇩🇪</option>
        </LanguageSelect>

        <ThemeToggleButton onClick={toggleTheme}>
          {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
        </ThemeToggleButton>
      </ControlContainer>

      {/* ✅ Ana Menü */}
      <Nav>
        <NavItem as={Link} to="/">
          <FaHome size={22} />
        </NavItem>
      </Nav>

      {/* ✅ Kullanıcı Girişi Kontrolü */}
      {isAuthenticated ? (
        <>
          <NavItem as={Link} to="/cart">
            <FaShoppingCart size={18} /> ({totalItems})
          </NavItem>

          <ProfileSection onClick={handleProfileClick}>
            {user.profileImage ? (
              <ProfileImage src={user.profileImage} alt={user.name} />
            ) : (
              <FaUserCircle size={24} />
            )}
            <span>{user.name || "Kullanıcı"}</span>

            {dropdownOpen && (
              <ProfileDropdown>
                <Link to="/profile">
                  <FaUserCircle /> {texts?.profile?.title || "Profilim"}
                </Link>
                {user.role === "admin" && (
                  <Link to="/settings">
                  <FaCog /> {texts?.settings?.title || "Ayarlar"}
                </Link>
                  )}
                
                {user.role === "admin" && (
                  <Link to="/dashboard">
                    🛠 {texts?.admin?.dashboard || "Yönetim Paneli"}
                  </Link>
                )}
                <button onClick={handleLogout}>
                  <FaSignOutAlt /> {texts?.logout || "Çıkış Yap"}
                </button>
              </ProfileDropdown>
            )}
          </ProfileSection>
        </>
      ) : (
        <NavItem as={Link} to="/login">
          {texts?.nav?.login || "Giriş Yap"}
        </NavItem>
      )}
    </HeaderContainer>
  );
}
