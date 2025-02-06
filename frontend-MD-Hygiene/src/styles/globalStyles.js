import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }

  h1, h2, h3 {
    font-weight: bold;
    margin: 20px 0;
    text-align: center;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  main {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.primary};
    color: #fff;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  button:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;
