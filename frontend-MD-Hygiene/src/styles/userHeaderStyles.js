import styled from "styled-components";

// ✅ Header Konteyneri
export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #1f2937;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// ✅ Logo
export const Logo = styled.img`
  height: 40px;
`;

// ✅ Firma Adı (Span) Stili
export const Name = styled.span`
  text-decoration: none !important; 
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => (theme === "light" ? "#333" : "#fff")};

  &:hover {
    color: #00bcd4; 
  }
`;

// ✅ Navigation Menüsü
export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 15px;
`;

// ✅ Navigation Item
export const NavItem = styled.div`
  position: relative;
`;

// ✅ Butonlar
export const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: ${({ theme }) => (theme === "light" ? "#333" : "#fff")};
  transition: 0.3s;

  &:hover {
    color: #007bff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// ✅ Profil Alanı
export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  position: relative;

  span {
    font-weight: bold;
    color: ${({ theme }) => (theme === "light" ? "#333" : "#fff")};
  }
`;

// ✅ Profil Resmi
export const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #007bff;
`;

// ✅ Dropdown Menü
export const ProfileDropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: ${({ theme }) => (theme === "light" ? "#fff" : "#444")};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  overflow: hidden;
  z-index: 100;

  a,
  button {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 15px;
    text-decoration: none;
    color: ${({ theme }) => (theme === "light" ? "#333" : "#fff")};
    cursor: pointer;
    background: none;
    border: none;
    width: 100%;
    text-align: left;

    &:hover {
      background-color: ${({ theme }) => (theme === "light" ? "#f0f0f0" : "#555")};
    }
  }
`;

// ✅ Tema Değiştirme Butonu
export const ThemeToggleButton = styled(Button)`
  font-size: 18px;
`;
