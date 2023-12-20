import styled from 'styled-components';
import backgroundImage from '../../assets/imagens/backgroundHome.png';

import { Dark, Light } from '../../GlobalStyle';

export const TelaHomeContent = styled.div`

  background-image: url(${backgroundImage});
  max-width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export const CardsContainer = styled.div`

  display: flex;
  justify-content: space-around;
  align-items: center;
  max-height: 50%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Card = styled.div`

  text-align: center;
  margin: 10px;
  padding: 10px;
  width: calc(33.33% - 20px);
  
  @media (max-width: 768px) {
    width: calc(50% - 20px);
  }

  @media (max-width: 480px) {
    width: calc(100% - 20px);
  }
`;

export const CardImage = styled.img`

  width: 100%;
  height: auto;
  border-radius: 8px;
`;

export const CardButton = styled.button <{ $darkmode: boolean, $fontSizeLabel: string }>`

  background-color: ${props => props.$darkmode ? Dark : Light };
  color: ${props => props.$darkmode ? Light : Dark };
  font-size: ${props => props.$fontSizeLabel};
  margin-top: -20px;
  width: 100%;
  padding: 8px 16px;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  border-image: linear-gradient(45deg, #6D22F5, #da2fbe, #E94C50, #F8D347);
  border-image-slice: 1;
`;
