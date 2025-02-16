import styled from "styled-components";
import { motion } from "framer-motion"; // ✅ Animasyon için Framer Motion

// 📌 Carousel Konteyneri
export const CarouselContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  text-align: center;
  overflow: hidden;
  position: relative;
  color: ${({ theme }) => theme.text};
`;

// 📌 Carousel Wrapper
export const CarouselWrapper = styled.div`
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`;

// 📌 Otomatik kayan içerik
export const CarouselInner = styled(motion.div)`
  display: flex;
  gap: 15px;
  min-width: 100%;
`;

// 📌 Ürün Kartı
export const ProductCard = styled.div`
  min-width: 200px;
  flex: 0 0 auto;
  background: ${({ theme }) => theme.cardBackground};
  padding: 12px;
  margin: 5px;
  box-shadow: 0 2px 2px ${({ theme }) => theme.shadow};
  transition: transform 0.3s ease;
  scroll-snap-align: start;
  position: relative;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
  }
`;

// 📌 Ürün Görseli
export const ProductImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 6px;
`;

// 📌 Ürün Başlığı
export const ProductTitle = styled.h3`
  font-size: 1rem;
  margin: 10px 0;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
`;

// 📌 Ürün Fiyatı
export const ProductPrice = styled.p`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  font-size: 1rem;
`;

// 📌 Stok Durumu
export const StockStatus = styled.p`
  color: ${({ theme }) => (theme.name === "light" ? "#008000" : "#90EE90")};
  font-weight: bold;
  font-size: 0.9rem;
`;

// 📌 Sepete Ekle Butonu
export const AddToCartButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;
  margin-top: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
    transform: scale(1.05);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.disabled};
    cursor: not-allowed;
  }
`;

// 📌 Şimdi Satın Al Butonu
export const BuyNowButton = styled.button`
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;
  margin-top: 5px;

  &:hover {
    background-color: #e68900;
    transform: scale(1.05);
  }
`;

// 📌 Favori Butonu
export const FavoriteIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  color: ${({ $favorited }) => ($favorited ? "red" : "gray")};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ $favorited }) => ($favorited ? "darkred" : "black")};
  }
`;

// 📌 Ürün Etiketi (Yeni Ürün vs.)
export const ProductLabel = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
`;

// 📌 Navigasyon Butonları (Sol & Sağ)
export const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 18px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  ${({ left }) => left && "left: 10px;"}
  ${({ right }) => right && "right: 10px;"}
`;
