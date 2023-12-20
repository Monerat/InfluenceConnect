import styled from "styled-components";
import { Dark, Light } from "../../GlobalStyle";

export const CardContainer = styled.div<{ $fontSizeButton: number, $darkMode: boolean }>`
    background-color: ${(props) => (props.$darkMode ? '#e4e5f1' : Light)};
    border-width: 1vw;
    width: 25vw;
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
`

export const Informacoes = styled.div`

`
export const Header = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
export const Arroba = styled.strong`
    background-image: linear-gradient(75deg, #E94C50, #E9A64C);
    background-clip: text;
    -webkit-background-clip: text; 
    -webkit-text-fill-color: transparent;
    color: black;
`

export const Link = styled.a<{$darkMode: boolean}>`
    color: ${(props) => (props.$darkMode ?  Light : Dark)};
    
`