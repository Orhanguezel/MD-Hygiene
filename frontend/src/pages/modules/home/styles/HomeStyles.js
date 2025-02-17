import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.background}; /* ✅ Tema desteği */
  color: ${({ theme }) => theme.text};
  width: 100%;
`;
