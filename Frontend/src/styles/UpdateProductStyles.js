import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

export const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
`;

export const ModalPanel = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
  color: #444;
`;

export const Input = styled.input`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Textarea = styled.textarea`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
`;

export const Button = styled.button`
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  transition: background 0.2s ease-in-out;

  ${({ variant }) =>
    variant === "primary"
      ? `background: #2563eb; color: white; &:hover { background: #1e40af; }`
      : `background: white; border: 1px solid #ccc; color: #444; &:hover { background: #f3f4f6; }`}
`;
