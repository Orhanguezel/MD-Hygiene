import styled from "styled-components";

// 📌 **Checkout Ana Konteyneri**
export const CheckoutContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.cardBackground}; /* 🔥 Daha belirgin */
  border-radius: 8px;
  box-shadow: 0 4px 10px ${({ theme }) => theme.shadow};
`;

// 📌 **Başlık (Title)**
export const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.primary};
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

// 📌 **Ödeme Formu**
export const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
`;

// 📌 **Kart Detayları Alanı**
export const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
`;

// 📌 **Label (Etiketler)**
export const Label = styled.label`
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
`;

// 📌 **Input Alanı (Daha Kontrastlı)**
export const Input = styled.input`
  padding: 12px;
  border: 2px solid ${({ theme }) => theme.border}; /* ✅ Daha belirgin border */
  border-radius: 6px;
  font-size: 1rem;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  transition: border 0.3s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 5px ${({ theme }) => theme.primaryHover};
    outline: none;
  }
`;

// 📌 **Özet Alanı (Daha Kontrastlı)**
export const Summary = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  box-shadow: 0 4px 8px ${({ theme }) => theme.shadow}; /* ✅ Gölgeler güçlendirildi */
`;

// 📌 **Özet İçin Satır (Renk Güncellendi)**
export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 10px;
  color: ${({ theme }) => theme.text};
  border-bottom: 1px solid ${({ theme }) => theme.border};

  &:last-child {
    border-bottom: none;
    font-size: 1.2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.primary}; /* 🔥 Vurgulandı */
  }
`;

// 📌 **Buton Stili**
export const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  padding: 12px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
    transform: scale(1.05);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.disabled};
    cursor: not-allowed;
  }
`;

// 📌 **Hata Mesajları*
// *
export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.error};
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
`;

/* ✅ **Sipariş Başarıyla Tamamlandığında Görünecek Mesaj** */
export const OrderConfirmation = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.success};
  background: ${({ theme }) => theme.successBackground};
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
  box-shadow: ${({ theme }) => theme.shadow};
`;
