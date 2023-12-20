import styled from "styled-components";
import { Dark, Light, subDark, subLight } from "../../GlobalStyle";
import backgroundImage from "../../assets/imagens/backgroundHome.png";

export const BackgroundStyle = styled.div`

    background: url(${backgroundImage}) no-repeat fixed;  
    background-size: cover ;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Border = styled.div`

    background: linear-gradient(145deg, #6D22F5, #da2fbe, #E94C50, #F8D347);
    min-width: 60%;
    padding: 4px;
    border-radius: 8px;
`

export const Container = styled.div<{ $darkMode: boolean }>`

    background: ${props => props.$darkMode ? Dark : Light};
    border-radius: 8px;
    width: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;

    h1, p, div {

        color: ${props => props.$darkMode ? Light : Dark};
    }

    .infoCampanha {

        background: ${props => props.$darkMode ? '#e8e8e8' : '#212121'};
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        padding: 12px;

        section {

            display: flex;
            gap: 12px;
        }
    }

    .infoInfluenciador, .redesSociais {

        display: flex;
        flex-direction: column;
        margin: 4px;
    }

    .redesSociais {

        background: ${props => props.$darkMode ? '#e8e8e8' : '#212121'};
        width: 60%;
        padding: 12px;
        border-radius: 8px;
    }

    .cardInfluenciador {

        background: ${props => props.$darkMode ? subDark : subLight};
        width: 50%;
        display: flex;
        align-items: center;
        border-radius: 8px;
        padding: 8px;
        margin: 4px;

        img {

            width: 5rem;
            height: 5rem;
            border-radius: 50%;
            object-fit: cover;
            object-position: center;
        }
    }

    .butoes {

        display: flex;
        justify-content: space-around;
        min-height: 100%;

        button {

            background: ${props => props.$darkMode ? subDark : subLight};
        }
    }

    .orcamento {

        background: ${props => props.$darkMode ? subDark : subLight};
        text-align: right;
        padding: 12px;
        margin: 32px;
        border-radius: 8px;
    }
`

export const ContainerCards = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin: 32px 0 0 0;
`

export const Posts = styled.div<{ $darkMode: boolean }>`

    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    svg {

        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        cursor: pointer;
    }

    button {

        background: ${props => props.$darkMode ? subLight : subDark};
        border: none;
    }

    .postQuantidade {

        width: 100%;
        display: flex;
        justify-content: space-around;
    }
`
