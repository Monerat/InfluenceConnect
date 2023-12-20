import styled from "styled-components";
import { Dark, Light } from "../../GlobalStyle";

export const Background = styled.div`

    background: #00000083;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

`

export const Container = styled.form<{ $darkMode: boolean, $fontSizeLabel: string }>`

    background: ${props => props.$darkMode ? Dark : Light};
    font-size: ${props => props.$fontSizeLabel};
    width: 60%;
    height: 70%;
    border: 3px solid #E94C50;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    overflow-y: scroll;
    position: absolute;

    fieldset {

        background: ${props => props.$darkMode ? Dark : Light};
        border: 2px solid ${props => props.$darkMode ? Light : Dark};
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0.5rem;
        margin-bottom: 2rem;
        border-radius: 8px;

        legend {

            background-color: ${props => props.$darkMode ? Dark : Light};
            color: ${props => props.$darkMode ? Light : Dark};
            font-size: ${props => props.$fontSizeLabel};
            text-transform: capitalize;
            margin: 0.5rem;
            margin-top: 2rem;
            transform: translateY(-18px);
            padding: 8px;
            border-radius: 8px 8px 0 0;
            border: 2px solid ${props => props.$darkMode ? Light : Dark};
            border-bottom: none;
        }

        .campo {

            font-size: ${props => props.$fontSizeLabel};
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 20px;
            padding: 0.4rem;

            label {

                color: ${props => props.$darkMode ? Light : Dark};
                text-align: left;
            }

            input {

                font-size: ${props => props.$fontSizeLabel};
                border: none;
                border-bottom:  2px solid  ${props => props.$darkMode ? Light : Dark};
                color: ${props => props.$darkMode ? Light : Dark};
                width: 100%;
                height: 30px;
                background: transparent;
                margin-bottom: .5rem;
                padding: 0.2rem;
            }
        }

        span {

            color: #E94C50;
            font-style: italic;
            text-align: right;
            text-decoration: underline;
        }

        .redesSociais {

            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;  
            gap: 20px;
        }
    }

    .butoes {

        width: 100%;
        height: 75px;
        display: flex;
        justify-content: space-around;
        padding: 1rem;
        margin-bottom: 24px;
    }

    .buttonAdicionar, .buttonRemover {

        color: ${props => props.$darkMode ? Light : Dark};
        background-color: #E94C50;
        width: 35%;
        height: 100%;
        margin: 20px;
        padding: 5px;
        border-radius: 4px;
        border: none;
        font-size: ${props => props.$fontSizeLabel};
        cursor: pointer;
    }

    select {

        color: ${props => props.$darkMode ? Light : Dark};
        background-color: #E94C50;
        padding: 4px;
        border-radius: 4px;
        text-transform: uppercase;

        option {

            background: ${props => props.$darkMode ? Dark : Light};
        }
    }

    @media (max-width: 768px) {
    width: 80%;
    }
`
