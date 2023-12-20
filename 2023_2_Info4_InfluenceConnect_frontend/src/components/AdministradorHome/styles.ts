import styled from 'styled-components';

import backgroundImage from '../../assets/imagens/backgroundHome.png';
import { Dark, Light } from '../../GlobalStyle';

export const Container = styled.div`

  background: url(${backgroundImage}) no-repeat fixed;
  background-size: cover;
  width: 100%;
  min-height: 91vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const TelaAdminContent = styled.div`

  max-width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  background-attachment: fixed;
`;

export const CardsContainer = styled.div`

  width: 80%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 7%;
  
  @media (max-width: 768px) {

    flex-direction: column;
  }
`;

export const Card = styled.div`

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  &:hover {

    transform: translateY(-20px);
    transition: 0.3s ease-in-out;
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

export const CardImage = styled.img`

  width: 100%;
  border-radius: 8px;
`;

export const CardButton = styled.button <{ $darkmode: boolean, $fontSizeLabel: string }>`

  background-color: ${props => props.$darkmode ? Dark : Light};
  color: ${props => props.$darkmode ? Light : Dark};
  font-size: ${props => props.$fontSizeLabel};
  width: 100%;
  padding: 8px 16px;
  margin-top: -120px;
  border-radius: 4px;
  border-image: linear-gradient(45deg, #6D22F5, #da2fbe, #E94C50, #F8D347);
  border-image-slice: 1;
  cursor: pointer;
  z-index: 10;
`;
