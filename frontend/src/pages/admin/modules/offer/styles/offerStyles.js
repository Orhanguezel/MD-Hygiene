import styled from "styled-components";

// ✅ Genel Konteyner
export const OfferModuleContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

// ✅ Sidebar Konteyner
export const SidebarContainer = styled.div`
  width: 250px;
  background-color: ${({ theme }) => theme.sidebarBackground};
  padding: 20px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: auto;
    flex-direction: row;
    justify-content: space-around;
    box-shadow: none;
  }
`;

// ✅ Sidebar Başlık
export const SidebarTitle = styled.h2`
  color: ${({ theme }) => theme.sidebarText};
  font-size: 18px;
  margin-bottom: 10px;
  border-bottom: 2px solid ${({ theme }) => theme.primary};
  padding-bottom: 5px;
`;

// ✅ Sidebar Butonu
export const SidebarButton = styled.button`
  padding: 12px 15px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }

  @media (max-width: 768px) {
    display: inline-block;
    width: auto;
    padding: 10px 20px;
    font-size: 12px;
  }
`;

// ✅ Form Konteyner (Sayfa içeriği)
export const OfferFormContainer = styled.div`
  margin-left: 270px;
  padding: 20px;
  flex: 1;
  background: ${({ theme }) => theme.cardBackground};
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
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
`;

export const ActionButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const OfferTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
`;

export const TableHeader = styled.th`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  padding: 12px;
`;

export const TableRow = styled.tr`
  background-color: ${({ theme }) => theme.cardBackground};

  &:nth-child(even) {
    background-color: ${({ theme }) => theme.border};
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.border};
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
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  width: 200px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FilterButton = styled.button`
  padding: 10px 20px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// ✅ Toplam Alanı
export const TotalSection = styled.div`
  background: ${({ theme }) => theme.border};
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
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const OfferListContainer = styled.div`
  padding: 20px;
  margin-left: 270px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 10px;
  }
`;

export const OfferButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;

export const StatusBadge = styled.span`
  background-color: ${({ $status }) => {
    switch ($status) {
      case "approved":
        return "#28a745";
      case "pending":
        return "#ffc107";
      case "archived":
        return "#6c757d";
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

// ✅ Sidebar Wrapper
export const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// ✅ Teklif Detay Konteyneri
export const OfferDetailsContainer = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const OfferHeader = styled.h2`
  margin-bottom: 20px;
`;

export const OfferDetailItem = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;
export const ProductLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#333")};
`;

export const ProductSelect = styled.select`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => (theme === "dark" ? "#666" : "#ccc")};
  background: ${({ theme }) => (theme === "dark" ? "#222" : "#fff")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => (theme === "dark" ? "#aaa" : "#888")};
  }
`;

export const ProductOption = styled.option`
  font-size: 14px;
  padding: 8px;
  background: ${({ theme }) => (theme === "dark" ? "#333" : "#f9f9f9")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
`;

export const DescriptionTextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  resize: vertical;
  font-size: 14px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  border-radius: 4px;
`;

