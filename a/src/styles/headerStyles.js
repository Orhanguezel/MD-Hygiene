import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme.header};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;

export const Logo = styled.img`
  height: 50px;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const NavItem = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;

  &:hover {
    color: #60a5fa;
  }
`;

export const Button = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    color: #60a5fa;
  }
`;
