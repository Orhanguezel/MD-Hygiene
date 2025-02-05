import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  SidebarContainer,
  NavContainer,
  NavItem,
  DropdownContainer,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  ToggleButton,
} from "../styles/SideMenuStyles";
import {
  FaUsers, FaShoppingCart, FaBox, FaEuroSign, FaTruck, FaFileAlt, FaClipboardList, FaChartPie, FaChevronRight, FaChevronDown
} from "react-icons/fa";

function SideMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState({
    reports: false,
    analysis: false
  });

  const location = useLocation();

  return (
    <SidebarContainer $isOpen={isOpen}>
      {/* ✅ Menü Aç/Kapa Butonu */}
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖️" : "☰"}
      </ToggleButton>

      <NavContainer>
        <NavItem to="/admin/dashboard" $isOpen={isOpen}>
          <FaChartPie />
          {isOpen && <span>Admin-Dashboard</span>}
        </NavItem>

        <NavItem to="/admin/inventory" $isOpen={isOpen}>
          <FaBox />
          {isOpen && <span>Inventar</span>}
        </NavItem>

        <NavItem to="/admin/orders" $isOpen={isOpen}>
          <FaShoppingCart />
          {isOpen && <span>Bestellungen</span>}
        </NavItem>

        <NavItem to="/admin/products" $isOpen={isOpen}>
          <FaTruck />
          {isOpen && <span>Produkte</span>}
        </NavItem>

        <NavItem to="/admin/users" $isOpen={isOpen}>
          <FaUsers />
          {isOpen && <span>Benutzer</span>}
        </NavItem>

        <NavItem to="/admin/sales" $isOpen={isOpen}>
          <FaEuroSign />
          {isOpen && <span>Verkäufe</span>}
        </NavItem>

        {/* ✅ Analizler Dropdown */}
        <DropdownContainer>
          <DropdownButton onClick={() => setDropdownOpen({ ...dropdownOpen, analysis: !dropdownOpen.analysis })} $isOpen={isOpen}>
            <FaClipboardList />
            {isOpen && <span>Analysen</span>}
            {dropdownOpen.analysis ? <FaChevronDown /> : <FaChevronRight />}
          </DropdownButton>
          <DropdownMenu $isOpen={dropdownOpen.analysis}>
            <DropdownItem to="/admin/analysis">
              <FaChartPie />
              {isOpen && <span>Umsatzanalyse</span>}
            </DropdownItem>
            <DropdownItem to="/admin/users">
              <FaUsers />
              {isOpen && <span>Kundenanalyse</span>}
            </DropdownItem>
          </DropdownMenu>
        </DropdownContainer>

        {/* ✅ Raporlar Dropdown */}
        <DropdownContainer>
          <DropdownButton onClick={() => setDropdownOpen({ ...dropdownOpen, reports: !dropdownOpen.reports })} $isOpen={isOpen}>
            <FaFileAlt />
            {isOpen && <span>Berichte</span>}
            {dropdownOpen.reports ? <FaChevronDown /> : <FaChevronRight />}
          </DropdownButton>
          <DropdownMenu $isOpen={dropdownOpen.reports}>
            <DropdownItem to="/admin/reports">
              <FaFileAlt />
              {isOpen && <span>Finanzberichte</span>}
            </DropdownItem>
            <DropdownItem to="/admin/invoices">
              <FaFileAlt />
              {isOpen && <span>Rechnungen</span>}
            </DropdownItem>
            <DropdownItem to="/admin/shipments">
              <FaTruck />
              {isOpen && <span>Lieferberichte</span>}
            </DropdownItem>
          </DropdownMenu>
        </DropdownContainer>
      </NavContainer>
    </SidebarContainer>
  );
}

export default SideMenu;
