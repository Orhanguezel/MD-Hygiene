import styled from "styled-components";



// ✅ Sidebar Wrapper
export const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;


export const OfferDetailItem = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
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





// ✅ Ana Konteyner (Sayfa Genel Yapısı)
export const OfferModuleContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;



// ✅ Sayfa İçeriği
export const OfferContentContainer = styled.div`
  margin-left: 270px;
  padding: 20px;
  flex: 1;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    margin-left: 0;
    padding: 15px;
  }
`;






// ✅ Vergi Seçimi
export const TaxSelect = styled.select`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};

  @media (max-width: 1024px) {
    width: 100%;
  }
`;


export const OfferDetailsHeader = styled.h2`
  margin-bottom: 20px;
`;

export const OfferDetailsItem = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export const DeleteButton = styled.button`
  background: #dc3545;
  color: white;
  padding: 10px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #c82333;
  }
`;

export const SummaryBox = styled.div`
  background: ${({ theme }) => theme.border};
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
`;


// ✅ Sidebar Aç/Kapat Butonu
export const SidebarToggleButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  position: absolute;
  top: 15px;
  right: -20px;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }

  @media (max-width: 1024px) {
    position: relative;
    right: 0;
  }
`;

// ✅ Sidebar Panel İçeriği
export const SidebarPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;


// 📌 Sidebar Konteyneri (Sabit Kaldı)
export const SidebarContainer = styled.div`
  width: 250px;
  background-color: ${({ theme }) => theme.sidebarBackground};
  padding: 20px;
  position: fixed;
  top: 70px;
  left: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    width: 220px;
  }

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: auto;
    flex-direction: row;
    justify-content: space-around;
    box-shadow: none;
  }
`;

// 📌 Sidebar Başlık
export const SidebarTitle = styled.h2`
  color: ${({ theme }) => theme.sidebarText};
  font-size: 18px;
  margin-bottom: 10px;
  border-bottom: 2px solid ${({ theme }) => theme.primary};
  padding-bottom: 5px;
`;

// 📌 Sidebar Butonu (Daha Stabil ve Net)
export const SidebarButton = styled.button`
  padding: 12px 15px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 12px;
    text-align: center;
  }
`;





// 📌 **Etiketler (Label)**
export const ProductLabel = styled.label`
  font-size: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-bottom: 5px;
`;



export const ProductOption = styled.option`
  font-size: 1rem;
  padding: 8px;
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
`;



export const TableHeader = styled.th`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  padding: 12px;
  text-align: left;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.border};
  }
`;

export const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

// 📌 **Giriş Alanı (Input)**
export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 5px ${({ theme }) => theme.primaryHover};
  }
`;




// 📌 **Ana Form Konteyneri** (Sidebar ile uyumlu)
export const OfferFormContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (min-width: 1024px) {
    margin-left: 200px; /* ✅ Sidebar olduğu için büyük ekranlarda sola kaydır */
  }
`;

// 📌 **Form Başlığı**
export const OfferHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.primary};
  border-bottom: 2px solid ${({ theme }) => theme.primary};
  padding-bottom: 8px;
`;

// 📌 **Form Bölümü Konteyneri**
export const OfferDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
  background: ${({ theme }) => theme.border};
  border-radius: 8px;
`;

// 📌 **Dropdown Seçenekleri**
export const ProductSelect = styled.select`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primaryHover};
  }
`;

// 📌 **Ürün Tablosu**
export const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px ${({ theme }) => theme.shadow};
`;

// 📌 **Genel Toplam Alanı**
export const TotalSection = styled.div`
  background: ${({ theme }) => theme.border};
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.primary};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// 📌 **Kaydet ve Sil Butonları**
export const ActionButton = styled.button`
  background-color: ${({ theme, $danger }) => ($danger ? theme.danger : theme.primary)};
  color: white;
  padding: 12px 15px;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  &:hover {
    background-color: ${({ theme, $danger }) => ($danger ? theme.dangerHover : theme.primaryHover)};
    transform: scale(1.05);
  }
`;


// 📌 **Teklif Listesi Konteyneri** (Sidebar ile uyumlu)
export const OfferListContainer = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  box-shadow: 0 2px 6px ${({ theme }) => theme.shadow};
  margin: 0 auto;

  @media (min-width: 1024px) {
    margin-left: 270px; /* ✅ Sidebar ile hizalandı */
  }
`;

// 📌 **Filtreleme ve Arama Alanı**
export const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// 📌 **Arama Kutusu**
export const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  font-size: 1rem;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
// 📌 **Filtre Butonları - Kontrast ve Hover Efekti Eklendi**
export const FilterButton = styled.button`
  padding: 10px 15px;
  background: ${({ theme, $active }) => 
    $active ? theme.primary : theme.border}; // ✅ Seçili düğme vurgulu olacak
  color: ${({ theme, $active }) => ($active ? "white" : theme.text)};
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    color: white;
    transform: scale(1.05);
  }

  &:disabled {
    background: ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.textSecondary};
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;


// 📌 **Teklif Tablosu**
export const OfferTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 2px 6px ${({ theme }) => theme.shadow};
  margin-top: 15px;
  overflow: hidden;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }

  th {
    background: ${({ theme }) => theme.primary};
    color: white;
  }

  tr:nth-child(even) {
    background: ${({ theme }) => theme.border};
  }
`;

// 📌 **Durum Rozeti**
export const StatusBadge = styled.span`
  background-color: ${({ $status }) => {
    switch ($status) {
      case "approved":
        return "#28a745";
      case "rejected":
        return "#dc3545";
      case "draft":
        return "#ffc107";
      default:
        return "#6c757d";
    }
  }};
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.9rem;
`;

// 📌 **İşlem Butonları**
export const OfferButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  margin-right: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
    transform: scale(1.05);
  }
`;




