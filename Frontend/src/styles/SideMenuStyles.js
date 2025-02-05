import styled from "styled-components";
import { NavLink } from "react-router-dom";

// 📌 Sidebar Konteyneri
export const SidebarContainer = styled.div`
  width: ${(props) => (props.$isOpen ? "250px" : "80px")};
  background-color: #1f2937;
  transition: width 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 20px;
`;

// 📌 Menü Aç/Kapa Butonu
export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 22px;
  cursor: pointer;
  align-self: ${(props) => (props.$isOpen ? "flex-end" : "center")};
  margin-top: 80px;
`;

// 📌 Navigasyon Menüsü
export const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.3s ease-in-out;

  &.active {
    background-color: #2563eb;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }

  svg {
    font-size: 20px;
  }
`;

// 📌 Dropdown Menü Stilleri
export const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const DropdownButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  svg {
    font-size: 18px;
  }
`;

export const DropdownMenu = styled.div`
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  padding-left: 20px;
`;

export const DropdownItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  color: white;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease-in-out;

  &.active {
    background-color: #2563eb;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }

  svg {
    font-size: 16px;
  }
`;
