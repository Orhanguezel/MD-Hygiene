import { useContext } from "react";
import { Link } from "react-router-dom";
import LanguageContext from "../../context/LanguageContext";
import ThemeContext from "../../context/ThemeContext"; // ✅ Artık hata vermez
import { useAuth } from "../../context/AuthContext";
import { HeaderContainer, Logo, Nav, NavItem, Button, ProfileSection, NotificationIcon } from "../../styles/headerStyles";
import { FaBell, FaUserCircle } from "react-icons/fa";
import logo from "../../assets/logo.png";

export default function CommonHeader() {
  const { language, setLanguage, texts } = useContext(LanguageContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { signout } = useAuth();

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

        <NavItem to="/settings">⚙️ {texts.sidebar.settings}</NavItem>

        <Button onClick={toggleTheme}>
          🌓 {theme === "light" ? texts.settings.darkMode : texts.settings.lightMode}
        </Button>

        <Button onClick={() => setLanguage("tr")} disabled={language === "tr"}>🇹🇷</Button>
        <Button onClick={() => setLanguage("de")} disabled={language === "de"}>🇩🇪</Button>
        <Button onClick={() => setLanguage("en")} disabled={language === "en"}>🇬🇧</Button>

        <ProfileSection>
          <FaUserCircle size={24} />
          <span>Orhan Admin</span>
        </ProfileSection>
        <Button onClick={signout}>🚪 Çıkış Yap</Button>
      </Nav>
    </HeaderContainer>
  );
}
