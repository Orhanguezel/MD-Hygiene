import styled from "styled-components";


// ✅ Genel Konteyner
export const OfferModuleContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

// ✅ Sidebar
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
  box-shadow: 2px 0 5px ${({ theme }) => theme.shadow};

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

// ✅ Sidebar Butonları
export const SidebarButton = styled.button`
  padding: 12px 15px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;


// ✅ Teklif Formu Konteyneri
export const OfferFormContainer = styled.div`
  margin-left: 270px;
  padding: 20px;
  flex: 1;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.shadow};

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 15px;
  }
`;

// ✅ Form Input
export const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
`;


// ✅ Buton
export const ActionButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;

// ✅ Teklif Listesi
export const OfferListContainer = styled.div`
  padding: 20px;
  margin-left: 270px;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 10px;
  }
`;

// ✅ Tablo
export const OfferTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  background: ${({ theme }) => theme.cardBackground};

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

// ✅ Tablo Başlığı
export const TableHeader = styled.th`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 12px;
`;

// ✅ Tablo Satırları
export const TableRow = styled.tr`
  background-color: ${({ theme }) => theme.cardBackground};

  &:nth-child(even) {
    background-color: ${({ theme }) => theme.border};
  }
`;

// ✅ Tablo Hücreleri
export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
`;

// ✅ Filtreleme Alanı
export const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// ✅ Arama Input
export const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  width: 200px;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// ✅ Filtre Butonu
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
`;






// ✅ Teklif Durum Etiketi
export const StatusBadge = styled.span`
  background-color: ${({ $status, theme }) => {
    switch ($status) {
      case "approved":
        return "#28a745";
      case "pending":
        return "#ffc107";
      case "archived":
        return theme.sidebarBackground;
      default:
        return "#dc3545";
    }
  }};
  color: ${({ theme }) => theme.buttonText};
  padding: 5px 10px;
  border-radius: 4px;
  display: inline-block;
`;

// ✅ Ürün Seçim Alanı
export const ProductLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
  color: ${({ theme }) => theme.text};
`;

export const ProductSelect = styled.select`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const ProductOption = styled.option`
  font-size: 14px;
  padding: 8px;
  background: ${({ theme }) => theme.sidebarBackground};
  color: ${({ theme }) => theme.text};
`;

// ✅ Ürün Tablosu
export const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

export const TaxSelect = styled.select`
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
`;

export const OfferButton = styled.button`
  padding: 10px 20px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s;
  margin-right: 5px;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;

export const OfferHeader = styled.h2`
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
`;

export const OfferDetailsContainer = styled.div`
  margin-bottom: 20px;
`;

export const CategoryButton = styled.button.attrs((props) => ({
  $isActive: props.$isActive ? "true" : undefined,
}))`
  padding: 10px 15px;
  background: ${({ $isActive, theme }) => ($isActive === "true" ? theme.primary : theme.cardBackground)};
  color: ${({ $isActive, theme }) => ($isActive === "true" ? theme.buttonText : theme.text)};
  border: ${({ $isActive, theme }) => ($isActive === "true" ? `2px solid ${theme.primaryHover}` : "2px solid transparent")};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;


export const CategoryButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

export const DeleteButton = styled.button`
  background: #dc3545;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #c82333;
  }
`;


export const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center; // ✅ Kartları ortala
  padding: 20px;
`;

export const ProductDetails = styled.div`
  padding: 10px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.shadow};
  flex: 1;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 200px; 
  object-fit: cover; 
  border-radius: 8px;
  margin-bottom: 10px;
`;


export const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(33.333% - 10px); // ✅ 3 sütun düzeni
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.shadow};
  padding: 15px;
  text-align: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02); // ✅ Hover efekti eklendi
  }

  @media (max-width: 1024px) {
    width: calc(50% - 10px); // ✅ Tablet görünümü için 2 sütun
  }

  @media (max-width: 768px) {
    width: 100%; // ✅ Mobilde tam genişlik
  }
`;


export const ProductName = styled.h3`
  color: ${({ theme }) => theme.text};
`;

export const ProductPrice = styled.span`
  color: ${({ theme }) => theme.text};
`;

export const ProductDescription = styled.p`
  color: ${({ theme }) => theme.text};
`;

export const ProductCategory = styled.span`
  color: ${({ theme }) => theme.text};
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s;
  margin-top: 10px;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;

export const FormContainer = styled.div`
  max-width: 500px;
`;

export const ProductContainer = styled.div`
  display: flex;
  align-items: flex-start; // ✅ Sidebar ile içerik hizalama
  gap: 20px;
  padding: 20px;
  background: ${({ theme }) => theme.background};
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;


export const ProductInput = styled.input`
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
`;


