import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: ${({ theme }) => theme.background}; 
    transition: background-color 0.3s ease;
    overflow-x: hidden;
    line-height: 1.6;
  }

  /* ✅ Başlık Stilleri (Renk Override Edilmedi) */
  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    text-align: center;
    margin: 20px 0 10px;
  }

  h1 { font-size: 2.4rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.75rem; }
  h4 { font-size: 1.5rem; }
  h5 { font-size: 1.25rem; }
  h6 { font-size: 1.1rem; }

  /* ✅ Genel Sayfa Yapısı */
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    padding: 20px;
  }

  /* ✅ Buton Stilleri (RENKLERİ OVERRIDE ETME!) */
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    transition: background 0.3s ease, transform 0.2s ease;
  }

  button:hover {
    transform: scale(1.05);
  }

  button:disabled {
    cursor: not-allowed;
  }

  /* ✅ Linkler */
  a {
    text-decoration: none;
    transition: color 0.3s ease;
    font-weight: 500;
  }

  /* ✅ Formlar */
  input, textarea {
    padding: 10px;
    border-radius: 6px;
    font-size: 1rem;
    transition: border 0.3s ease, box-shadow 0.2s ease;
  }

  input:focus, textarea:focus {
    outline: none;
  }

  /* ✅ Placeholder */
  ::placeholder {
    opacity: 0.7;
  }
  
  /* ✅ Kartlar ve Genel Alanlar */
  .card {
    border-radius: 8px;
    padding: 15px;
    transition: all 0.3s ease;
  }

  .card:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  }
    h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.text};  /* ✅ Tema rengine bağlı */
    font-weight: bold;
    text-align: center;
    margin: 20px 0 10px;
  }
  
  p, span, label {
    color: ${({ theme }) => theme.text};  /* ✅ Paragraflar da temaya bağlı */
  }
`;
