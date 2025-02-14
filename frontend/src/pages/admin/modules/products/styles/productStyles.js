import styled from "styled-components";

/* 📌 Ana Konteyner */
export const ProductContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  transition: background 0.3s ease, color 0.3s ease;
`;

/* 📌 Sidebar */
export const SidebarContainer = styled.div`
  width: 250px;
  background: ${({ theme }) => theme.sidebarBackground};
  padding: 20px;
  box-shadow: 0px 4px 8px ${({ theme }) => theme.shadow};
  border-right: 2px solid ${({ theme }) => theme.border};
  transition: background 0.3s ease, border 0.3s ease;
`;

export const SidebarButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  font-weight: bold;
  color: ${({ theme }) => theme.sidebarText}; 
  border: none;
  border-radius: 5px;
  background: ${({ theme }) => theme.primary};
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: scale(1.05);
  }
`;

/* 📌 Ürün Listesi */
export const ListContainer = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: auto;
`;

export const ProductItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid ${({ theme }) => theme.border};
  padding: 15px;
  border-radius: 8px;
  transition: border 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 4px 10px ${({ theme }) => theme.shadow};
  }
`;

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.border};
  transition: border 0.3s ease, transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
  padding-left: 15px;
`;

/* 📌 Silme Butonu */
export const DeleteButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: scale(1.05);
  }
`;

/* 📌 Ürün Formu */
export const FormContainer = styled.form`
  background: ${({ theme }) => theme.cardBackground};
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 8px ${({ theme }) => theme.shadow};
  transition: background 0.3s ease;
  max-width: 500px;
  margin: auto;
`;

/* 📌 Giriş Alanları */
export const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  transition: background 0.3s ease, border 0.3s ease;
`;

export const SubmitButton = styled.button`
  padding: 12px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: scale(1.05);
  }
`;

export const SelectInput = styled.select`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  font-size: 1rem;
`;

/* 📌 Kategori Seçimi Alanı */
export const CategoryContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 15px 0;
  flex-wrap: wrap;
`;

/* 📌 Kategori Butonları */
export const CategoryButton = styled.button`
  padding: 10px;
  font-size: 0.9rem;
  font-weight: bold;
  border: none;
  background-color: ${({ $isActive, theme }) => ($isActive ? theme.primary : theme.cardBackground)};
  color: ${({ $isActive, theme }) => ($isActive ? theme.buttonText : theme.text)};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${({ $isActive, theme }) => ($isActive ? theme.primaryHover : theme.sidebarHover)};
    transform: scale(1.05);
  }
`;

export const CategoryButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;
