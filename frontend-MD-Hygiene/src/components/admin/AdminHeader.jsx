import { useUI } from "@/features/ui/useUI";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { useAuth } from "@/features/auth/useAuth";
import { Link } from "react-router-dom";
import {
  HeaderContainer,
  Logo,
  Nav,
  NavItem,
  Button,
  ProfileSection,
  Tooltip,
  ThemeToggleButton,
} from "@/styles/headerStyles";
import { FaBell, FaUserCircle, FaCog, FaSun, FaMoon } from "react-icons/fa";
import logo from "@/assets/logo.png";

export default function AdminHeader() {
  const { language, setLanguage, texts } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, signout } = useAuth();
  const { toggleSidebar } = useUI();

  return (
    <HeaderContainer>
      <Link to="/">
        <Logo src={logo} alt="MD-Hygienelogistik" />
      </Link>

      <Nav>

        <ThemeToggleButton onClick={toggleTheme}>
          {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
        </ThemeToggleButton>

        <Button onClick={() => setLanguage("tr")} disabled={language === "tr"}>
          🇹🇷
        </Button>
        <Button onClick={() => setLanguage("de")} disabled={language === "de"}>
          🇩🇪
        </Button>
        <Button onClick={() => setLanguage("en")} disabled={language === "en"}>
          🇬🇧
        </Button>

        <NavItem>
          <Button>
            <FaUserCircle size={18} />
            <span className="nav-text">{user?.name || "Kullanıcı"}</span>
          </Button>
        </NavItem>

        <NavItem>
          <Button onClick={signout}>
            🚪
            <span className="nav-text">
              {texts?.sidebar?.logout || "Çıkış Yap"}
            </span>
          </Button>
        </NavItem>
      </Nav>
    </HeaderContainer>
  );
}
