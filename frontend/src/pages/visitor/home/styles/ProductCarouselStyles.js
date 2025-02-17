import styled from "styled-components";
import { motion } from "framer-motion"; // ✅ Animasyon için Framer Motion

// 📌 Carousel Konteyneri
export const CarouselContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  text-align: center;
  position: relative;
  color: ${({ theme }) => theme.text};
  width: 100%;  /* ✅ Alanı tamamen sınırla */
  max-width: 100vw; /* ✅ Görüntü genişliğini aşmasını önle */
  overflow: hidden; /* ✅ Taşmayı önle */
`;


// 📌 Carousel Wrapper
export const CarouselWrapper = styled.div`
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  position: relative;
  border-radius: 12px;
`;

// 📌 Otomatik kayan içerik
export const CarouselInner = styled(motion.div)`
  display: flex;
  gap: 15px;
  min-width: 100%;
`;

// 📌 Ürün Kartı
export const ProductCard = styled.div`
  min-width: 220px;
  flex: 0 0 auto;
  background: ${({ theme }) => theme.cardBackground};
  padding: 16px;
  margin: 8px;
  box-shadow: 0 4px 8px ${({ theme }) => theme.shadow};
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  border-radius: 12px;
  scroll-snap-align: start;
  position: relative;
  text-align: center;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px ${({ theme }) => theme.shadow};
  }
`;

// 📌 Ürün Görseli
export const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;

  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

// 📌 Ürün Başlığı
export const ProductTitle = styled.h3`
  font-size: 1.1rem;
  margin: 12px 0;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
`;

// 📌 Ürün Fiyatı
export const ProductPrice = styled.p`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  font-size: 1.1rem;
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
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;
  margin-top: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
    transform: scale(1.07);
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
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;
  margin-top: 8px;

  &:hover {
    background-color: #e68900;
    transform: scale(1.07);
  }
`;

// 📌 Favori Butonu (Kırmızı kalp için)
export const FavoriteIcon = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 24px;
  cursor: pointer;
  color: ${({ $favorited }) => ($favorited ? "red" : "gray")};
  transition: color 0.3s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    color: ${({ $favorited }) => ($favorited ? "darkred" : "black")};
    transform: scale(1.2);
  }
`;

// 📌 Ürün Etiketi (Yeni Ürün vs.)
export const ProductLabel = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
`;

// 📌 Navigasyon Butonları (Sol & Sağ)
export const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }

  ${({ left }) => left && "left: 15px;"}
  ${({ right }) => right && "right: 15px;"}
`;
