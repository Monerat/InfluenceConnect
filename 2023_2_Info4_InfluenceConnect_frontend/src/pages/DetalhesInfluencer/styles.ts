import styled from "styled-components";

export const Container = styled.div<{ $background: boolean }>`
  background: ${(props) =>
    props.$background ? "rgba(242, 242, 242, 0.96)" : "rgba(0, 0, 0, 0.85)"};
  color: ${(props) => (props.$background ? "#000" : "#FFF")};
  width: 100%;
  min-height: 100vh;

  @media (max-width: 960px) and (min-width: 320px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Banner = styled.div`
  width: 100%;
  height: 18.0625rem;
  background-size: cover;
  background-position: center;
  object-fit: cover;
  object-position: center;

`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const ProfileImage = styled.img`
  width: 15.625rem;
  height: 15.625rem;
  border-radius: 62.4375rem;
  margin-top: -7.8125rem;
  margin-left: 9.399rem;
  object-fit: cover;
  object-position: center;

  @media (min-width: 320px) and (max-width: 960px) {
    margin: 0;
    margin-top: -7.8125rem;
  }
`;
export const NomeInfluenciador = styled.h2<{ $fontSizeLabel: string }>`
  width: 30%;
  padding-left: 2%;
  font-size: calc(${props => props.$fontSizeLabel}*3);

  @media (min-width: 320px) and (max-width: 960px) {
    padding-left: 0;
    text-align: center;
    width: 100%;
  }
`;

export const NichoInfluenciador = styled.div<{ $fontSizeLabel: string }>`
  font-size: calc(${props => props.$fontSizeLabel}*1.5);
  padding-left: 10px;
  padding-right: 10px;
`;
export const RegiaoInfluenciador = styled.div<{ $fontSizeLabel: string }>`
  font-size: calc(${props => props.$fontSizeLabel}*1.2);
  padding-right: 2%;

  @media (min-width: 320px) and (max-width: 960px) {
    padding-right: 0;
  }
`;
export const Icons = styled.div<{ $background: boolean }>`
  margin-top: 20px;

  .social-icons {
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: center;

    a {
      color: ${(props) => (props.$background ? "#000" : "#FFF")};
    }
  }

  @media (max-width: 960px) and (min-width: 320px) {
    margin-top: 15px;
    margin-bottom: 15px;
  }
`;

export const InfoContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  

  @media (max-width: 768px) {
    margin-top: 20px;
    flex-direction: column;
    text-align: center;
  }
`;

export const FollowersContainer = styled.div`
  margin-top: 5.25rem;
  h3 {
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const PhotoGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.13rem;
  flex-wrap: wrap;
  

  img {
    max-width: 16.875rem;
    max-height: 12.875rem;
    border-radius: 0.5rem;
    margin-bottom: 2.13rem;
    box-sizing: border-box;
    object-fit: cover;
    object-position: center;
  }

  @media (min-width: 320px) and (max-width: 960px) {
    width: 100%;
  }
`;

export const Button = styled.button<{ $background: boolean, $fontSizeLabel: string }>`
  position: relative;
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
  margin-left: 9.399rem;
  cursor: pointer;

  @media (max-width: 960px) {
    position: relative;
    margin: 0;
    margin-top: 1rem;
  }

  @media (min-width: 320px) and (max-width: 960px) {
    position: relative;
    margin-left: 2rem;
    margin-top: 1rem;
  }

  &:hover {
    color: #da2fbe;
    background: rgba(0, 0, 0, 0);   
  }
`;

export const RedeSocialContainer = styled.div`
  padding-right: 5%;
  padding-left: 5%;
  padding-top: 2%;
`
export const InfoRedeSocial = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;

  > div {
    flex: 0 0 calc(33.33% - 5px);
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    > div {
      flex: 0 0 100%;
    }
  }
`;

export const Butoes = styled.div`

  display: flex;
  justify-content: center;
  gap: 50px;
  padding-bottom: 40px;
`