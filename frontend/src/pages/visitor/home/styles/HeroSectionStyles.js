import styled from "styled-components";

export const CarouselContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  padding-top: 50px;

  @media (max-width: 768px) {
    flex-direction: column-reverse; 
    padding-top: 20px;
  }
`;

export const CarouselInfo = styled.div`
  width: 50%;
  background-color: ${({ theme }) => theme.cardBackground}; /* ✅ Tema desteği */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.primary};
  }

  p {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.text};
    margin: 10px 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

export const Slide = styled.div`
  position: relative;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const SlideContent = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: ${({ theme }) => theme.overlay}; /* ✅ Tema desteği */
  color: ${({ theme }) => theme.text};
  padding: 10px;
  border-radius: 8px;
`;

export const CarouselNavButton = styled.button`
  position: absolute;
  top: 50%;
  ${({ $left }) => ($left ? "left: 10px;" : "right: 10px;")}
  transform: translateY(-50%);
  background: ${({ theme }) => theme.buttonBackground}; /* ✅ Tema desteği */
  color: ${({ theme }) => theme.buttonText};
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
  z-index: 2;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;
