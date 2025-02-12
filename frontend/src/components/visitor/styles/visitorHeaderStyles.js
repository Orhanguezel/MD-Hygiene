import styled from "styled-components";
import {Link} from "react-router-dom";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background-color: ${({ theme }) => (theme === "light" ? "#fff" : "#1f2937")};
  color: ${({ theme }) => (theme === "light" ? "#000" : "#fff")};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
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
  color: ${({ theme }) => (theme === "light" ? "#000" : "#fff")};
  text-decoration: none;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 5px;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    background-color: ${({ theme }) => (theme === "light" ? "#fff" : "#1f2937")};
    padding: 10px 0;
    transition: all 0.9s ease;
  }
`;

export const NavItem = styled.div`
  padding: 10px;
  cursor: pointer;
  color: ${({ theme }) => (theme === "light" ? "#000" : "#fff")};
  text-decoration: none;

  &:hover {
    color: #007bff;
  }
`;

export const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => (theme === "light" ? "#000" : "#fff")};

  @media (max-width: 768px) {
    display: block;
  }
`;

export const LanguageButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 15px;
  margin: 0;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => (theme === "light" ? "#000" : "#fff")};
  font-size: 18px;
`;

export const ControlContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const MobileMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: ${({ theme }) => (theme === "light" ? "#fff" : "#1f2937")};
    padding: 10px;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;
