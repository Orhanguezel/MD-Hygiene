import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Logo = styled.img`
  height: 40px;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export const Button = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 5px 10px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  padding: 5px 10px;
  border-radius: 4px;
`;

export const NotificationIcon = styled.div`
  position: relative;
  cursor: pointer;

  svg {
    font-size: 1.2rem;
  }

  &:hover {
    color: yellow;
  }
`;

