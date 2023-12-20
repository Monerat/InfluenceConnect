import { styled } from "styled-components";
import { Dark, Light } from "../../GlobalStyle";

export const Input = styled.input<{ $darkMode: boolean }>`
  padding: 8px;
  border-radius: 4px;
  margin-right: 8px;
  width: 60%;
  color: ${(props) => (props.$darkMode ? Light : Dark)};
  background-color: ${(props) => (props.$darkMode ? Dark : Light)};
  border: 1px solid ${(props) => (props.$darkMode ? Light : Dark)};

  @media (max-width: 740px) {
    width: 100%;
  }
`;

export const Button = styled.button<{ $darkMode: boolean }>`
  color: ${(props) => (props.$darkMode ? Light : Dark)};
  background: transparent;
  border: none;
  cursor: pointer;
  margin-right: 15px;
`;

export const ContainerInput = styled.div`
width: 100%;
display: flex;
align-items: center;
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
@media (max-width: 768px) {
  display: flex;
  
}
`;