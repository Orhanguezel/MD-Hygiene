import styled from "styled-components";


// 📌 Ana Container
export const SettingsContainer = styled.div`
  padding: 30px;
  background-color: ${({ theme }) => (theme === "dark" ? "#121212" : "#f9f9f9")};
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
  transition: background 0.3s ease, color 0.3s ease;
  max-width: 700px;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: ${({ theme }) =>
    theme === "dark"
      ? "0px 4px 12px rgba(255, 255, 255, 0.1)"
      : "0px 4px 12px rgba(0, 0, 0, 0.1)"};
`;



// 📌 Her Bölüm (Section)
export const Section = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => (theme === "dark" ? "#1e1e1e" : "#ffffff")};
  box-shadow: ${({ theme }) =>
    theme === "dark"
      ? "0px 2px 8px rgba(255, 255, 255, 0.1)"
      : "0px 2px 8px rgba(0, 0, 0, 0.05)"};
`;



// 📌 Etiketler (Label)
export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 14px;
`;

// 📌 Seçim Kutusu (Dropdown - Select)
export const Select = styled.select`
  padding: 12px;
  width: 100%;
  border: 1px solid ${({ theme }) => (theme === "dark" ? "#444" : "#ccc")};
  background: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => (theme === "dark" ? "#BB86FC" : "#007bff")};
  }
`;

// 📌 Genel Buton Stili
export const Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: ${({ theme }) => (theme === "dark" ? "#4f46e5" : "#007bff")};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.3s ease;
  margin-top: 10px;  // Butonlar arasında boşluk bırakıyoruz

  &:hover {
    background-color: ${({ theme }) => (theme === "dark" ? "#4338ca" : "#0056b3")};
    transform: scale(1.03);
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

// 📌 Özel Toggle Butonu (Ödeme Yöntemleri İçin)
export const ToggleButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${({ active }) => (active ? "#28a745" : "#dc3545")};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover {
    background-color: ${({ active }) => (active ? "#218838" : "#c82333")};
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

export const FormInput = styled.input`
  padding: 8px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => (theme === "dark" ? "#444" : "#ccc")};
  background: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  border-radius: 5px;
`;

export const ActionButton = styled.button`
  padding: 10px 15px;
  background-color: ${({ theme }) => (theme === "dark" ? "#4caf50" : "#007bff")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => (theme === "dark" ? "#388e3c" : "#0056b3")};
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  background: ${({ theme }) => (theme === "dark" ? "#222" : "#fff")};
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

export const TableCell = styled.td`
  padding: 10px;
  text-align: left;
`;

export const EditButton = styled.button`
  padding: 5px 10px;
  background-color: #ffc107;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-right: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e0a800;
  }
`;

export const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
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

export const ProductOption = styled.option`
  padding: 8px;
`;

export const ProductSelect = styled.select`
  padding: 8px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => (theme === "dark" ? "#444" : "#ccc")};
  background: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  border-radius: 5px;
`;


export const BackButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #495057;
    transform: scale(1.02);
  }
`;

export const AddButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

