import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: ${({ isOpen }) => (isOpen ? "250px" : "60px")};
  background-color: #1f2937;
  color: white;
  height: calc(100vh - 60px); /* Header'dan aşağı başlar */
  position: fixed;
  top: 60px; /* Header yüksekliği kadar */
  left: 0;
  transition: width 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  z-index: 1000;

  @media (max-width: 768px) {
    width: ${({ isOpen }) => (isOpen ? "250px" : "60px")};
    position: fixed;
    height: calc(100vh - 60px);
    transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(-50px)")};
    transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
  }
`;

export const ToggleSidebarButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 10px;
`;

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  padding: 0 10px;
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ isOpen }) => (isOpen ? "12px" : "0")};
  justify-content: ${({ isOpen }) => (isOpen ? "flex-start" : "center")};
  padding: 12px;
  color: white;
  text-decoration: none;
  font-size: 16px;
  border-radius: 6px;
  transition: background 0.3s ease, padding 0.3s ease;
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background: #2563eb;
  }

  span {
    display: ${({ isOpen }) => (isOpen ? "inline" : "none")};
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  left: 70px;
  top: 50%;
  transform: translateY(-50%);
  background: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  display: none;

  ${NavItem}:hover & {
    display: ${({ isOpen }) => (isOpen ? "none" : "block")};
  }
`;

export const MainContent = styled.div`
  transition: margin-left 0.3s ease-in-out;
  margin-left: ${({ isOpen }) => (isOpen ? "250px" : "60px")};
  padding: 20px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;
