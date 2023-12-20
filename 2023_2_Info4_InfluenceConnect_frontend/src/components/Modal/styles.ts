import styled from "styled-components";

import { Light, Dark } from "../../GlobalStyle";

export const Background = styled.div`

    background: #00000083;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`

export const Border = styled.div`

    animation: aparecer 1s ease-in-out;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(105deg, #6D22F5, #DA2FBE);
    border-radius: 8px;
    position: absolute;
    top: 12%;
    left: 50%;
    transform: translateX(-50%);

    @keyframes aparecer {
        
        from {

            opacity: .5;
            transform: translateX(100px);
        }
    }
`

export const Container = styled.div<{ $darkMode: boolean, $fontSize : string }>`

    background: ${props => props.$darkMode ? Dark : Light };
    width: 99%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 4px;
    padding: 20px;
    gap: 12px;
    border-radius: 8px;

    h1 {

        color: #E94C50;
        font-style: italic;
        font-size: ${props => props.$fontSize};
    }
`   