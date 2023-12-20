import { styled } from "styled-components";
import { Dark, Light } from "../../GlobalStyle";

export const AdicionarNovoButton = styled.button<{ $darkMode: boolean }>`

  background-color: ${(props) => (props.$darkMode ? Dark : Light)};
  color: ${(props) => (props.$darkMode ? Light : Dark)};
  padding: 8px 16px;
  margin-top: 15px;
  margin-bottom: 15px;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  border-image: linear-gradient(45deg, #6d22f5, #da2fbe, #e94c50, #f8d347);
  border-image-slice: 1;
`;