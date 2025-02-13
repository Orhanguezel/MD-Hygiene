import styled from "styled-components";

/* 📌 Ana Konteyner */
export const ProductContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => (theme === "dark" ? "#1e1e1e" : "#fff")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  min-height: 100vh;
  transition: background 0.3s ease, color 0.3s ease;
`;

/* 📌 Ürün Formu */
export const FormContainer = styled.form`
  background: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  padding: 25px;
  border-radius: 10px;
  box-shadow: ${({ theme }) => (theme === "dark" ? "0 4px 8px rgba(255, 255, 255, 0.1)" : "0 4px 8px rgba(0, 0, 0, 0.1)")};
  transition: background 0.3s ease;
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
  border-bottom: 2px solid ${({ theme }) => (theme === "dark" ? "#444" : "#ddd")};
  padding: 12px 0;
  transition: border 0.3s ease;
`;

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  border: 2px solid ${({ theme }) => (theme === "dark" ? "#555" : "#ddd")};
  transition: border 0.3s ease;
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
  background: ${({ theme }) => (theme === "dark" ? "#dc3545" : "#ff4d4d")};
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => (theme === "dark" ? "#c82333" : "#cc0000")};
  }
`;

/* 📌 Sidebar */
export const SidebarContainer = styled.div`
  width: 220px;
  background: ${({ theme }) => (theme === "dark" ? "#292929" : "#f4f4f4")};
  padding: 15px;
  transition: background 0.3s ease;
`;

export const SidebarButton = styled.button`
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 12px;
  background: ${({ theme }) => (theme === "dark" ? "#007bff" : "#0056b3")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: ${({ theme }) => (theme === "dark" ? "#0056b3" : "#003d82")};
  }
`;

/* 📌 Fiyat ve Stok Güncelleme */
export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  background: ${({ theme }) => (theme === "dark" ? "#555" : "#f9f9f9")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SubmitButton = styled.button`
  padding: 10px 15px;
  background: ${({ theme }) => (theme === "dark" ? "#28a745" : "#218838")};
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => (theme === "dark" ? "#1f8a3e" : "#19692c")};
  }
`;

export const SelectInput = styled.select`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  background: ${({ theme }) => (theme === "dark" ? "#555" : "#f9f9f9")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  border: 1px solid #ccc;
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


// Kategori Butonlarının Bulunduğu Alan
export const CategoryButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

// Kategori Butonu Stili
export const CategoryButton = styled.button`
  padding: 8px 12px;
  border: none;
  background-color: ${({ isActive }) => (isActive ? "#007bff" : "#f4f4f4")};
  color: ${({ isActive }) => (isActive ? "white" : "#333")};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? "#0056b3" : "#ddd")};
  }
`;





