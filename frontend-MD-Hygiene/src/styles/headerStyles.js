import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #1f2937;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Logo = styled.img`
  height: 40px;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;
`;



export const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;

  @media (max-width: 768px) {

  .nav-text {
    display: none;
  }
}
}`;

export const Button = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.secondary || "#ffcc00"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const ThemeToggleButton = styled(Button)`
  background-color: ${({ theme }) => theme.buttonBackground || "#4CAF50"};
  border-radius: 50%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover || "#388e3c"};
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Tooltip = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color:{({ theme }) => theme.tooltipBackground || "#333"};
  color: black;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

