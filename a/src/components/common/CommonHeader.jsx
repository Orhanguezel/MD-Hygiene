import { useContext } from "react";
import { Link } from "react-router-dom";
import LanguageContext from "../../context/LanguageContext";
import ThemeContext from "../../context/ThemeContext";
import { HeaderContainer, Logo, Nav, NavItem, Button } from "../../styles/headerStyles";
import logo from "../../assets/logo.png";

export default function CommonHeader() {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <HeaderContainer>
      <Link to="/">
        <Logo src={logo} alt="MD-Hygienelogistik" />
      </Link>

      <Nav>
        <NavItem to="/settings">⚙️ Ayarlar</NavItem>
        <Button onClick={toggleTheme}>🌓 {theme === "light" ? "Karanlık Mod" : "Aydınlık Mod"}</Button>
        <Button onClick={() => toggleLanguage("tr")}>🇹🇷 Türkçe</Button>
      </Nav>
    </HeaderContainer>
  );
}
