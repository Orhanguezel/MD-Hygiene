import styled from "styled-components";

export const Navbar = styled.nav`
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const NavList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NavItem = styled.li`
  margin: 0 15px;
`;