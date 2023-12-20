import React from "react";
import backgroundImg from "../../assets/img/BackgroundImage/backgroundImage.svg"
import styled from "styled-components";

interface BackgroundImageHomeProps {

    children: React.ReactNode;
}

const ImageBackground = styled.img`

    width: 100%;
    height: 100%;
`

export const BackgroundImage: React.FC<BackgroundImageHomeProps> = ({ children }) => (

    <ImageBackground
        src={backgroundImg}
    >
        {children}
    </ImageBackground>
);