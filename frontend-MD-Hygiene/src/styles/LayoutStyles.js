import styled from "styled-components";

export const Navbar = styled.nav`
  background-color: #333;
  padding: 1rem;
  color: white;
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
`;

export const NavItem = styled.li`
  & a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }

  & a.active-link {
    color: yellow;
  }
`;
