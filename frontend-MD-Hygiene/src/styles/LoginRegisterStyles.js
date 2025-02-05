import styled from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #4f46e5, #9333ea);
  padding: 20px;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-direction: column;

  @media (max-width: 968px) {
    gap: 8px;
  }
`;

export const LogoImage = styled.img`
  height: 120px;

  @media (max-width: 968px) {
    height: 70px;
  }
`;

export const SiteTitle = styled.h1`
  color: white;
  font-size: 48px;
  font-weight: bold;
  text-align: center;

  @media (max-width: 968px) {
    font-size: 28px;
  }
`;

export const Card = styled.div`
  display: flex;
  max-width: 1100px;
  width: 90%;
  background: white;
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

export const AuthImage = styled.img`
  width: 50%;
  height: auto;
  object-fit: cover;

  @media (max-width: 968px) {
    width: 100%;
    height: 220px;
  }
`;

export const AuthForm = styled.div`
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
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 968px) {
    font-size: 20px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
  width: 100%;
  transition: 0.3s ease-in-out;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);

  &:focus-within {
    border-color: #4f46e5;
    box-shadow: 0 0 8px rgba(79, 70, 229, 0.3);
  }
`;

export const Icon = styled.div`
  margin-right: 12px;
  color: #6b7280;
  font-size: 18px;
`;

export const InputField = styled.input`
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font-size: 16px;
  color: #333;

  &::placeholder {
    color: #999;
  }
`;

export const Button = styled.button`
  width: 100%;
  background: #4f46e5;
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
    background: #4338ca;
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
  color: #374151;

  button {
    background: none;
    border: none;
    color: #4f46e5;
    font-weight: bold;
    cursor: pointer;
    font-size: 14px;
  }

  button:hover {
    text-decoration: underline;
  }
`;
