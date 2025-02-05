import styled from "styled-components";

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f8f9fa;
  padding: 20px;
`;

export const NotFoundTitle = styled.h1`
  font-size: 48px;
  color: #dc3545;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const NotFoundMessage = styled.p`
  font-size: 18px;
  color: #6c757d;
  margin-bottom: 20px;
`;

export const HomeButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
