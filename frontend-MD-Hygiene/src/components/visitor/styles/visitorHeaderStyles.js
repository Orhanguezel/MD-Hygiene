import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.background || "#1f2937"};
  color: ${({ theme }) => theme.text || "#fff"};
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const Logo = styled.img`
  height: 40px;
`;

export const Name = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.text || "#fff"};
  margin-left: 10px;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    background-color: ${({ theme }) => theme.background || "#1f2937"};
    position: absolute;
    top: 60px;
    right: 20px;
    padding: 10px;
    border-radius: 8px;
  }
`;

export const NavItem = styled.div`
  color: ${({ theme }) => theme.text || "#fff"};
  text-decoration: none;
  cursor: pointer;
  padding: 8px 12px;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.hover || "#374151"};
    border-radius: 4px;
  }
`;

export const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text || "#fff"};

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    gap: 10px;
    background-color: ${({ theme }) => theme.background || "#1f2937"};
    padding: 10px;
    border-radius: 8px;
    position: absolute;
    top: 60px;
    right: 20px;
  }
`;

export const LanguageButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text || "#fff"};
  font-size: 18px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text || "#fff"};
  font-size: 18px;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.primary || "#00bcd4"};
  }
`;
