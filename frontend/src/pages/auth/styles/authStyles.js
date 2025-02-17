import styled from "styled-components";

// 📌 **Genel Sayfa Konteyneri**
export const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  background: ${({ theme }) => theme.backgroundGradient || theme.background};
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  transition: background 0.4s ease-in-out;
`;


// 📌 **Kart (Form Alanı)**
export const Card = styled.div`
  display: flex;
  max-width: 1100px;
  width: 90%;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  box-shadow: 0px 6px 18px ${({ theme }) => theme.shadow};
  overflow: hidden;
  min-height: 550px;
  backdrop-filter: blur(12px);
  transition: background 0.4s ease-in-out, box-shadow 0.3s ease-in-out;

  @media (max-width: 1024px) {
    width: 95%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    min-height: auto;
  }
`;

// 📌 **Form Alanı**
export const AuthForm = styled.form`
  width: 50%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 968px) {
    width: 100%;
    padding: 30px;
  }
`;

// 📌 **Başlık**
export const Title = styled.h2`
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.text}; /* ✅ Dinamik Renk */
  margin-bottom: 20px;
  transition: color 0.3s ease-in-out;

  @media (max-width: 968px) {
    font-size: 22px;
  }
`;

// 📌 **Input Kutusu**
export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.inputBackground};
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border}; /* ✅ Daha belirgin renk */
  margin-bottom: 15px;
  transition: all 0.3s ease-in-out;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);

  &:focus-within {
    border-color: ${({ theme }) => theme.primary}; /* ✅ Mavi veya Mor tonlarında görünmesi için */
    box-shadow: 0 0 8px ${({ theme }) => theme.primary}; /* ✅ Daha net bir etki */
  }
`;


// 📌 **Input Simgesi**
export const Icon = styled.div`
  margin-right: 12px;
  color: ${({ theme }) => theme.text};
  font-size: 18px;
`;

// 📌 **Input Alanı**
export const InputField = styled.input`
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font-size: 16px;
  color: ${({ theme }) => theme.inputText}; /* ✅ Dinamik Renk */
  transition: color 0.3s ease-in-out;

  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
  }
`;

// 📌 **Buton (Giriş / Kayıt)**
export const Button = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  padding: 14px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 0.3s ease-in-out, transform 0.2s;

  &:hover {
    background: ${({ theme }) => theme.buttonHover};
    transform: scale(1.05);
  }

  &:disabled {
    background: ${({ theme }) => theme.primaryHover};
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

// 📌 **Tema Renkleri ile Geçiş Yapabilen Yazı**
export const SwitchText = styled.p`
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.text};

  a {
    color: ${({ theme }) => theme.primary};
    font-weight: bold;
    cursor: pointer;
    font-size: 14px;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

// 📌 **Hata Mesajı**
export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
`;

// 📌 **Yüklenme Animasyonu**
export const LoadingSpinner = styled.div`
  border: 4px solid ${({ theme }) => theme.loadingBackground};
  border-top: 4px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// 📌 **Görsel Alanı**
export const AuthImage = styled.img`
  width: 50%;
  height: auto;
  object-fit: cover;
  transition: transform 0.3s;

  @media (max-width: 968px) {
    width: 100%;
    height: 220px;
  }
`;
