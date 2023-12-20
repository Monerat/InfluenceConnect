import styled from "styled-components";
import { Dark, Light } from "../../GlobalStyle";

export const Border = styled.div<{
    $darkMode: boolean;
    $fontSizeLabel: string;
}>`
    width: 35%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background: linear-gradient(45deg, #6d22f5, #da2fbe, #e94c50, #f8d347);
    position: absolute;
    top: 12%;
    left: 63%;
    z-index: 1;

    select {
        background-color: #e94c50;
        color: ${(props) => (props.$darkMode ? Dark : Light)};
        width: 30%;
        padding: 4px;
        text-align: center;
        font-size: ${(props) => props.$fontSizeLabel};
        border-radius: 4px;
        border: none;
    }
`;

export const Filtros = styled.div<{
    $darkMode: boolean;
    $fontSizeSelection: string;
}>`
    background-color: ${(props) => (props.$darkMode ? Dark : Light)};
    color: ${(props) => (props.$darkMode ? Light : Dark)};
    font-size: ${(props) => props.$fontSizeSelection};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 20px;
    padding: 12px;
    margin: 4px;
    border-radius: 4px;
`;