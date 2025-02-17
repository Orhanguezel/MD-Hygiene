import styled from "styled-components";

// 📌 Yorum Formu Konteyneri
export const ReviewFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: ${({ theme }) => theme.cardBackground};
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px ${({ theme }) => theme.shadow};
  width: 800px;
  margin: auto;
`;

// 📌 Kullanıcı Profili Alanı
export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

// 📌 Kullanıcı Avatarı
export const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.primary};
  object-fit: cover;
  box-shadow: 0 2px 5px ${({ theme }) => theme.shadow};
`;

// 📌 Kullanıcı İsmi
export const UserName = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

// 📌 Başlık (Yorum Yap)
export const ReviewHeader = styled.h3`
  color: ${({ theme }) => theme.primary};
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 12px;
`;

// 📌 Yorum Kutusu (Daha modern bir görünüm için)
export const ReviewBox = styled.div`
  background: ${({ theme }) => theme.inputBackground};
  border-radius: 8px;
  padding: 12px;
  box-shadow: inset 0 2px 4px ${({ theme }) => theme.shadow};
`;

// 📌 Input (Yorum Girme Alanı)
export const ReviewInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  resize: none;
  transition: all 0.3s ease-in-out;
  outline: none;

  &:focus {
    border: 2px solid ${({ theme }) => theme.primary};
    box-shadow: 0 0 8px ${({ theme }) => theme.primaryHover};
    background: ${({ theme }) => theme.cardBackground};
  }
`;

// 📌 Gönder Butonu
export const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  padding: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
    transform: scale(1.05);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.disabled};
    cursor: not-allowed;
  }
`;
