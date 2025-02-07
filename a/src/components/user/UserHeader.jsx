import { Link } from "react-router-dom";
import { HeaderContainer, Logo, Nav, NavItem, Button } from "../styles/headerStyles";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import logo from "../assets/logo.png";

export default function UserHeader() {
  const { toggleLanguage } = useContext(LanguageContext);
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <HeaderContainer>
      <Link to="/">
        <Logo src={logo} alt="Kullanıcı Paneli" />
      </Link>

      <Nav>
        <NavItem to="/settings">⚙️ Ayarlar</NavItem>
        <Button onClick={toggleTheme}>🌓 Tema</Button>
        <Button onClick={() => toggleLanguage("tr")}>🇹🇷 TR</Button>
      </Nav>
    </HeaderContainer>
  );
}
