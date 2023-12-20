import React, { useContext } from "react"
import { BorderStyle } from "./styles"

import { ThemeContext } from "../../context/themeContext"
import { FontSizeContext } from "../../context/fontSizeContext"

import { Moon, Sun } from "lucide-react"

import { MenuHamburgerProps } from "../../interface"

export const MenuHamburger: React.FC<MenuHamburgerProps> = ({

    handleDiminuirFonte,
    handleAumentarFonte,
    handleAutoContraste,
}) => {

    const { darkMode } = useContext(ThemeContext)
    const { paragrafoSize } = useContext(FontSizeContext)

    return (

        <BorderStyle
            $darkMode={darkMode}
            $fontSize={`${paragrafoSize}rem`}
        >

            <div className="container">

                <button
                    title='Diminuir fonte'
                    aria-label='Diminuir tamanho da fonte -A'
                    onClick={handleDiminuirFonte}
                >
                    -A
                </button>

                <button
                    title='Aumentar fonte'
                    aria-label='Aumentar tamanho da fonte +A'
                    onClick={handleAumentarFonte}
                >
                    +A
                </button>

                <button
                    title='Auto-contraste'
                    aria-label='Ativar alto contraste'
                    onClick={handleAutoContraste}
                >

                    {
                        darkMode
                            ? <Moon />
                            : <Sun />
                    }
                </button>

            </div>
        </BorderStyle>
    )
}
