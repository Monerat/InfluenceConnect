import { styled } from "styled-components";
import { subDark, subLight } from "../../GlobalStyle";

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
        color: ${props => props.$darkMode ? subDark : subLight};
        border: none;
    }

    .postQuantidade {

        width: 100%;
        display: flex;
        justify-content: space-around;
    }
`
