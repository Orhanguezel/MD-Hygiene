import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const SidebarContainer = styled.div`
  width: 250px;
  background-color: ${(props) => props.theme.sidebar || "#1f2937"};
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 20px;
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
  border-radius: 6px;

  &.active {
    background-color: #2563eb;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(1.05);
  }

  svg {
    font-size: 20px;
  }
`;
