import styled from "styled-components";


// Sayfanın genel düzeni
export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

// Ortak kullanılan butonlar
export const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  background: #4f46e5;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: background 0.3s;

  &:hover {
    background: #4338ca;
  }
`;

// Input alanları
export const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

// Form tasarımı
export const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: white;
`;
