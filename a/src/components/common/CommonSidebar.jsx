import React from "react";
import { FaHome, FaCog, FaBox, FaShoppingCart } from "react-icons/fa";
import { SidebarContainer, NavContainer, NavItem } from "../../styles/sidebarStyles";

const CommonSidebar = () => {
  return (
    <SidebarContainer>
      <NavContainer>
        <NavItem to="/">
          <FaHome /> Anasayfa
        </NavItem>
        <NavItem to="/products">
          <FaBox /> Ürünler
        </NavItem>
        <NavItem to="/orders">
          <FaShoppingCart /> Siparişler
        </NavItem>
        <NavItem to="/settings">
          <FaCog /> Ayarlar
        </NavItem>
      </NavContainer>
    </SidebarContainer>
  );
};

export default CommonSidebar;
