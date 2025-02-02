import { NavLink } from "react-router-dom";
import { Navbar, NavList, NavItem } from "../styles/LayoutStyles";

function Layout() {
  return (
    <Navbar>
      <NavList>
        <NavItem>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Startseite
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/produkte" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Produkte
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Kontakt
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/login" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Login / Registrierung
          </NavLink>
        </NavItem>
      </NavList>
    </Navbar>
  );
}

export default Layout;

