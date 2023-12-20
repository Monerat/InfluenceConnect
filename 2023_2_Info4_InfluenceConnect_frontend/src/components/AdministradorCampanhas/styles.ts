import styled from "styled-components";
import { Dark, Light } from "../../GlobalStyle";

export const Input = styled.input<{ $darkMode: boolean }>`
  background-color: ${(props) => (props.$darkMode ? Dark : Light)};
  color: ${(props) => (props.$darkMode ? Light : Dark)};
  padding: 8px;
  border: none;
  border-radius: 4px;
  margin-right: 8px;
  width: 60%;
  height: 30px;
`;

export const Button = styled.button<{ $darkMode: boolean }>`
  color: ${(props) => (props.$darkMode ? Dark: Light)};
  background: transparent;
  border: none;
  cursor: pointer;
  margin-right: 15px;
`;

export const CampanhasContent = styled.div`
  max-width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  background-attachment: fixed;
  background-image: linear-gradient(45deg, #6d22f5, #da2fbe, #e94c50, #f8d347);
`;

export const CampanhasContainer = styled.div`
  margin: 10px;
  max-width: 80%;
  min-width: 70%;
`;

export const Titulo = styled.div<{
  $darkMode: boolean;
  $fontSizeLabel: string;
}>`
  color: ${(props) => (props.$darkMode ? Dark: Light)};
  font-size: ${(props) => props.$fontSizeLabel};
  margin-bottom: 15px;
  font-weight: 900;

  @media (max-width: 768px) {
    font-size: calc(${(props) => props.$fontSizeLabel} - 2rem);
  }

  @media (max-width: 480px) {
    font-size: calc(${(props) => props.$fontSizeLabel} - 3rem);
    text-align: center;
  }
`;

export const ContainerSearch = styled.div`
  background-color: transparent;
  border: none;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 15px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const AdicionarNovoButton = styled.button<{ $darkMode: boolean }>`
  color: ${(props) => (props.$darkMode ? Dark: Light)};
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 15px;
  background-color: transparent;
  border: transparent;
  cursor: pointer;
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

export const Cards = styled.div<{ $darkMode: boolean }>`
  background-color: ${(props) => (props.$darkMode ? Dark : Light)};
  width: calc(50% - 20px);
  margin-bottom: 20px;
  border-radius: 8px;
  padding: 20px;
  &:nth-child(3n) {
    margin-right: 0;
  }

  @media (max-width: 768px) {
    width: calc(100%);

    &:nth-child(2n) {
      margin-right: 0;
    }
  }
`;

export const EmpresaCampanha = styled.div<{
  $darkMode: boolean;
  $fontSizeLabel: string;
}>`
  color: ${(props) => (props.$darkMode ? Light : Dark)};
  font-size: ${(props) => props.$fontSizeLabel};
  text-align: center;
`;

export const Informacao = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const CampanhasInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CampanhaFoto = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CampanhaFotoImg = styled.img<{ $inativo : boolean }>`
  width: 80%;
  aspect-ratio: 3/2;
  object-fit: contain;
  filter: ${props => props.$inativo ? 'none' : 'grayscale(100%)'};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CampanhasInfo = styled.div<{
  $darkMode: boolean;
  $fontSizeLabel: string;
}>`
  color: ${(props) => (props.$darkMode ? Light : Dark)};
  font-size: ${(props) => props.$fontSizeLabel};
  margin-bottom: 10px;
`;

export const CampanhaDetalhesButton = styled.button<{
  $darkMode: boolean;
  $fontSizeLabel: string;
}>`
  color: ${(props) => (props.$darkMode ? Light : Dark)};
  font-size: ${(props) => props.$fontSizeLabel};
  width: 100%;
  padding: 8px 16px;
  margin-top: 15px;
  background-color: transparent;
  border: 2px solid ${(props) => (props.$darkMode ? Dark : Light )};
  border-radius: 4px;
  cursor: pointer;
`;

export const ContainerInput = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    display: flex;
  }
`;
