import React, { useContext } from 'react'

import { Border } from './styles'
import { FontSizeContext } from '../../context/fontSizeContext'
import { ThemeContext } from '../../context/themeContext'
import { ButtonProps } from '../../interface'

export const ButtonPrincipal: React.FC<ButtonProps> = ({children, ...props}) => {

    const { paragrafoSize } = useContext(FontSizeContext)
    const { darkMode } = useContext(ThemeContext)

    return (
        
        <Border 
            $fontSizeButton={`${paragrafoSize}rem`}
            $darkMode={darkMode}
        >
            <button {...props}>
                {children}
            </button>
        </Border>
    )
}
