import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    background-color: var(--background);
    color: black;
    transition: background-color 0.3s ease, color 0.3s ease;
    overflow-x: hidden;  /* ✅ Sadece body'ye */
  }

  h1, h2, h3 {
    font-weight: bold;
    margin: 20px 0;
    text-align: center;
  }

  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.25rem; }
  p { font-size: 1rem; }
  span { font-size: 0.9rem; }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    width: 100%;  /* ✅ Düzeltildi */
    padding: 0;
    margin: 0;
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
