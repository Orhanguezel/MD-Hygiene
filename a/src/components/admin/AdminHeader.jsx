import { useContext } from "react";
import { Link } from "react-router-dom";
import { HeaderContainer, Logo, Nav, NavItem, Button } from "../styles/headerStyles";
import AuthContext from "../context/AuthContext";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import logo from "../assets/logo.png";

export default function AdminHeader() {
  const { signout } = useContext(AuthContext);
  const { toggleLanguage } = useContext(LanguageContext);
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <HeaderContainer>
      <Link to="/admin/dashboard">
        <Logo src={logo} alt="Admin Panel" />
      </Link>

      <Nav>
        <NavItem to="/admin/settings">⚙️ Yönetim Ayarları</NavItem>
        <Button onClick={toggleTheme}>🌓 Tema</Button>
        <Button onClick={() => toggleLanguage("tr")}>🇹🇷 TR</Button>
        <Button onClick={signout}>🚪 Çıkış Yap</Button>
      </Nav>
    </HeaderContainer>
  );
}
