import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.navBackground}; 
  color: ${({ theme }) => theme.text};  
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: background-color 0.3s ease;
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;   
  gap: 8px;              
  text-decoration: none; 
`;

export const Logo = styled.img`
  height: 40px;
  margin-right: 10px;
`;

export const Name = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled(Link)`
  padding: 10px;
  color: ${({ theme }) => theme.text};  
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.primary};  
  }
`;

export const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text}; 

  @media (max-width: 768px) {
    display: block;
  }
`;

export const LanguageButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 15px;
  color: ${({ theme }) => theme.text};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text}; 
  font-size: 18px;
  transition: color 0.3s ease-in-out;
`;

export const ControlContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// ✅ Mobil Menü
export const MobileMenu = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.navBackground};  
  box-shadow: 0 4px 8px ${({ theme }) => theme.shadow};
  padding: 10px;
  transition: all 0.3s ease-in-out;

  @media (min-width: 769px) {
    display: none;
  }
`;
