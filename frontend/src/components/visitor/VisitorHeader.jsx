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
  MobileMenu
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
      {/* 🏠 Logo */}
      <LogoLink to="/">
        <Logo src={logo} alt="MD-Hygienelogistik" />
        <Name>MD-HL</Name>
      </LogoLink>

      {/* 🌍 Dil Seçenekleri */}
      <div>
        {["tr", "en", "de"].map((lang) => (
          <LanguageButton key={lang} onClick={() => setLanguage(lang)} disabled={language === lang}>
            {lang === "tr" ? "🇹🇷" : lang === "en" ? "🇬🇧" : "🇩🇪"}
          </LanguageButton>
        ))}
      </div>

      {/* ☀️🌙 Tema Değiştirme */}
      <ThemeToggleButton onClick={toggleTheme}>
        {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
      </ThemeToggleButton>

      {/* 🍔 Mobil Menü Aç/Kapat */}
      <HamburgerButton onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </HamburgerButton>

      {/* 📌 Ana Menü (Masaüstü) */}
      <Nav>
        <NavItem to="/">{texts?.nav?.home || "Ana Sayfa"}</NavItem>
        <NavItem to="/categories">{texts?.nav?.categories || "Kategoriler"}</NavItem>
        <NavItem to="/products">{texts?.nav?.products || "Ürünler"}</NavItem>
        <NavItem to="/contact">{texts?.nav?.contact || "İletişim"}</NavItem>
        <NavItem to="/login">{texts?.nav?.login || "Giriş Yap"}</NavItem>
      </Nav>

      {/* 📱 Mobil Menü */}
      <MobileMenu $isOpen={menuOpen}>
        <NavItem to="/" onClick={() => setMenuOpen(false)}>{texts?.nav?.home || "Ana Sayfa"}</NavItem>
        <NavItem to="/categories" onClick={() => setMenuOpen(false)}>{texts?.nav?.categories || "Kategoriler"}</NavItem>
        <NavItem to="/products" onClick={() => setMenuOpen(false)}>{texts?.nav?.products || "Ürünler"}</NavItem>
        <NavItem to="/contact" onClick={() => setMenuOpen(false)}>{texts?.nav?.contact || "İletişim"}</NavItem>
        <NavItem to="/login" onClick={() => setMenuOpen(false)}>{texts?.nav?.login || "Giriş Yap"}</NavItem>
      </MobileMenu>
    </HeaderContainer>
  );
}

