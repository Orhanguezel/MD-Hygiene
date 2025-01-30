import { NavLink } from "react-router-dom";
import { Navbar, NavList, NavItem} from "../styles/LayoutSyles";


function Layout() {
  return (
    <Navbar>
      <NavList>
        <NavItem>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Contact
          </NavLink>
        
        </NavItem>
      </NavList>
    </Navbar>
  );
}

export default Layout;
