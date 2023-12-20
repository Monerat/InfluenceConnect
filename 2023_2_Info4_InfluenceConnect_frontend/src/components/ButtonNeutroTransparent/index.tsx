import React, { useContext } from 'react'

import { AdicionarNovoButton } from './styles'
import { ThemeContext } from '../../context/themeContext'

interface Props {
    onToggle: () => void;
    label: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

export const ButtonNeutroTransparent: React.FC<Props> = ({ children,onToggle,label }) => {

    const { darkMode } = useContext(ThemeContext)

    return (
        <AdicionarNovoButton aria-label={label}
            $darkMode={darkMode} onClick={onToggle}>
                {children}
        </AdicionarNovoButton>
    )
}
