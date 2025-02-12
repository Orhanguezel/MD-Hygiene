import styled from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;  
  width: 100vw;   
  background: linear-gradient(135deg, #4f46e5, #9333ea); 
  padding: 0;         
  margin: 0;
  overflow-X: hidden; 
`;


// ✅ Kart (Form Alanı)
export const Card = styled.div`
  display: flex;
  max-width: 1100px;
  width: 90%;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-height: 550px;

  @media (max-width: 1024px) {
    width: 95%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    min-height: auto;
  }
`;

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

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;

  @media (max-width: 968px) {
    font-size: 20px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.inputBackground};
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  margin-bottom: 15px;
  transition: 0.3s ease-in-out;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);

  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 8px ${({ theme }) => theme.primary};
  }
`;

export const Icon = styled.div`
  margin-right: 12px;
  color: ${({ theme }) => theme.text};
  font-size: 18px;
`;

export const InputField = styled.input`
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font-size: 16px;
  color: ${({ theme }) => theme.inputText};

  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
  }
`;

export const Button = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.3s ease-in-out, transform 0.2s;

  &:hover {
    background: ${({ theme }) => theme.buttonHover};
    transform: scale(1.03);
  }

  &:disabled {
    background: #a5b4fc;
    cursor: not-allowed;
  }

  @media (max-width: 968px) {
    padding: 10px;
    font-size: 15px;
  }
`;

export const SwitchText = styled.p`
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.text};

  button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.primary};
    font-weight: bold;
    cursor: pointer;
    font-size: 14px;
  }

  button:hover {
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
`;

export const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
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

export const AuthImage = styled.img`
  width: 50%;
  height: auto;
  object-fit: cover;

  @media (max-width: 968px) {
    width: 100%;
    height: 220px;
  }
`;