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
  position: fixed;
  top: 0;
  width: 100%;
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
  gap: 10px;
`;

export const NavItem = styled(Link)`
  padding: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-weight: bold;
  border-radius: 6px;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
    color: ${({ theme }) => theme.buttonText};
  }
`;

export const ControlContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const LanguageSelect = styled.select`
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
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

export const ProfileSection = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const ProfileImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;

export const ProfileDropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.shadow};
  z-index: 1000;
  padding: 10px;
  min-width: 230px;
  display: flex;
  flex-direction: column;

  a, button {
    padding: 8px 12px;
    border: none;
    background: none;
    color: ${({ theme }) => theme.text};
    text-align: left;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;
