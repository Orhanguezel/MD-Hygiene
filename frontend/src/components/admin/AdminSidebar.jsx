// ✅ src/components/admin/AdminSidebar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "@/features/language/useLanguage";
import { SidebarContainer, NavContainer, NavItem, ToggleSidebarButton, Tooltip } from "./styles/adminSidebarStyles";
import { FaHome, FaUser, FaCog, FaChartBar, FaStore, FaBox, FaShoppingCart, FaTruck, FaFileInvoice, FaBell, FaBriefcase, FaClipboardList, FaBars } from "react-icons/fa";

export default function AdminSidebar() {
  const { texts } = useLanguage();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <ToggleSidebarButton onClick={toggleSidebar}><FaBars /></ToggleSidebarButton>
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