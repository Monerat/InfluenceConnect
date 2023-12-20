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
    z-index: 1;
`

export const Border = styled.form`

    width: 60%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: linear-gradient(45deg, #6D22F5, #da2fbe, #F8D347);
`

export const Container = styled.form<{ $darkMode: boolean, $fontSize: string }>`

    background: ${props => props.$darkMode ? Dark : Light};
    font-size: ${props => props.$fontSize};
    width: 60%;
    height: 70%;
    border: 3px solid #E94C50;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    overflow-y: scroll;
    position: relative;

    .iconX {

        color: ${props => props.$darkMode ? Dark : Light};
        background: #E94C50;
        border-radius: 50%;
        position: absolute;
        bottom: 0;
        right: 0;
        cursor: pointer;
        z-index: 2;
    }

    .campo {

        font-size: ${props => props.$fontSize};
        width: 100%;
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

            font-size: ${props => props.$fontSize};
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

    fieldset {

        width: 94%;
        padding: 12px;
        margin: 10px 20px;
    }

    h1 {

        color: #E94C50;
        text-align: center;
        margin: 12px;
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
        font-size: ${props => props.$fontSize};
        cursor: pointer;
    }

    .butoes {

        width: 100%;
        height: 75px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-around;
        padding: 1rem;
    }

    select {

        color: ${props => props.$darkMode ? Light : Dark};
        background-color: #E94C50;
        padding: 4px;
        border-radius: 4px;

        option {

            background: ${props => props.$darkMode ? Dark : Light};
        }
    }

    @media (max-width: 768px) {
    width: 80%;
  }
`
