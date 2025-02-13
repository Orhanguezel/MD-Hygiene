import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { SidebarContainer, NavContainer, NavItem, ToggleSidebarButton, Tooltip, HamburgerIcon } from "./styles/adminSidebarStyles";
import { FaHome, FaUser, FaCog, FaChartBar, FaStore, FaBox, FaShoppingCart, FaTruck, FaFileInvoice, FaBell, FaBriefcase, FaClipboardList } from "react-icons/fa";

export default function AdminSidebar() {
  const { texts } = useLanguage();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContainer $isOpen={isOpen} theme={theme}>
      <ToggleSidebarButton onClick={toggleSidebar} theme={theme}>
        <HamburgerIcon theme={theme} /> 
      </ToggleSidebarButton>
      <NavContainer>
        {[{
          to: "/dashboard", icon: <FaHome />, label: texts?.sidebar?.dashboard || "Dashboard"
        }, {
          to: "/users", icon: <FaUser />, label: texts?.sidebar?.users || "Kullanıcılar"
        }, {
          to: "/stores", icon: <FaStore />, label: texts?.sidebar?.stores || "Mağazalar"
        }, {
          to: "/products", icon: <FaBox />, label: texts?.sidebar?.products || "Ürünler"
        }, {
          to: "/sales", icon: <FaShoppingCart />, label: texts?.sidebar?.sales || "Satışlar"
        }, {
          to: "/shipments", icon: <FaTruck />, label: texts?.sidebar?.shipments || "Sevkiyatlar"
        }, {
          to: "/orders", icon: <FaClipboardList />, label: texts?.sidebar?.orders || "Siparişler"
        }, {
          to: "/invoices", icon: <FaFileInvoice />, label: texts?.sidebar?.invoices || "Faturalar"
        }, {
          to: "/notifications", icon: <FaBell />, label: texts?.sidebar?.notifications || "Bildirimler"
        }, {
          to: "/reports", icon: <FaChartBar />, label: texts?.sidebar?.reports || "Raporlar"
        }, {
          to: "/offers", icon: <FaBriefcase />, label: texts?.sidebar?.offers || "Teklifler"
        }, {
          to: "/audit-logs", icon: <FaClipboardList />, label: texts?.sidebar?.auditLogs || "Denetim Kayıtları"
        }, {
          to: "/settings", icon: <FaCog />, label: texts?.sidebar?.settings || "Ayarlar"
        }].map((item, index) => (
          <NavItem key={index} as={NavLink} to={item.to} activeclassname="active" $isOpen={isOpen} theme={theme}>
            {item.icon}
            {isOpen && <span>{item.label}</span>}
            {!isOpen && <Tooltip theme={theme}>{item.label}</Tooltip>}
          </NavItem>
        ))}
      </NavContainer>
    </SidebarContainer>
  );
}
