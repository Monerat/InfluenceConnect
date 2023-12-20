import React, { useContext } from 'react'
import { ContextProps } from '../../interface'
import { ThemeContext } from '../../context/themeContext'
import { FontSizeContext } from '../../context/fontSizeContext'
import { Border, Filtros } from './styles'

export const Filter: React.FC<ContextProps> = ({ children }) => {

    const { darkMode } = useContext(ThemeContext)
    const { paragrafoSize } = useContext(FontSizeContext)

    return (

        <Border
            $darkMode={darkMode}
            $fontSizeLabel={`${paragrafoSize}rem`}
        >
            <Filtros
                $darkMode={darkMode}
                $fontSizeSelection={`${paragrafoSize}rem`}
            >
            {children}
            </Filtros>
        </Border>
    )
}
