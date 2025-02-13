import styled from "styled-components";

// ✅ Profil Konteyneri
export const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: ${({ theme }) => theme.background};
  border-radius: 8px;
  box-shadow: 0 4px 8px ${({ theme }) => theme.shadow};
  color: ${({ theme }) => theme.text};
`;

// ✅ Genel Bölüm (Section)
export const Section = styled.div`
  margin: 20px 0;
  padding: 15px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
  color: ${({ theme }) => theme.text};
`;

// ✅ Genel Buton
export const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  padding: 12px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
  font-weight: bold;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;

// ✅ Kullanıcı Bilgi Paragrafı
export const Info = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
`;

// ✅ Kart Yapıları Kontrastlı Hale Getirildi
export const Card = styled.div`
  background: ${({ theme }) => theme.softBackground};
  padding: 12px;
  margin: 6px 0;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
  color: ${({ theme }) => theme.text};
`;

// ✅ Adres Kartı
export const AddressCard = styled(Card)``;

// ✅ Sipariş Kartı
export const OrderCard = styled(Card)``;

// ✅ Sepet Kartı
export const CartItem = styled(Card)``;

// ✅ Sipariş Detayları
export const OrderDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

// ✅ Sipariş İçeriği
export const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
`;

// ✅ Form Konteyneri
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
`;

// ✅ Ana Sayfa Konteyneri
export const HomeContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  border-radius: 8px;
  box-shadow: 0 4px 8px ${({ theme }) => theme.shadow};
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

// ✅ Giriş (Input) Stili Kontrastlı Hale Getirildi
export const Input = styled.input`
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  margin-bottom: 10px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};

  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
  }
`;

// ✅ Etiket (Label)
export const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
`;

// ✅ Adres Formu
export const AddressForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// ✅ Adres Detayları
export const AddressDetails = styled.div`
  margin-bottom: 10px;
`;

// ✅ Adres İçeriği
export const AddressItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
`;

// ✅ İşlem Butonu
export const ActionButton = styled(Button)`
  background-color: ${({ theme }) => theme.secondary};
`;

export const InvoiceCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
