import styled from "styled-components";

// 📌 Ana Yorum Konteyneri
export const ReviewFormContainer = styled.form`
  width: 100%;
  max-width: 700px; /* ✅ Genişlik artırıldı */
  margin: 40px auto; /* ✅ Sayfanın ortasına hizalandı */
  padding: 20px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 16px; 
  box-shadow: 0 6px 12px ${({ theme }) => theme.shadow};
  text-align: center;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

// 📌 Kullanıcı Profil Bilgisi
export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 15px;
`;

// 📌 Kullanıcı Avatarı
export const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.primary};
`;

// 📌 Kullanıcı Adı
export const UserName = styled.h4`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

// 📌 Yorum Başlığı
export const ReviewHeader = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 15px;
`;

// 📌 Yorum Giriş Alanı
export const ReviewBox = styled.div`
  background: ${({ theme }) => theme.background};
  padding: 12px;
  border-radius: 10px;
  box-shadow: inset 0 2px 6px ${({ theme }) => theme.shadow};
  margin-bottom: 15px;
`;

// 📌 Yorum Input
export const ReviewInput = styled.input`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};

  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
  }
`;

// 📌 Gönder Butonu
export const SubmitButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: scale(1.05);
  }

  &:disabled {
    background: ${({ theme }) => theme.disabled};
    cursor: not-allowed;
  }
`;
