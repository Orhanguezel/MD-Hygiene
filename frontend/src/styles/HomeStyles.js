import styled from "styled-components";

// Styled Components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
`;



const Content = styled.div`
  text-align: center;
  max-width: 500px;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 12px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.p`
  margin-top: 20px;
  color: green;
  font-weight: bold;
`;

export { Container, Content, Form, Input, Button, Message };

