import styled from 'styled-components';
import backgroundImage from '../../assets/img/BackgroundImage/Background_Marcas.png';

import { Dark, Light } from "../../GlobalStyle";


export const MarcasContent = styled.div`
  background-image: url(${backgroundImage});
  max-width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  background-attachment: fixed;
`;

export const MarcasContainer = styled.div`
  margin: 10px;
  min-width: 70%;
  max-width: 80%;
`;

export const ContainerTopo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row; 
  margin-bottom: 30px;
  padding-top: 30px;

  @media (max-width: 768px) {
    flex-direction: column; 
    align-items: center; 
    & > * {
      margin-bottom: 10px; 
    }
  }
`;

export const Titulo = styled.div<{ $darkMode: boolean, $fontSizeLabel: string }>`
  color: ${props => props.$darkMode ? Dark : Light };
  font-size: ${props => props.$fontSizeLabel};
  margin-bottom: 15px;
  font-weight: 999;



  @media (max-width: 768px) {
    text-align: center;
  }

`;

export const ContainerFuncao = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 20px;
  background-color: transparent;
  border: none;
  width: 80%;

  @media (max-width: 768px) {
    flex-direction: column; 
    align-items: center; 
    & > * {
      margin-bottom: 10px; 
    }
  }
`;

export const ContainerSearch = styled.div`
  background-color: transparent;
  border: none;
  width: 80%;
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    justify-content: center;
    width : 100%;
    & > * {
      margin-bottom: 10px; 
    }
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

export const Cards = styled.div<{ $darkMode: boolean}>`
  background-color: ${props => props.$darkMode ? Dark : Light};
  width: calc(30% - 20px);
  margin-bottom: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
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

export const MarcasFoto = styled.div< {$inativo : boolean}>`

  filter: ${props => props.$inativo ? 'none' : 'grayscale(100%)'};
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MarcasFotoImg = styled.img`
  width: 80%;
  aspect-ratio: 3/2;
  object-fit: contain;
`;

export const Informacao = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MarcasNome = styled.div <{ $darkMode: boolean, $fontSizeLabel: string }>`
  color: ${props => props.$darkMode ? Light : Dark};
  font-size: calc(${props => props.$fontSizeLabel}*1.1);
  text-transform: lowercase;
  margin-bottom: 10px;
  &::first-letter {
    text-transform: uppercase;
  }
`;

export const MarcasSegmento = styled.div<{
  $darkMode: boolean;
  $fontSizeLabel: string;
}>`
  color: ${(props) => (props.$darkMode ? Light : Dark)};
  font-size: calc(${props => props.$fontSizeLabel}*1.1);
  margin-bottom: 10px;
  text-transform: capitalize;
`;

export const Negritos = styled.span`
  font-weight: bold;
`;

export const MarcaDetalhesButton = styled.button<{ $darkMode: boolean, $fontSizeLabel: string }>`
color: ${props => props.$darkMode ? Light : Dark};
font-size: calc(${props => props.$fontSizeLabel}*1.1) ;
  width: 100%;
  padding: 8px 16px;
  margin-top: 15px;
  background-color: transparent;
  border: 2px solid ${props => props.$darkMode ? Light : Dark};
  border-radius: 4px;
  cursor: pointer;
`;
