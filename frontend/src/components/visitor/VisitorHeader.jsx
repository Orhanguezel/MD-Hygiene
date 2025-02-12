import { useState } from "react";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { Link } from "react-router-dom";
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
} from "./styles/visitorHeaderStyles";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import logo from "@/assets/logo.png";

export default function VisitorHeader() {
  const { language, setLanguage, texts } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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

      <Nav isOpen={menuOpen}>
        <NavItem as={Link} to="/">
          {texts?.nav?.home || "Ana Sayfa"}
        </NavItem>
        <NavItem as={Link} to="/categories">
          {texts?.nav?.categories || "Kategoriler"}
        </NavItem>
    
        <NavItem as={Link} to="/products">
          {texts?.nav?.products || "Ürünler"}
        </NavItem>
        <NavItem as={Link} to="/contact">
          {texts?.nav?.contact || "İletişim"}
        </NavItem>
        <NavItem as={Link} to="/login">
          {texts?.nav?.login || "Giriş Yap"}
        </NavItem>
      </Nav>
    </HeaderContainer>
  );
}
