import styled from "styled-components";

export const CarouselContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: var(--background-color);
  padding-top: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding-top: 20px;
  }
`;

export const CarouselInfo = styled.div`
  width: 50%;
  background-color: var(--green2-color);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    font-size: 1.6rem;
    color: var(--primary-color);
  }

  p {
    font-size: 1.1rem;
    color: var(--text2-color);
    margin: 10px 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

export const CarouselButton = styled.a`
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background-color: var(--highlight-color);
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
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 8px;
`;

export const CarouselNavButton = styled.button`
  position: absolute;
  top: 50%;
  ${({ left }) => (left ? "left: 10px;" : "right: 10px;")}
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  transform: translateY(-50%);
  z-index: 1;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;
