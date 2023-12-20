import React, { useContext } from 'react'

import { Border, Background, Container } from './styles'
import { ThemeContext } from '../../context/themeContext'
import { ContextProps } from '../../interface'
import { FontSizeContext } from '../../context/fontSizeContext'

export const Modal: React.FC<ContextProps> = ({ children }) => {

    const { darkMode } = useContext(ThemeContext)
    const { subTitleSize } = useContext(FontSizeContext)

    return (

        <Background>
            <Border>
                <Container
                    $fontSize={`${subTitleSize}rem`}
                    $darkMode={darkMode}>

                    <h1>{children}</h1>
                </Container>
            </Border>
        </Background>
    )
}
