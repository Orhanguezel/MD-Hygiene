import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart, FaBox, FaCog } from "react-icons/fa";
import { SidebarContainer, NavContainer, NavItem } from "../styles/sidebarStyles";

export default function UserSidebar() {
  return (
    <SidebarContainer>
      <NavContainer>
        <NavItem to="/">
          <FaHome /> Anasayfa
        </NavItem>
        <NavItem to="/products">
          <FaBox /> Ürünler
        </NavItem>
        <NavItem to="/cart">
          <FaShoppingCart /> Sepetim
        </NavItem>
        <NavItem to="/settings">
          <FaCog /> Ayarlar
        </NavItem>
      </NavContainer>
    </SidebarContainer>
  );
}
