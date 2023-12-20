import styled from "styled-components";
import { Dark, Light, subDark, subLight } from "../../GlobalStyle";

export const Border = styled.div<{
  $fontSizeButton: string;
  $darkMode: boolean;
}>`
  width: 150px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 3px 3px 10px #000000d9;
  border-radius: 4px;
  background: linear-gradient(105deg, #da2fbe, #e9a64c);
  transition: 0.3s;

  &:hover {
    transform: translateY(-10px);
  }

  &:active {
    transform: none;
  }

  button {
    font-size: ${(props) => props.$fontSizeButton};
    background: ${(props) => (props.$darkMode ? subDark : subLight)};
    color: ${(props) => (props.$darkMode ? Light : Dark)};
    width: 146px;
    height: 46px;
    border-radius: 4px;
    border: none;
    overflow: hidden;
    cursor: pointer;
  }
`;
