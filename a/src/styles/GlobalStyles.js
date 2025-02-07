import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    margin: 0;
    padding: 0;
    transition: all 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    margin: 10px 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.border};
  }

  button {
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    transition: 0.3s;
  }
`;
