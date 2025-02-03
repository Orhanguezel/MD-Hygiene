import styled from "styled-components";
import { FormWrapper} from "./GlobalStyles"; // Ortak stiller

export const RegisterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  align-items: center;
  place-items: center;
`;

export const RegisterForm = styled(FormWrapper)`
  text-align: center;
`;

export const RegisterImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: 10px;
`;
