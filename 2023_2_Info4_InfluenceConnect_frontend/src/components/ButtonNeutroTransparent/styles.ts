import { styled } from "styled-components";
import { Dark, Light } from "../../GlobalStyle";

export const AdicionarNovoButton = styled.button <{ $darkMode: boolean }>`
  
  color: ${props => props.$darkMode ? Dark : Light};
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: transparent;
  border: transparent;
  cursor: pointer;
`;