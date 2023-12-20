import React, { useContext } from 'react'

import { StyledButton } from './styles'
import { FontSizeContext } from '../../context/fontSizeContext'
import { ThemeContext } from '../../context/themeContext'


interface Props {
    onToggle: () => void;
    label: string;
    children: React.ReactNode;
}

export const ButtonHeader: React.FC<Props> = ({ children,onToggle,label }) => {

    const { paragrafoSize } = useContext(FontSizeContext)
    const { darkMode } = useContext(ThemeContext)

    return (
        <StyledButton aria-label={label} $fontSizeButton={`${paragrafoSize}rem`}
            $darkMode={darkMode} onClick={onToggle}>
                {children}
        </StyledButton>
    )
}
