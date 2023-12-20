import styled from "styled-components"
import { Dark, Light } from "../../GlobalStyle"

export const Border = styled.div`

    background: linear-gradient(145deg, #6D22F5, #da2fbe, #E94C50, #F8D347);
    animation: aparecer 0.7s ease-in;
    min-width: 20%;
    min-height: 100%;
    border-radius: 8px;
    padding: 2px;
    position: absolute;
    top: 90%;
    right: 12%;

    @media screen and (max-width: 768px) {
        
        width: 90%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        top: 105%;
        right: 5%;
    }

    @keyframes aparecer {
        
        from {

            opacity: 0;
            transform: translateY(-100px);
        }
    }
`

export const Container = styled.div<{ $darkMode: boolean, $fontSize: string }>`

    background: ${props => props.$darkMode ? Dark : Light};
    min-width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    border-radius: 8px;
    padding: 12px;

    h2, p, span {

        color: ${props => props.$darkMode ? Light : Dark};
        text-align: center;
        margin: 4px;
    }

    h2 {

        font-size: ${props => props.$fontSize};
    }

    button {

        width: 120px;
        background: ${props => props.$darkMode ? Light : Dark};
        color: ${props => props.$darkMode ? Dark : Light};
        border: none;
        border-radius: 4px;
        padding: 8px;
        cursor: pointer;

        &:hover {

            color: #6D22F5;
            transform: scale(1.1);
            transition: 0.3s;
        }
    }
`