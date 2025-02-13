import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  /* ✅ Genel Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  /* ✅ Tema Desteği */
  body {
    font-family: 'Poppins', sans-serif;
    background-color: ${({ theme }) => theme.background}; 
    color: ${({ theme }) => theme.text};  
    transition: background-color 0.3s ease, color 0.3s ease;
    overflow-x: hidden;
    line-height: 1.6;
  }

  /* ✅ Başlık Stilleri */
  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    text-align: center;
    color: ${({ theme }) => theme.heading};
    margin: 20px 0 10px;
  }

  h1 { font-size: 2.4rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.75rem; }
  h4 { font-size: 1.5rem; }
  h5 { font-size: 1.25rem; }
  h6 { font-size: 1.1rem; }

  /* ✅ Paragraf ve Metin Stili */
  p, span, label {
    font-size: 1rem;
    color: ${({ theme }) => theme.text};
  }

  small {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.subText};
  }

  /* ✅ Genel Sayfa Yapısı */
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    padding: 20px;
    background: ${({ theme }) => theme.background};
  }

  /* ✅ Buton Stilleri */
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.buttonText};
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    transition: background 0.3s ease, transform 0.2s ease;
  }

  button:hover {
    background-color: ${({ theme }) => theme.primaryHover};
    transform: scale(1.05);
  }

  button:disabled {
    background-color: ${({ theme }) => theme.disabled};
    cursor: not-allowed;
  }

  /* ✅ Linkler */
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.link};
    transition: color 0.3s ease;
    font-weight: 500;
  }

  a:hover {
    color: ${({ theme }) => theme.linkHover};
  }

  /* ✅ Formlar */
  input, textarea {
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 6px;
    background: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.inputText};
    font-size: 1rem;
    transition: border 0.3s ease, box-shadow 0.2s ease;
  }

  input:focus, textarea:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 5px ${({ theme }) => theme.primaryHover};
    outline: none;
  }

  /* ✅ Placeholder */
  ::placeholder {
    color: ${({ theme }) => theme.placeholderText};
  }
  
  /* ✅ Kartlar ve Genel Alanlar */
  .card {
    background: ${({ theme }) => theme.cardBackground};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 4px 6px ${({ theme }) => theme.shadow};
    transition: all 0.3s ease;
  }

  .card:hover {
    box-shadow: 0 6px 10px ${({ theme }) => theme.shadow};
  }
`;
