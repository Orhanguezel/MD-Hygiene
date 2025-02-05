import styled from "styled-components";

export const ProfileContainer = styled.div`
  margin-top: 100px;
  padding: 20px;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #4f46e5, #9333ea);
`;

export const ProfileCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
`;

export const AvatarContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const AvatarImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid #4f46e5;
`;

export const UploadButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4f46e5;
  color: white;
  border-radius: 6px;
  padding: 8px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 14px;

  input {
    display: none;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
`;

export const Button = styled.button`
  background: #4f46e5;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #4338ca;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

export const SuccessMessage = styled.p`
  color: green;
  font-size: 14px;
`;
