import styled from 'styled-components';
import { Dark, Light } from '../../GlobalStyle';

export const DetalhesContent = styled.div<{ $darkmode: boolean }>`
  background-color: ${props => props.$darkmode ? Dark : Light};
  max-width: 100vw;
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-attachment: fixed;
  text-transform: capitalize;

  .influencersImgs {

    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const DetalhesContainer = styled.div`
  padding: 3vw;
`;

export const Banner = styled.div`
  width: 100%;
  height: 18.0625rem;
  margin-bottom: 30px;
  background-size: cover;
  background-position: center;
  object-fit: cover;
  object-position: center;
`;

export const CardDetalhes = styled.div<{ $darkmode: boolean }>`
  gap: 20px; 
  padding: 20px;
  background: ${props => props.$darkmode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
  border-radius: 10px;
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
  justify-content: space-between;
  text-transform: capitalize;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const BottomInfo = styled.div`
  height: 2vw;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px; 

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

export const DetalhesFotoContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  
  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

export const DetalhesFoto = styled.div <{ $darkmode: boolean } >`
  background-color: ${props => props.$darkmode ? 'transparent' : 'rgba(255, 255, 255, 0.7)'};
  
`;

export const DetalhesFotoImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 2px;
`;

export const DetalhesInfoContainer = styled.div`
  flex: 2;
  max-width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    width: 45vw;
    margin-left: 0;
    text-align: left;
  }
`;

export const InformacoesContainer = styled.div <{ $darkmode: boolean, $fontSizeLabel: string } >`

  color: ${props => props.$darkmode ? Light : Dark};
  font-size: ${props => props.$fontSizeLabel};
`;

export const ImagemPerfil = styled.img`

  width: 80%;
  height: auto;
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
          max-width: 80%;
          aspect-ratio: 3/2;
          height: auto; 
          width: 100%;
          border-radius: 15px;
        }
    }
`;

export const InfluenciadorFotoImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
`;

export const AdicionarNovoButton = styled.button<{ $darkMode: boolean }>`

  background-color: ${(props) => (props.$darkMode ? Dark : Light)};
  color: ${(props) => (props.$darkMode ? Light : Dark)};
  padding: 8px 16px;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  border-image: linear-gradient(45deg, #6d22f5, #da2fbe, #e94c50, #f8d347);
  border-image-slice: 1;

  &:active {

    transform: scale(0.9);
    transition: 0.3s;
  }
`;

export const Button = styled.button<{ $background: boolean, $fontSizeLabel: string }>`


  bottom: 1rem;
  right: 1rem;
  width: 19rem;
  height: 4.22675rem;
  border-radius: 0.5rem;
  border: 1px solid #da2fbe;
  color: black;
  background: #da2fbe;

  font-size: 1.25rem;
  font-weight: 400;
  margin-top: 2rem;
  margin-left: 4.5rem;
  cursor: pointer;
     @media (max-width: 768px) {
      margin-left: 0;
  }
  `;

export const ModalWrapper = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
`;

export const ModalContent = styled.div`
background-color: white;
padding: 20px;
border-radius: 8px;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const ModalButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;