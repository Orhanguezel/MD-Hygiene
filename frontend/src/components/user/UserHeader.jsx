import { useState } from "react";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSun, FaMoon, FaUserCircle, FaSignOutAlt, FaShoppingCart } from "react-icons/fa";
import { logout } from "@/features/auth/authSlice";
import logo from "@/assets/logo.png";
import {
  HeaderContainer,
  LogoLink,
  Logo,
  Name,
  Nav,
  NavItem,
  HamburgerButton,
  LanguageButton,
  ThemeToggleButton,
  ProfileSection,
  ProfileImage,
  ProfileDropdown,
  Button,
} from "./styles/userHeaderStyles";

export default function UserHeader() {
  const { language, setLanguage, texts } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const totalItems = useSelector((state) =>
    state.cart.cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0)
  );
  

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleProfileClick = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <HeaderContainer>
      <LogoLink to="/">
        <Logo src={logo} alt="MD-Hygienelogistik" />
        <Name>MD-HL</Name>
      </LogoLink>

      <LanguageButton onClick={() => setLanguage("tr")} disabled={language === "tr"}>
        🇹🇷
      </LanguageButton>
      <LanguageButton onClick={() => setLanguage("en")} disabled={language === "en"}>
        🇬🇧
      </LanguageButton>
      <LanguageButton onClick={() => setLanguage("de")} disabled={language === "de"}>
        🇩🇪
      </LanguageButton>

      <ThemeToggleButton onClick={toggleTheme}>
        {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
      </ThemeToggleButton>

      <HamburgerButton onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </HamburgerButton>

      <Nav $isOpen={menuOpen}>
        <NavItem as={Link} to="/">
          {texts?.nav?.home || "Ana Sayfa"}
        </NavItem>
        <NavItem as={Link} to="/products">
          {texts?.nav?.products || "Ürünler"}
        </NavItem>
        <NavItem as={Link} to="/cart">
          <FaShoppingCart size={18} /> {texts?.nav?.cart || "Sepetim"} ({totalItems})
        </NavItem>
        <NavItem as={Link} to="/contact">
          {texts?.nav?.contact || "İletişim"}
        </NavItem>

        {user ? (
          <ProfileSection onClick={handleProfileClick}>
            {user.profileImage ? (
              <ProfileImage src={user.profileImage} alt={user.name} />
            ) : (
              <FaUserCircle size={24} />
            )}
            <span>{user.name || "Kullanıcı"}</span>

            {dropdownOpen && (
              <ProfileDropdown>
                <Link to="/profile">{texts?.profile?.title || "Profilim"}</Link>
                <Button onClick={handleLogout}>
                  <FaSignOutAlt /> {texts?.logout || "Çıkış Yap"}
                </Button>
              </ProfileDropdown>
            )}
          </ProfileSection>
        ) : (
          <NavItem as={Link} to="/login">
            {texts?.nav?.login || "Giriş Yap"}
          </NavItem>
        )}
      </Nav>
    </HeaderContainer>
  );
}
