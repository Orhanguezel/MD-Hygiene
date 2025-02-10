import { useLanguage } from "@/features/language/useLanguage";  // ✅ Redux Toolkit hook
import { useTheme } from "@/features/theme/useTheme";           // ✅ Redux Toolkit hook
import { useAuth } from "@/features/auth/useAuth";              // ✅ Redux Toolkit hook
import { Link } from "react-router-dom";
import { HeaderContainer, Logo, Nav, NavItem, Button, ProfileSection, NotificationIcon } from "@/styles/headerStyles";
import { FaBell, FaUserCircle } from "react-icons/fa";
import logo from "@/assets/logo.png";

export default function CommonHeader() {
  const { language, setLanguage, texts } = useLanguage();      // ✅ useLanguage Hook
  const { theme, toggleTheme } = useTheme();                   // ✅ useTheme Hook
  const { user, signout } = useAuth();                         // ✅ useAuth Hook

  return (
    <HeaderContainer>
      <Link to="/">
        <Logo src={logo} alt="MD-Hygienelogistik" />
      </Link>

      <Nav>
        <NavItem to="/notifications">
          <NotificationIcon>
            <FaBell />
          </NotificationIcon>
        </NavItem>

        <NavItem to="/settings">⚙️ {texts?.sidebar?.settings || "Ayarlar"}</NavItem>

        <Button onClick={toggleTheme}>
          🌓 {theme === "light" ? texts?.settings?.darkMode || "Karanlık Mod" : texts?.settings?.lightMode || "Aydınlık Mod"}
        </Button>

        <Button onClick={() => setLanguage("tr")} disabled={language === "tr"}>🇹🇷</Button>
        <Button onClick={() => setLanguage("de")} disabled={language === "de"}>🇩🇪</Button>
        <Button onClick={() => setLanguage("en")} disabled={language === "en"}>🇬🇧</Button>

        <ProfileSection>
          <FaUserCircle size={24} />
          <span>{user?.name || "Kullanıcı"}</span> {/* ✅ Kullanıcı adını dinamik gösterir */}
        </ProfileSection>

        <Button onClick={signout}>🚪 {texts?.sidebar?.logout || "Çıkış Yap"}</Button>
      </Nav>
    </HeaderContainer>
  );
}
