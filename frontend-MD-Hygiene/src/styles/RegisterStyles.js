import styled from "styled-components";

export const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #4f46e5, #9333ea);
  padding: 20px;
`;

export const RegisterImage = styled.img`
  width: 50%;
  max-width: 500px;
  height: auto;
  border-radius: 10px;
`;

export const RegisterForm = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 20px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f3f4f6;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 15px;
  width: 100%;
`;

export const Icon = styled.div`
  margin-right: 10px;
  font-size: 18px;
  color: #6b7280;
`;

export const InputField = styled.input`
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font-size: 16px;
`;

export const Button = styled.button`
  width: 100%;
  background: #4f46e5;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: #4338ca;
  }

  &:disabled {
    background: #a5b4fc;
    cursor: not-allowed;
  }
`;

export const LoginText = styled.p`
  margin-top: 15px;
  font-size: 14px;
  color: #374151;

  a {
    color: #4f46e5;
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    text-decoration: underline;
  }
`;
