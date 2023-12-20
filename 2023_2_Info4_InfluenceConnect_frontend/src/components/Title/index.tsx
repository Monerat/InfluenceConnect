import React, { useContext } from 'react'

import { TitleStyles } from './styles'
import { FontSizeContext } from '../../context/fontSizeContext'
import { ThemeContext } from '../../context/themeContext'
import { ContextProps } from '../../interface'

export const Title: React.FC<ContextProps> = ({ children }) => {

    const { titleSize } = useContext(FontSizeContext)
    const { darkMode } = useContext(ThemeContext)

    return (

        <TitleStyles
            $darkMode={darkMode}
            $fontSizeTitle={`${titleSize}rem`}
        >
            {children}
        </TitleStyles>
    )
}

