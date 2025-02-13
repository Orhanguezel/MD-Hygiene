import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export const SidebarContainer = styled.div`
  width: ${({ $isOpen }) => ($isOpen ? "250px" : "60px")};
  background-color: ${({ theme }) => theme.navBackground};
  color: ${({ theme }) => theme.text};
  box-shadow: ${({ $isOpen, theme }) => ($isOpen ? `4px 0 10px ${theme.shadow}` : "none")};
  position: sticky;
  top: 0;
  left: 0;
  transition: width 0.4s ease-in-out, box-shadow 0.3s ease-in-out;
  display: flex;
  flex-direction: column; 
  
  z-index: 100;
  padding: 10px 0;
`;

// ✅ Sidebar Toggle Butonu (Hamburger Menü)
export const ToggleSidebarButton = styled.button`
  background: ${({ theme }) => theme.sidebarToggleHover};
  border: none;
  cursor: pointer;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease, color 0.3s ease;
  color: ${({ theme }) => theme.sidebarToggle};

  &:hover {
    background: ${({ theme }) => theme.sidebarToggleHoverBackground};
    color: ${({ theme }) => theme.sidebarToggleHover};
  }
`;

// ✅ Hamburger İkonu (React Icon'un Rengini Değiştirmek İçin)
export const HamburgerIcon = styled(FaBars)`
  font-size: 1.8rem;
  transition: color 0.3s ease;

  ${ToggleSidebarButton}:hover & {
    color: ${({ theme }) => theme.sidebarToggleHover}; 
  }
`;

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px;
`;

// ✅ Sidebar Linkleri (Hover & Active Durumları Güncellendi)
export const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${({ $isOpen }) => ($isOpen ? "12px" : "0")};
  justify-content: ${({ $isOpen }) => ($isOpen ? "flex-start" : "center")};
  padding: 12px;
  color: ${({ theme }) => theme.sidebarText};
  text-decoration: none;
  font-size: 16px;
  border-radius: 6px;
  transition: background 0.3s ease, padding 0.3s ease, color 0.3s ease; 
  position: relative;

  &:hover {
    background: ${({ theme }) => theme.sidebarHover};
    color: ${({ theme }) => theme.sidebarTextHover};
  }

  &.active {
    background: ${({ theme }) => theme.sidebarActive};
    color: ${({ theme }) => theme.sidebarActiveText};
  }

  span {
    display: ${({ $isOpen }) => ($isOpen ? "inline" : "none")};
    transition: opacity 0.3s ease-in-out;
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  left: 70px;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.tooltipBackground};
  color: ${({ theme }) => theme.tooltipText};
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.border};
  font-size: 12px;
  white-space: nowrap;
  display: none;

  ${NavItem}:hover & {
    display: block;
  }
`;
