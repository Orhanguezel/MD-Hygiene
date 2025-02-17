import styled from "styled-components";
import { motion } from "framer-motion";

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
    flex-wrap: nowrap;
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
  border-radius: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 6px 12px ${({ theme }) => theme.shadow};
  transition: background 0.3s ease, transform 0.3s ease;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
    transform: scale(1.1);
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
  width: 90%;
  height: 170px;
  object-fit: contain;
  border-radius: 10px;
  transition: transform 0.3s ease;

  ${CategoryCard}:hover & {
    transform: scale(1.15);
  }
`;

// 📌 Kategori Başlığı
export const CategoryTitle = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  text-transform: capitalize;
  transition: color 0.3s ease;

  ${CategoryCard}:hover & {
    color: ${({ theme }) => theme.buttonText};
  }
`;
