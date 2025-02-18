import styled from "styled-components";

// 📌 Fiyat Kutusu
export const PriceTag = styled.div`
  background-color: #ffcc00;
  color: #000;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 12px 20px;
  border-radius: 8px;
  text-align: center;
  display: inline-block;
  margin-top: 10px;
`;

// 📌 Buton Alanı
export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

// 📌 Butonlar
export const CTAButton = styled.button`
  background-color: ${({ theme, variant }) =>
    variant === "primary" ? theme.primary : theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: ${({ theme, variant }) =>
      variant === "primary" ? theme.primaryHover : theme.buttonHover};
    transform: scale(1.05);
  }
`;

export const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

// 📌 Ana Container
export const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 50px 20px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    text-align: center;
  }
`;

// 📌 Ürün Açıklama Alanı
export const HeroContent = styled.div`
  flex: 1;
  max-width: 450px;

  h2 {
    font-size: 2rem;
    color: ${({ theme }) => theme.primary};
    margin-bottom: 15px;
  }

  p {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.text};
  }
`;

// 📌 Ürün Resmi Alanı
export const HeroImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
    max-height: 600px;
    object-fit: contain;
    border-radius: 10px;
    transition: transform 0.6s ease-in-out;

    &:hover {
      transform: scale(1.05); /* ✅ Daha yumuşak büyüme efekti */
    }
  }
`;