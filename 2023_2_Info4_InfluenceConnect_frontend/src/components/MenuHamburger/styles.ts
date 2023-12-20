import styled from "styled-components";

import { Dark, Light } from "../../GlobalStyle";

export const BorderStyle = styled.div<{ $darkMode: boolean, $fontSize: string }>`

    width: 200px;
    height: 50px;
    display: none;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background: linear-gradient(45deg, #6D22F5, #da2fbe, #F8D347);

    @media (max-width: 768px) {
        
        display: flex;
    }

    .container {

        width: 98%;
        height: 90%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 4px;
        margin: 2px;
        border-radius: 4px;
        background-color: transparent;

        button {

            background: #E94C50;
            width: 100%;
            height: 100%;
            border-radius: 4px;
            border: none;
            color: ${props => props.$darkMode ? Dark : Light };
            font-size: ${props => props.$fontSize  } ;
        }
    }
`

