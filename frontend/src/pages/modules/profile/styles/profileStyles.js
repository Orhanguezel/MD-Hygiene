import styled from "styled-components";

// 📌 **Genel Konteyner**
export const ProfileContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background: ${({ theme }) => theme.background};
  border-radius: 10px;
  box-shadow: 0 4px 1px ${({ theme }) => theme.shadow};
  color: ${({ theme }) => theme.text};
`;

// 📌 **Bölüm (Section)**
export const Section = styled.div`
  margin: 20px 0;
  padding: 20px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 10px;
  box-shadow: 0 2px 6px ${({ theme }) => theme.shadow};
  color: ${({ theme }) => theme.text};
`;

// 📌 **Genel Buton Stili**
export const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
  box-shadow: 0 2px 6px ${({ theme }) => theme.shadow};

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;

// 📌 **Bilgi Metni**
export const Info = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
`;

// 📌 **Kart Yapısı**
export const Card = styled.div`
  background: ${({ theme }) => theme.softBackground};
  padding: 16px;
  margin: 10px 0;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 2px 6px ${({ theme }) => theme.shadow};
  color: ${({ theme }) => theme.text};
`;

// 📌 **Kart Başlığı**
export const CardHeader = styled.h2`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 14px;
  font-size: 1.2rem;
  border-radius: 10px 10px 0 0;
  text-align: center;
`;

// 📌 **Kart İçeriği**
export const CardContent = styled.div`
  padding: 16px;
  font-size: 1rem;
`;

// 📌 **Sipariş & Adres Kartları**
export const OrderCard = styled(Card)``;
export const AddressCard = styled(Card)``;

// 📌 **Sipariş Detayları**
export const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

// 📌 **Sipariş İçeriği**
export const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  padding: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  &:last-child {
    border-bottom: none;
  }
`;

// 📌 **Etiketler (Label)**
export const Label = styled.label`
  display: block;
  font-size: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-bottom: 6px;
`;

// 📌 **Giriş Alanı (Input)**
export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  font-size: 1rem;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};

  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
  }
`;

// 📌 **İşlem Butonu (Özel)**
export const ActionButton = styled(Button)`
  background-color: ${({ theme }) => theme.secondary};
  margin-top: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryHover};
  }
`;

// 📌 **Fatura Kartı**
export const InvoiceCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
`;

// 📌 **Görüntüleme Butonu**
export const ViewButton = styled(Button)`
  background-color: ${({ theme }) => theme.primary};
  font-size: 0.9rem;
  padding: 8px 12px;
  border-radius: 6px;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

// 📌 **Fatura Listesi**
export const InvoiceList = styled.div`
  display: grid;
  gap: 14px;
`;

// 📌 **Fatura Detayları**
export const InvoiceDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 1rem;
`;

// 📌 **Özet Kartı**
export const Summary = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 10px;
  box-shadow: 0 2px 6px ${({ theme }) => theme.shadow};
  color: ${({ theme }) => theme.text};
`;

// 📌 **Özet İçeriği**
export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  padding: 8px 0;

  &.grand-total {
    margin-top: 12px;
    font-weight: bold;
  }
`;

// 📌 **Sipariş Durumu Etiketi**
export const StatusBadge = styled.span`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 0.9rem;
`;





// ✅ Sepet Kartı
export const CartItem = styled(Card)``;

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

// ✅ Adres Butonu
export const AddressButton = styled(Button)`
  background-color: ${({ theme }) => theme.secondary};
  font-size: 0.9rem;
  padding: 8px 12px;
  border-radius: 6px;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryHover};
  }
`;


// ✅ Adres Listesi
export const AddressList = styled.div`
  display: grid;
  gap: 14px;
`;

// ✅ Adres
export const Address = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

// ✅ Adres İşlemleri
export const AddressActions = styled.div`
  display: flex;
  gap: 10px;
`;

// ✅ Adres Başlık
export const AddressTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 6px;
`;

// ✅ Adres İçerik
export const AddressContent = styled.p`
  font-size: 1rem;
`;

//
export const FileInput = styled.input`
  display: none;
`;

// ✅ Profil Resmi Konteyneri
export const ProfileImageContainer = styled.div`
  position: relative;
  display: inline-block;
`;

// ✅ Profil Resmi
export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
`;

// ✅ Profil Resmi Yükleme Butonu
export const FileUploadButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;

// ✅ Profil Resmi Önizleme
export const ImagePreviewContainer = styled.div`
  position: relative;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  font-size: 1rem;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};

  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
  }
`;


