import styled from "styled-components";

// ✅ Genel Konteyner
export const OfferModuleContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => (theme === "dark" ? "#1a1a1a" : "#fff")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
`;

// ✅ Form Konteyner
export const OfferFormContainer = styled.div`
  margin-left: 10px;
  padding: 20px;
  flex: 1;
  background: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 15px;
  }
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  background: ${({ theme }) => (theme === "dark" ? "#555" : "#f9f9f9")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ActionButton = styled.button`
  background-color: ${({ theme }) => (theme === "dark" ? "#4caf50" : "#007bff")};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ theme }) => (theme === "dark" ? "#45a049" : "#0056b3")};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// ✅ Tablo
export const OfferTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

export const TableHeader = styled.th`
  background-color: ${({ theme }) => (theme === "dark" ? "#444" : "#eaeaea")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  padding: 12px;
`;

export const TableRow = styled.tr`
  background-color: ${({ theme }) => (theme === "dark" ? "#333" : "#f9f9f9")};

  &:nth-child(even) {
    background-color: ${({ theme }) => (theme === "dark" ? "#3a3a3a" : "#f1f1f1")};
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

// ✅ Filtre & Arama Alanı
export const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FilterButton = styled.button`
  padding: 10px 20px;
  background: ${({ theme }) => (theme === "dark" ? "#4caf50" : "#007bff")};
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: ${({ theme }) => (theme === "dark" ? "#45a049" : "#0056b3")};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// ✅ Toplam Alanı
export const TotalSection = styled.div`
  background: ${({ theme }) => (theme === "dark" ? "#444" : "#f1f1f1")};
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

// ✅ Vergi Seçimi
export const TaxSelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: ${({ theme }) => (theme === "dark" ? "#555" : "#fff")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// ✅ Teklif Listesi
export const OfferListContainer = styled.div`
  padding: 20px;
  margin-left: 250px;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 10px;
  }
`;

export const OfferButton = styled.button`
  background-color: ${({ theme }) => (theme === "dark" ? "#4caf50" : "#007bff")};
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ theme }) => (theme === "dark" ? "#45a049" : "#0056b3")};
  }
`;

export const StatusBadge = styled.span`
  background-color: ${({ $status }) => {
    switch ($status) {
      case "Onaylandı":
        return "#28a745";
      case "Beklemede":
        return "#ffc107";
      default:
        return "#dc3545";
    }
  }};
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  display: inline-block;
`;

// ✅ Ürün Tablosu
export const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;



// ✅ Sidebar Konteyner
export const SidebarContainer = styled.div`
  width: 250px;
  background-color: ${({ theme }) => (theme === "dark" ? "#2c2c2c" : "#f4f4f4")};
  padding: 20px;
  height: 100vh;
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: auto;
    flex-direction: row;
    justify-content: space-around;
  }
`;

// ✅ Sidebar Butonu
export const SidebarButton = styled.button`
  padding: 12px 15px;
  background-color: ${({ theme }) => (theme === "dark" ? "#007bff" : "#007bff")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ theme }) => (theme === "dark" ? "#0056b3" : "#0056b3")};
  }

  @media (max-width: 768px) {
    display: inline-block;
    width: auto;
    padding: 10px 20px;
    font-size: 12px;
  }
`;

// ✅ Sidebar Başlık
export const SidebarTitle = styled.h2`
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  font-size: 18px;
  margin-bottom: 10px;
  border-bottom: 2px solid ${({ theme }) => (theme === "dark" ? "#4caf50" : "#007bff")};
  padding-bottom: 5px;
`;

// ✅ Sidebar Wrapper
export const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;