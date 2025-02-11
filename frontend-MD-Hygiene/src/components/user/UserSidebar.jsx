import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "@/features/language/useLanguage";
import {
  SidebarContainer,
  NavContainer,
  NavItem,
  ToggleSidebarButton,
  Tooltip,
} from "@/styles/sidebarStyles";
import { FaHome, FaUser, FaBox, FaShoppingCart, FaBars, FaInfoCircle, FaPhone, FaConciergeBell } from "react-icons/fa";

export default function UserSidebar() {
  const { texts } = useLanguage();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <ToggleSidebarButton onClick={toggleSidebar}>
        <FaBars />
      </ToggleSidebarButton>
      <NavContainer>
        {[{
          to: "/home", icon: <FaHome />, label: texts?.sidebar?.home || "Ana Sayfa"
        }, {
          to: "/profile", icon: <FaUser />, label: texts?.sidebar?.profile || "Profil"
        }, {
          to: "/products", icon: <FaBox />, label: texts?.sidebar?.products || "Ürünler"
        }, {
          to: "/orders", icon: <FaShoppingCart />, label: texts?.sidebar?.orders || "Siparişler"
        }, {
          to: "/about", icon: <FaInfoCircle />, label: texts?.sidebar?.about || "Hakkımızda"
        }, {
          to: "/contact", icon: <FaPhone />, label: texts?.sidebar?.contact || "İletişim"
        }, {
          to: "/services", icon: <FaConciergeBell />, label: texts?.sidebar?.services || "Hizmetler"
        }].map((item, index) => (
          <NavItem key={index} as={NavLink} to={item.to} activeclassname="active" isOpen={isOpen}>
            {item.icon}
            {isOpen && <span>{item.label}</span>}
            {!isOpen && <Tooltip>{item.label}</Tooltip>}
          </NavItem>
        ))}
      </NavContainer>
    </SidebarContainer>
  );
}
