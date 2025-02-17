import styled from "styled-components";
// 📌 Carousel Konteyneri
export const CarouselContainer = styled.div`
  display: flex;
  flex-direction: row; /* ✅ Büyük ekranlarda soldan sağa düzen */
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.backgroundGradient};
  padding: 50px 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 12px;
  gap: 20px; /* ✅ Alan düzeni için boşluk ekleme */

  @media (max-width: 1024px) {
    flex-direction: column-reverse; /* ✅ Küçük ekranlarda alt alta */
    padding-top: 20px;
  }
`;

// 📌 Carousel Bilgi Alanı
export const CarouselInfo = styled.div`
  width: 50%;
  max-width: 500px;
  background-color: ${({ theme }) => theme.cardBackground}; 
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-radius: 12px;
  min-height: 250px; /* ✅ Boyut atlamalarını engelle */

  h2 {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.primary};
  }

  p {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.text};
    margin: 10px 0;
  }

  @media (max-width: 1024px) {
    width: 100%;
    text-align: center;
  }
`;

// 📌 Resim Alanı
export const Slide = styled.div`
  position: relative;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  max-width: 700px;
  min-height: 450px; /* ✅ Boyut değişimlerini engelle */
  cursor: pointer;

  &:hover img {
    transform: scale(1.03);
    transition: transform 0.3s ease;
  }

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 100%;
    min-height: 350px;
  }
`;



// 📌 Resim
export const SlideImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px; /* ✅ Hafif yuvarlatma */
`;



// 📌 Sepete Ekle & Satın Al Butonları Alanı
export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;


// 📌 Önceki & Sonraki Butonları (Sol & Sağ)
export const CarouselNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $left }) => ($left ? "left: 10px;" : "right: 10px;")} 
  background: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  padding: 12px;
  cursor: pointer;
  font-size: 12px;
  z-index: 10; 
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: 1024px) {
    width: 45px;
    height: 45px;
    font-size: 10px;
    ${({ $left }) => ($left ? "left: 5px;" : "right: 5px;")} /* ✅ Mobilde daha uygun */
  }
`;


export const Button = styled.button`
  background-color: ${({ theme, variant }) =>
    variant === "warning" ? theme.warning : theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: ${({ theme, variant }) =>
      variant === "warning" ? theme.warningHover : theme.buttonHover};
    transform: scale(1.05);
  }



`;export const PriceBox = styled.div`
background-color: #ff0000; /* 🔴 Kırmızı arka plan */
color: #ffffff; /* ⚪ Beyaz yazı */
font-size: 1.4rem;
font-weight: bold;
padding: 12px 20px;
border-radius: 8px;
display: inline-block;
text-align: center;
min-width: 130px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
border: 2px solid #cc0000; /* 🔴 Biraz daha koyu kenarlık */
transition: all 0.3s ease-in-out;

&:hover {
  background-color: #cc0000; /* 🔴 Hover olduğunda daha koyu kırmızı */
  transform: scale(1.05);
}
`;
