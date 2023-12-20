import styled from "styled-components";
import backgroundImage from "../../assets/imagens/backgroundHome.png";

import { Dark, Light } from "../../GlobalStyle";

export const ContainerInput = styled.div`
width: 100%;
@media (max-width: 768px) {
  display: flex;
}
`;

export const Input = styled.input<{ $darkMode: boolean }>`
  padding: 8px;
  border-radius: 4px;
  margin-right: 8px;
  width: 60%;
  color: ${(props) => (props.$darkMode ? Light : Dark)};
  background-color: ${(props) => (props.$darkMode ? Dark : Light)};
  border: 1px solid ${(props) => (props.$darkMode ? Dark : Light)};

  @media (max-width: 740px) {
    width: 100%;
  }
`;

export const Button = styled.button<{ $darkMode: boolean }>`
  color: ${(props) => (props.$darkMode ? Dark : Light)};
  background: transparent;
  border: none;
  cursor: pointer;
  margin-right: 15px;
`;

export const InfluenciadoresContent = styled.div`

  background-image: url(${backgroundImage});
  max-width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  background-attachment: fixed;

  .campos {
    display: flex;
    justify-content: space-between;
  }
`;

export const InfluenciadoresContainer = styled.div`
  min-width: 80%;
  padding: 30px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Titulo = styled.div<{
  $darkMode: boolean;
  $fontSizeLabel: string;
}>`
  color: ${(props) => (props.$darkMode ? Light : Dark)};
  font-size: ${(props) => props.$fontSizeLabel};
  margin-bottom: 15px;
`;

export const Border = styled.div<{
  $darkMode: boolean;
  $fontSizeLabel: string;
}>`
  width: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: linear-gradient(45deg, #6d22f5, #da2fbe, #e94c50, #f8d347);
  position: absolute;
  top: 32%;
  left: 63%;
  z-index: 1;

  select {
    background-color: #e94c50;
    color: ${(props) => (props.$darkMode ? Dark : Light)};
    width: 30%;
    padding: 4px;
    text-align: center;
    font-size: ${(props) => props.$fontSizeLabel};
    border-radius: 4px;
    border: none;
  }
`;

export const Filtros = styled.div<{
  $darkMode: boolean;
  $fontSizeSelection: string;
}>`
  background-color: ${(props) => (props.$darkMode ? Dark : Light)};
  color: ${(props) => (props.$darkMode ? Light : Dark)};
  font-size: ${(props) => props.$fontSizeSelection};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 20px;
  padding: 12px;
  margin: 4px;
  border-radius: 4px;
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

export const Cards = styled.div<{ $darkMode: boolean }>`
  background-color: ${(props) => (props.$darkMode ? Dark : Light)};
  width: calc(30% - 20px);
  margin-bottom: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  &:nth-child(3n) {
    margin-right: 0;
  }

  @media (max-width: 768px) {
    width: calc(50% - 20px);

    &:nth-child(2n) {
      margin-right: 0;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
    margin-right: 0;
  }
`;

export const InfluenciadorFoto = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100%;
`;

export const InfluenciadorFotoImg = styled.img< {$inativo : boolean}>`

  filter: ${props => props.$inativo ? 'none' : 'grayscale(100%)'};
  width: 11.625rem;
  height: 11.625rem;
  border-radius: 62.4375rem;
  object-fit: cover;
  object-position: center;
`;

export const Informacoes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .inativo {

    color: red;
    padding: 10px;
  }
`;

export const InfluenciadorNome = styled.div<{
  $darkMode: boolean;
  $fontSizeLabel: string;
}>`
  color: ${(props) => (props.$darkMode ? Light : Dark)};
  font-size: ${(props) => props.$fontSizeLabel};
  margin-bottom: 10px;
`;

export const InfluenciadorNicho = styled.div<{
  $darkMode: boolean;
  $fontSizeLabel: string;
}>`
  color: ${(props) => (props.$darkMode ? Light : Dark)};
  font-size: ${(props) => props.$fontSizeLabel};
  margin-bottom: 10px;
`;

export const InfluenciadorDescricao = styled.div`
  margin-bottom: 10px;
`;

export const InfluenciadorDetalhesButton = styled.button<{
  $darkMode: boolean;
  $fontSizeLabel: string;
}>`
  background-color: ${(props) => (props.$darkMode ? Dark : Light)};
  color: ${(props) => (props.$darkMode ? Light : Dark)};
  font-size: ${(props) => props.$fontSizeLabel};
  width: 100%;
  padding: 8px 16px;
  margin-top: 15px;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  border-image: linear-gradient(45deg, #6d22f5, #da2fbe, #e94c50, #f8d347);
  border-image-slice: 1;
`;


export const ContainerSearch = styled.div`
  display: flex;
  padding-bottom: 20px;
  gap: 20px;
  align-items: center;
  background-color: transparent;
  border: none;
  width: 100%;

  @media (max-width: 740px) {
    align-items: center;
    justify-content: center;
    flex-direction: column;

    input {
      width: 100%;
      margin-bottom: 10px;
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;

  @media (max-width: 740px) {
    width: 100%;
  }
`;

export const Negritos = styled.span`
  font-weight: bold;
`;

export const BackgroundImage = styled.img`

  width: 100%;
  min-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
`