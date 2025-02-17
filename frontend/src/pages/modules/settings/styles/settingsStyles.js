import styled from "styled-components";

// 📌 **Genel Konteyner (Ana Ayarlar Alanı)**
export const SettingsContainer = styled.div`
  padding: 30px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: background 0.3s ease, color 0.3s ease;
  max-width: 700px;
  margin: 40px auto;
  border-radius: 12px;
  box-shadow: 0px 4px 12px ${({ theme }) => theme.shadow};
`;

// 📌 **Bölüm (Section)**
export const Section = styled.div`
  margin-bottom: 25px;
  padding: 20px;
  border-radius: 10px;
  background: ${({ theme }) => theme.cardBackground};
  box-shadow: 0px 3px 8px ${({ theme }) => theme.shadow};
`;

// 📌 **Etiket (Label)**
export const Label = styled.label`
  display: block;
  font-weight: bold;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 6px;
`;

// 📌 **Seçim Kutusu (Dropdown - Select)**
export const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

// 📌 **Genel Buton**
export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: scale(1.03);
  }
`;

// 📌 **Geri Dön Butonu**
export const BackButton = styled(Button)`
  background: ${({ theme }) => theme.secondary};
  &:hover {
    background: ${({ theme }) => theme.secondaryHover};
  }
`;

// 📌 **Form Girişi (Input)**
export const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  border-radius: 6px;
  font-size: 1rem;
  margin-bottom: 10px;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;
export const ToggleButton = styled.button`
  width: 100%;
  padding: 12px;
  background: ${({ $active }) => ($active ? "#28a745" : "#dc3545")};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover {
    background: ${({ $active }) => ($active ? "#218838" : "#c82333")};
    transform: scale(1.02);
  }
`;


// 📌 **Tablo (Table)**
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  background: ${({ theme }) => theme.cardBackground};
  box-shadow: 0px 3px 8px ${({ theme }) => theme.shadow};
`;

// 📌 **Tablo Satırı (Row)**
export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

// 📌 **Tablo Hücresi (Cell)**
export const TableCell = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

// 📌 **Düzenle Butonu**
export const EditButton = styled(Button)`
  background: #ffc107;
  &:hover {
    background: #e0a800;
  }
`;

// 📌 **Silme Butonu**
export const DeleteButton = styled(Button)`
  background: #dc3545;
  &:hover {
    background: #c82333;
  }
`;

// 📌 **Aksiyon Butonu**
export const ActionButton = styled(Button)`
  margin-top: 10px;
`;

// 📌 **Özet Konteyneri**
export const Summary = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 10px;
  box-shadow: 0px 3px 8px ${({ theme }) => theme.shadow};
  color: ${({ theme }) => theme.text};
`;

// 📌 **Özet İçeriği**
export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  padding: 10px 0;

  &.grand-total {
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

// 📌 **Ürün Seçim Kutusu**
export const ProductSelect = styled.select`
  padding: 12px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

// 📌 **Ürün Seçenekleri**
export const ProductOption = styled.option`
  padding: 8px;
`;

// 📌 **Ekleme Butonu**
export const AddButton = styled(Button)`
  background: #007bff;
  &:hover {
    background: #0056b3;
  }
`;




// 📌 Input Kutusu
export const Input = styled.input`
  padding: 12px;
  width: 100%;
  border: 1px solid ${({ theme }) => (theme === "dark" ? "#444" : "#ccc")};
  background: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 10px;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => (theme === "dark" ? "#BB86FC" : "#007bff")};
  }
`;







export const Container = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => (theme === "dark" ? "#1e1e1e" : "#f9f9f9")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: auto;
`;




export const SelectInput = styled.select`
  padding: 8px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => (theme === "dark" ? "#444" : "#ccc")};
  background: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  border-radius: 5px;
`;

