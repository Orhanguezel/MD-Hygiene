// ✅ Genel Konteyner Stili
import styled from "styled-components";

export const OfferModuleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${({ theme }) => (theme === "dark" ? "#1a1a1a" : "#f9f9f9")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
`;

// ✅ Teklif Detayları Konteyneri
export const OfferDetailsContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => (theme === "dark" ? "#252525" : "#fff")};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
`;

export const OfferInfo = styled.div`
  margin-bottom: 20px;
  line-height: 1.6;
`;

// ✅ Teklif Listesi Butonları
export const OfferActionButton = styled.button`
  padding: 8px 15px;
  background-color: ${({ theme }) => (theme === "dark" ? "#4caf50" : "#007bff")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ theme }) => (theme === "dark" ? "#45a049" : "#0056b3")};
  }
`;

// ✅ PDF İndirme Butonu
export const DownloadButton = styled.button`
  background-color: ${({ theme }) => (theme === "dark" ? "#e91e63" : "#dc3545")};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => (theme === "dark" ? "#c2185b" : "#c82333")};
  }
`;

// ✅ Ürün Listesi Konteyneri
export const ProductListContainer = styled.div`
  margin: 20px 0;
`;

export const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: ${({ theme }) => (theme === "dark" ? "#333" : "#f1f1f1")};
  border-radius: 4px;
  margin-bottom: 5px;
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

// ✅ Modal Stili
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => (theme === "dark" ? "#2c2c2c" : "#fff")};
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

export const ModalCloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    color: ${({ theme }) => (theme === "dark" ? "#e91e63" : "#dc3545")};
  }
`;

// ✅ Tablo Başlıkları
export const TableHeader = styled.th`
  background-color: ${({ theme }) => (theme === "dark" ? "#444" : "#eaeaea")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  padding: 10px;
`;

// ✅ Başlıklar
export const SectionTitle = styled.h2`
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  border-bottom: 2px solid ${({ theme }) => (theme === "dark" ? "#4caf50" : "#007bff")};
  padding-bottom: 5px;
  margin-bottom: 15px;
`;

// ✅ Form Butonu
export const FormButton = styled.button`
  background-color: ${({ theme }) => (theme === "dark" ? "#00897b" : "#00bcd4")};
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ theme }) => (theme === "dark" ? "#00796b" : "#0097a7")};
  }
`;

// ✅ Yükleme Animasyonu
export const LoadingSpinner = styled.div`
  border: 4px solid ${({ theme }) => (theme === "dark" ? "#555" : "#f3f3f3")};
  border-top: 4px solid ${({ theme }) => (theme === "dark" ? "#4caf50" : "#007bff")};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// ✅ Sayfalama
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PaginationButton = styled.button`
  background-color: ${({ theme }) => (theme === "dark" ? "#4caf50" : "#007bff")};
  color: white;
  border: none;
  padding: 8px 12px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => (theme === "dark" ? "#45a049" : "#0056b3")};
  }
`;

export const SidebarButton = styled.button`
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  background: ${({ theme }) => (theme === "dark" ? "#007bff" : "#007bff")};
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => (theme === "dark" ? "#0056b3" : "#0056b3")};
  }
`;

export const SidebarContainer = styled.div`
  width: 200px;
  background: #f4f4f4;
  padding: 10px;
`;

export const SidebarItem = styled.div`
  margin-bottom: 10px;
`;

export const SidebarList = styled.div`
  margin-top: 20px;
`;

export const SidebarTitle = styled.h3`
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  border-bottom: 2px solid ${({ theme }) => (theme === "dark" ? "#4caf50" : "#007bff")};
  padding-bottom: 5px;
  margin-bottom: 15px;
`;

export const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  background-color: ${({ theme }) => (theme === "dark" ? "#333" : "#f1f1f1")};
`;

export const TableCell = styled.td`
  padding: 10px;
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
`;

export const MainContent = styled.div`
  display: flex;
`;

export const Th = styled.th`
  background-color: ${({ theme }) => (theme === "dark" ? "#444" : "#eaeaea")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  padding: 10px;
`;

export const OfferListContainer = styled.div`
  padding: 20px;
`;

export const OfferTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const ActionButton = styled.button`
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

export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  background: ${({ theme }) => (theme === "dark" ? "#555" : "#f9f9f9")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const OfferFormContainer = styled.div`
  padding: 20px;
  background: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TotalSection = styled.div`
  background: ${({ theme }) => (theme === "dark" ? "#444" : "#f1f1f1")};
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
`;

export const ProductFormContainer = styled.div`
  padding: 20px;
  background: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ShippingContainer = styled.div`
  margin-top: 20px;
`;

export const ShippingForm = styled.form`
  display: flex;
  align-items: center;
`;

export const ShippingInput = styled.input`
  padding: 10px;
  margin-right: 10px;
  width: 100px;
`;

export const ShippingButton = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

export const ProductForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ShippingLabel = styled.label`
  margin-right: 10px;
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background: #28a745;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: #218838;
  }
`;

export const ProductFormInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
`;

export const ProductFormButton = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

export const ProductList = styled.div`
  margin-top: 20px;
`;

export const ProductListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: ${({ theme }) => (theme === "dark" ? "#444" : "#f1f1f1")};
  border-radius: 4px;
  margin-bottom: 5px;
`;

export const FilterButton = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const FilterInput = styled.input`
  padding: 10px;
  margin-right: 10px;
`;

export const FilterSelect = styled.select`
  padding: 10px;
`;

export const FilterLabel = styled.label`
  margin-right: 10px;
`;

export const FilterForm = styled.form`
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
`;

export const TaxSelect = styled.select`
  padding: 10px;
`;


export const toggleOfferActive = styled.button`
  padding: 10px 20px;
  background: #dc3545;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: #c82333;
  }
`;














