import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #1f2937;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
`;

export const Logo = styled.img`
  height: 40px;
`;

export const Name = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #fff;

  &:hover {
    color: #00bcd4;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    flex-direction: column;
    background: #1f2937;
    position: absolute;
    top: 60px;
    right: 0;
    padding: 15px;
    border-radius: 5px;
  }
`;

export const NavItem = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 5px 10px;
  transition: 0.3s;

  &:hover {
    background: #007bff;
    border-radius: 5px;
  }
`;

export const Button = styled.button`
  background: none;
  border: none;
  color: #fff;
  padding: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: #007bff;
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  position: relative;
`;

export const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #007bff;
`;

export const ProfileDropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: #444;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  overflow: hidden;
  z-index: 100;

  a, button {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 15px;
    text-decoration: none;
    color: #fff;
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #555;
    }
  }
`;

export const ThemeToggleButton = styled(Button)`
  font-size: 18px;
`;

export const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: #fff;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const LanguageButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 15px;
  color: #fff;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
