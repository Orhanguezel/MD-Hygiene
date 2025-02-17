import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import {
  SidebarContainer,
  NavContainer,
  NavItem,
  ToggleSidebarButton,
  Tooltip,
} from "./styles/sidebarStyles";
import {
  FaHome,
  FaUser,
  FaCog,
  FaChartBar,
  FaBox,
  FaFileInvoice,
  FaBriefcase,
  FaClipboardList,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function AdminSidebar() {
  const { texts } = useLanguage();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsOpen(false); // ✅ **Linke Tıklanınca Kapanacak!**
  };

  return (
    <SidebarContainer $isOpen={isOpen} theme={theme}>
      {/* ✅ Sidebar Aç/Kapat Butonu */}
      <ToggleSidebarButton onClick={toggleSidebar} theme={theme}>
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </ToggleSidebarButton>

      <NavContainer>
        {[
          { to: "/dashboard", icon: <FaHome />, label: texts?.sidebar?.dashboard || "Dashboard" },
          { to: "/users", icon: <FaUser />, label: texts?.sidebar?.users || "Kullanıcılar" },
          { to: "/products", icon: <FaBox />, label: texts?.sidebar?.products || "Ürünler" },
          { to: "/orders", icon: <FaClipboardList />, label: texts?.sidebar?.orders || "Siparişler" },
          { to: "/invoices", icon: <FaFileInvoice />, label: texts?.sidebar?.invoices || "Faturalar" },
          { to: "/reports", icon: <FaChartBar />, label: texts?.sidebar?.reports || "Raporlar" },
          { to: "/offers", icon: <FaBriefcase />, label: texts?.sidebar?.offers || "Teklifler" },
          { to: "/settings", icon: <FaCog />, label: texts?.sidebar?.settings || "Ayarlar" },
        ].map((item, index) => (
          <NavItem
            key={index}
            as={NavLink}
            to={item.to}
            onClick={closeSidebar} // ✅ **Linke Tıklanınca Sidebar Kapanacak**
            className={({ isActive }) => (isActive ? "active" : "")}
            $isOpen={isOpen}
            theme={theme}
          >
            {item.icon}
            {isOpen && <span>{item.label}</span>}
            {!isOpen && <Tooltip theme={theme}>{item.label}</Tooltip>}
          </NavItem>
        ))}
      </NavContainer>
    </SidebarContainer>
  );
}
