import { NavLink } from "react-router-dom";
import { FaChartPie, FaBox, FaUsers, FaFileAlt, FaClipboardList, FaHandshake } from "react-icons/fa"; // ✅ Yeni ikon eklendi
import {
  SidebarContainer,
  NavContainer,
  NavItem,
} from "../../styles/SideMenuStyles";

const AdminSideMenu = () => {
  return (
    <SidebarContainer>
      <NavContainer>
        <NavItem to="/admin/dashboard">
          <FaChartPie /> Dashboard
        </NavItem>
        <NavItem to="/admin/products">
          <FaBox /> Ürün Yönetimi
        </NavItem>
        <NavItem to="/admin/users">
          <FaUsers /> Kullanıcı Yönetimi
        </NavItem>
        <NavItem to="/admin/reports">
          <FaClipboardList /> Raporlar
        </NavItem>
        <NavItem to="/admin/offers"> {/* ✅ Teklif Yönetimi menüye eklendi */}
          <FaHandshake /> Teklif Yönetimi
        </NavItem>
      </NavContainer>
    </SidebarContainer>
  );
};

export default AdminSideMenu;
