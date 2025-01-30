import styled from "styled-components";

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: var(--background-color);
  color: var(--text-color);
  padding: var(--padding);
`;

export const NotFoundTitle = styled.h1`
  font-size: var(--h1-font-size);
  color: var(--primary-color);
  margin-bottom: var(--margin);

  @media (max-width: 768px) {
    font-size: calc(var(--h1-font-size) - 1rem);
  }

  @media (max-width: 480px) {
    font-size: calc(var(--h1-font-size) - 1.5rem);
  }
`;

export const NotFoundMessage = styled.p`
  font-size: var(--h3-font-size);
  color: var(--text-color);

  @media (max-width: 768px) {
    font-size: calc(var(--h3-font-size) - 0.2rem);
  }

  @media (max-width: 480px) {
    font-size: calc(var(--h3-font-size) - 0.4rem);
  }
`;
