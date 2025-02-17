import styled from "styled-components";

// ✅ Sayfa Konteyneri (Sipariş Sayfası)
export const OrdersContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

// ✅ Siparişler Tablosu
export const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  overflow: hidden;
`;

// ✅ Tablo Başlıkları (Th)
export const Th = styled.th`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid ${({ theme }) => theme.secondary};
  font-weight: bold;
`;

// ✅ Tablo Hücreleri (Td)
export const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  text-align: left;
`;

// ✅ Sipariş Durumu Etiketi (Status Badge)
export const StatusBadge = styled.span`
  display: inline-block;
  padding: 5px 10px;
  font-size: 0.9rem;
  font-weight: bold;
  color: white;
  background-color: ${({ status }) =>
    status === "pending"
      ? "#FFA500"
      : status === "shipped"
      ? "#1E90FF"
      : status === "delivered"
      ? "#32CD32"
      : "#FF0000"};
  border-radius: 5px;
`;

// ✅ Genel Buton Stili
export const ActionButton = styled.button`
  padding: 8px 12px;
  border: none;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 5px;
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

// ✅ Sipariş Silme Butonu (Delete Button)
export const DeleteButton = styled(ActionButton)`
  background-color: #FF0000;
  &:hover {
    background-color: #CD0000;
  }
`;


// ✅ Sipariş Detayları Konteyneri
export const OrderDetailsContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

// ✅ Sipariş Bilgileri Bölümü
export const OrderInfo = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  p {
    margin: 8px 0;
    font-size: 1rem;
  }
`;

// ✅ Ürün Listesi (ProductList)
export const ProductList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 15px;
`;

// ✅ Ürün Kartı (ProductItem)
export const ProductItem = styled.li`
  background: ${({ theme }) => theme.cardBackground};
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  
  p {
    margin: 5px 0;
  }
`;


// ✅ **Geri Dön Butonu (BackButton)**
export const BackButton = styled(ActionButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  background-color: #444;
  margin-bottom: 15px;

  &:hover {
    background-color: #222;
  }
`;
