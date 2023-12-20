import styled from 'styled-components';
import { Dark, Light } from '../../GlobalStyle';

export const DetalhesContent = styled.div<{ $background?: string; }>`
  background-color: black;
  max-width: 100vw;
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-attachment: fixed;
  background-image: ${({ $background }) => ($background ? `url(${$background})` : 'none')};
`;

export const DetalhesContainer = styled.div`

  margin: 2vw;
`;

export const CardDetalhes = styled.div <{ $darkmode: boolean } >`

  background-color: white;
  width: 100%;
  background: ${props => props.$darkmode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
  border-radius: 10px;
  padding: 5px;
`;

export const EditarContainer = styled.div`
  width: 30%;
  
  display: flex;
  justify-content: flex-end;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const DetalhesEditar = styled.button <{ $darkmode: boolean } >`

  height: 50px;
  color:  ${props => props.$darkmode ? Light : Dark};
  background-color: transparent;
  border: transparent;
  cursor: pointer;
`;

export const Informacoes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  text-transform: capitalize;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const TopInfo = styled.div`
  width:100%;
  height: 2vw;
  display: flex;
  justify-content: flex-end;
`;

export const BottomInfo = styled.div`
  height: 2vw;
`;
export const Info = styled.div`
  width:100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
`;

export const DetalhesFotoContainer = styled.div`
  max-width: 15vw;
  

  @media screen and (max-width: 768px) {
    max-width: 25vw;
    margin-right: 0;
  }
`;

export const DetalhesFoto = styled.div <{ $darkmode: boolean } >`
  background-color: ${props => props.$darkmode ? 'transparent' : 'rgba(255, 255, 255, 0.7)'};
  
  border-radius: 10px;
`;

export const DetalhesFotoImg = styled.img`
  width: 100%;
  aspect-ratio: 3/2;
  object-fit: contain;
  height: auto;
`;

export const DetalhesInfoContainer = styled.div`
  max-width: 60%;
  @media screen and (max-width: 768px) {
    width: 45vw;
    margin-left: 0;
    text-align: left;
  }
`;

export const InformacoesContainer = styled.div <{ $darkmode: boolean, $fontSizeLabel: string } >`

  color: ${props => props.$darkmode ? Light : Dark};
  font-size: ${props => props.$fontSizeLabel};
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
  }
`;

export const ImagemPerfil = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; 
`;

export const VerMaisInfluencers = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const CardFeed = styled.div`
  width: 100%;
  background: transparent;
  padding: 25px;
  margin-top: 25px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FeedMarcas = styled.div`
  display: flex;
  justify-content: space-between;
    img {
        max-width: 100%;
        object-fit: cover;
        height: auto; 
        width: calc(29% - 10px);
        border-radius: 15px;
    }

    @media (max-width: 768px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 15px;
        img { 
          max-width: 100%;
          aspect-ratio: 3/2;
          height: auto; 
          width: 100%;
          border-radius: 15px;
        }
    }
`;

export const Button = styled.div`

  width: 100%;
  height: 100%;
  display: contents;
  border: transparent;
  cursor: pointer;
  padding: 10px;

  @media screen and (max-width: 768px) {

    width: 15%;
    height: 7%;
    position: absolute;
    display: flex;
  }
`;
