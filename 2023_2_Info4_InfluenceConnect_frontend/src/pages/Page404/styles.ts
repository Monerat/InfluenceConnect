import styled from "styled-components";
import { Dark, Light } from "../../GlobalStyle";

export const Page404Style = styled.div<{ $DarkMode: boolean }>`

    width: 100vw;
    height: 89.3vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .border {

        width: 50%;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient( -115deg , #E94C50, #DA2FBE, #6D22F5, #F8D347);
    }

    .container {

        width: 99%;
        height: 99%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: ${ props => props.$DarkMode ? Dark : Light };
        border-radius: 12px;
        padding: 20px;

        h1 {

            font-style: italic;
        }

        img {

            width: 50%;
            margin: 12px;
        }
    }
`