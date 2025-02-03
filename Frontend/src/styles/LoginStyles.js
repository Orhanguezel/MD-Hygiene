import styled from "styled-components";
import { FormWrapper } from "./GlobalStyles"; // Ortak stilleri çağırıyoruz

export const LoginContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  align-items: center;
  place-items: center;
`;

// Form kutusu için ortak `FormWrapper` bileşenini kullanıyoruz
export const LoginForm = styled(FormWrapper)`
  text-align: center;
`;

export const LoginImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
`;
