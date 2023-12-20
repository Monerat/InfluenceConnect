import styled from "styled-components";
import { Dark, Light } from "../../GlobalStyle";

export const TitleStyles = styled.h1<{ $fontSizeTitle: string, $darkMode: boolean }>`

    color: ${props => props.$darkMode ? Dark : Light };
    font-size: ${props => props.$fontSizeTitle};
    text-align: center;
    padding: 0.5rem;
    margin: 12px;
    margin-bottom: 20px;

`  