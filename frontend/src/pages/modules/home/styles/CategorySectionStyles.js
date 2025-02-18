import styled from "styled-components";
import { motion } from "framer-motion";

// 📌 Kategori Başlığı
export const CategoryHeader = styled.h2`
  width: 90%;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
`;

// 📌 Kategori Konteyneri (Ana Bölüm)
export const CategoryContainer = styled(motion.div)`
  display: flex;
  gap: 20px;
  padding: 30px;
  justify-content: center;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.background};
  border-radius: 12px;
  box-shadow: 0 6px 12px ${({ theme }) => theme.shadow};

  @media (max-width: 768px) {
    overflow-x: auto;
    padding: 15px;
  }
`;

// 📌 Kategori Kartı
export const CategoryCard = styled(motion.div)`
  padding: 20px;
  width: 300px;
  height: 250px;
  background: ${({ theme, $active }) => ($active ? theme.primary : theme.cardBackground)};
  color: ${({ theme, $active }) => ($active ? theme.buttonText : theme.text)};
  cursor: pointer;
  border-radius: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 8px 16px ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
    transform: scale(1.08);
  }

  ${({ $active }) =>
    $active &&
    `
    transform: scale(1.12);
    border: 4px solid rgba(255, 255, 255, 0.9);
  `}

  @media (max-width: 768px) {
    width: 140px;
    height: 180px;
  }
`;

// 📌 Kategori Görseli
export const CategoryImage = styled.img`
  width: 85%;
  height: 160px;
  object-fit: contain;
  border-radius: 10px;
  transition: transform 0.3s ease;

  ${CategoryCard}:hover & {
    transform: scale(1.1);
  }
`;

// 📌 Kategori Başlığı
export const CategoryTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  text-transform: capitalize;
  transition: color 0.3s ease;

  ${CategoryCard}:hover & {
    color: ${({ theme }) => theme.buttonText};
  }
`;


