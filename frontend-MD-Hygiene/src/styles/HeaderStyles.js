import styled from "styled-components";
import { NavLink } from "react-router-dom";

// 📌 Header Konteyneri
export const HeaderContainer = styled.header`
  background-color: #1f2937;
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

// 📌 Logo Alanı
export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

export const LogoImage = styled.img`
  height: 50px;
  width: 50px;
  @media (max-width: 1024px) {
    height: 40px;
    width: 40px;
  }
`;

export const LogoText = styled.span`
  font-weight: bold;
  color: white;
  font-size: 1.3rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

// 📌 Kullanıcı Profil Resmi (Eksik olan `UserImage` eklendi)
export const UserImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

// 📌 Profil Butonu
export const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #374151;
  cursor: pointer;
  border: none;
`;

// 📌 Kullanıcı Dropdown Menüsü
export const UserDropdown = styled.div`
  position: absolute;
  right: 10px;
  top: 80px;
  width: 200px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
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
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.2s ease;

  &:hover {
    color: #60a5fa;
  }
`;



