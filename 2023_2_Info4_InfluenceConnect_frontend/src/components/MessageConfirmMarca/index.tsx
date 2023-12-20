import { useContext, useState } from "react"
import { Background, Border, Container } from "../../GlobalStyle"
import { ThemeContext } from "../../context/themeContext"
import { FontSizeContext } from "../../context/fontSizeContext"
import { ButtonPrincipal } from "../ButtonPrincipal"
import { MessageConfirmMarcaProps } from "../../interface"
import { putEntidade, headersRequest } from "../../api/api"
import { Modal } from "../Modal"
import { useNavigate } from "react-router-dom"

export const MessageConfirmMarca: React.FC<MessageConfirmMarcaProps> = (
    { marca, setIsMenuOpen, isMenuOpen }
) => {

    const { darkMode } = useContext(ThemeContext)
    const { paragrafoSize } = useContext(FontSizeContext)
    const { header } = headersRequest()
    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [errorString, setErrorString] = useState<string>('')

    const handleDesativarMarca = () => {

        putEntidade(`empresas/${marca.id}`, { ativo: !marca.ativo }, header)
            .then(() => {

                setIsModalOpen(true)
                setTimeout(() => {

                    navigate('/marcas')
                }, 2000);
            })
            .catch(error => {

                setError(true)
                setErrorString(error.response.data.message)

                setTimeout(() => {

                    setError(false)
                }, 3000);
            })
    }

    return (

        <>
            <Background>
                <Border>
                    <Container
                        $fontSize={`${paragrafoSize}`}
                        $darkMode={darkMode}
                    >

                        {
                            marca.ativo ?
                                <h2>Tem certeza que deseja desativar a marca?</h2> :
                                <h2>Tem certeza que deseja ativar a marca?</h2>
                        }

                        <div className="butoes">

                            <ButtonPrincipal
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                Cancelar
                            </ButtonPrincipal>

                            <ButtonPrincipal
                                onClick={handleDesativarMarca}
                            >
                                Confirmar
                            </ButtonPrincipal>
                        </div>
                    </Container>
                </Border>
            </Background>

            {
                isModalOpen &&
                <Modal>
                    <h1 style={{ color: 'green' }}>

                        {
                            marca.ativo ?
                                "marca desativada com sucesso!" :
                                "marca ativada com sucesso!"
                        }
                    </h1>
                </Modal>
            }

            {
                error &&
                <Modal>
                    {errorString}
                </Modal>
            }
        </>
    )
}
