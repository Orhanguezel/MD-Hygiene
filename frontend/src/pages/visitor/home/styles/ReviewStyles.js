import styled from "styled-components";

// 📌 Yorum Formu Konteyneri
export const ReviewFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: ${({ theme }) => theme.cardBackground};
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px ${({ theme }) => theme.shadow};
`;

// 📌 Kullanıcı Profili Alanı
export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

// 📌 Kullanıcı Avatarı
export const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.primary};
`;

// 📌 Kullanıcı İsmi
export const UserName = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

// 📌 Başlık (Yorum Yap)
export const ReviewHeader = styled.h3`
  color: ${({ theme }) => theme.primary};
  text-align: center;
  font-size: 1.4rem;
  margin-bottom: 10px;
`;

// 📌 Input (Yorum Girme Alanı)
export const ReviewInput = styled.input`
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
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

// 📌 Gönder Butonu
export const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
    transform: scale(1.05);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.disabled};
    cursor: not-allowed;
  }
`;
