import { useContext } from 'react'
import { Border, Container } from './styles'
import { ThemeContext } from '../../context/themeContext'
import { FontSizeContext } from '../../context/fontSizeContext'
import { PerfilProps } from '../../interface'

export const Perfil: React.FC<PerfilProps> = ({

    handleFinalizarCampanha, handleLogout
}) => {

    const { darkMode } = useContext(ThemeContext)
    const { titleSize } = useContext(FontSizeContext)

    return (

        <Border>
            <Container
                $darkMode={darkMode}
                $fontSize={`${titleSize}rem`}
            >
                <h2>Perfil</h2>

                <button
                    onClick={handleFinalizarCampanha}
                >
                    Finalizar Campanha
                </button>

                <button
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </Container>
        </Border>
    )
}
