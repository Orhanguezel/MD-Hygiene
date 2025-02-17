import styled from "styled-components";


// ✅ **Genel Sipariş Sayfası Konteyneri**
export const OrdersContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin-left:40px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
`;

// ✅ **Sipariş Tablosu**
export const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

// ✅ **Tablo Başlıkları**
export const Th = styled.th`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 12px;
  text-align: left;
  border-bottom: 3px solid ${({ theme }) => theme.secondary};
  font-weight: bold;
  font-size: 1rem;
`;

// ✅ **Tablo Hücreleri**
export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  text-align: left;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.text};
`;

// ✅ **Sipariş Durumu Etiketi (Badge)**
export const StatusBadge = styled.span`
  background-color: ${({ $status }) => 
    $status === "pending" ? "pink" : 
    $status === "processing" ? "blue" : 
    $status === "shipped" ? "orange" : 
    $status === "delivered" ? "green" : 
    "gray"};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
`;


// ✅ **Buton Stili**
export const ActionButton = styled.button`
  padding: 10px 14px;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 6px;
  margin-right: 5px;
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    background: ${({ theme }) => theme.secondary};
    transform: scale(1.05);
  }
`;

// ✅ **Sipariş Silme Butonu**
export const DeleteButton = styled(ActionButton)`
  background: #FF0000;

  &:hover {
    background: #CD0000;
  }
`;

// ✅ **Sipariş Detayları Konteyneri**
export const OrderDetailsContainer = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: auto;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
`;

// ✅ **Sipariş Bilgileri Konteyneri**
export const OrderInfo = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  font-size: 1rem;

  p {
    margin: 10px 0;
  }
`;

// ✅ **Ürün Listesi (Sipariş İçindeki Ürünler)**
export const ProductList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 15px;
`;

// ✅ **Sipariş Ürün Kartı**
export const ProductItem = styled.li`
  background: ${({ theme }) => theme.cardBackground};
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  font-size: 0.95rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    margin: 5px 0;
  }
`;

// ✅ **Geri Dön Butonu**
export const BackButton = styled(ActionButton)`
  background: #555;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;

  &:hover {
    background: #333;
  }
`;

// ✅ **Sipariş Durumu Güncelleme Butonları Konteyneri**

export const StatusButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

// ✅ **Sipariş Durumu Güncelleme Butonu**

export const StatusButton = styled(ActionButton)`
  background: ${({ $shipped, $delivered, $archived }) =>
    $shipped
      ? "#1E90FF"
      : $delivered
      ? "#32CD32"
      : $archived
      ? "#555"
      : "#FFA500"};

  &:hover {
    background: ${({ $shipped, $delivered, $archived }) =>
      $shipped
        ? "#1C88E5"
        : $delivered
        ? "#2EB82E"
        : $archived
        ? "#333"
        : "#FFA500"};
  }
`;
