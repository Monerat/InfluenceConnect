import { useContext, useState } from "react"
import { ThemeContext } from "../../context/themeContext"
import { FontSizeContext } from "../../context/fontSizeContext"
import { ButtonPrincipal } from "../ButtonPrincipal"
import { MessageConfirmProps } from "../../interface"
import { putEntidade, headersRequest } from "../../api/api"
import { Modal } from "../Modal"
import { useNavigate } from "react-router-dom"
import { Background, Border, Container } from "../../GlobalStyle"

export const MessageConfirmInfluencer: React.FC<MessageConfirmProps> = (
    { influenciador, setIsMenuOpen, isMenuOpen }
) => {

    const { darkMode } = useContext(ThemeContext)
    const { paragrafoSize } = useContext(FontSizeContext)
    const { header } = headersRequest()
    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [errorString, setErrorString] = useState<string>('')

    const handleDesativarInfluenciador = () => {

        putEntidade(`influenciadores/${influenciador.id}`, { ativo: !influenciador.ativo }, header)
            .then(() => {

                setIsModalOpen(true)
                setTimeout(() => {

                    navigate('/influencers')
                }, 2000);
            })
            .catch(error => {

                setError(true)
                setErrorString(error.response.data.message)

                setTimeout(() => {

                    setError(false)
                }, 2000);
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
                            influenciador.ativo ?
                                <h2>Tem certeza que deseja desativar o influenciador?</h2> :
                                <h2>Tem certeza que deseja ativar o influenciador?</h2>
                        }

                        <div className="butoes">

                            <ButtonPrincipal
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                Cancelar
                            </ButtonPrincipal>

                            <ButtonPrincipal
                                onClick={handleDesativarInfluenciador}
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
                            influenciador.ativo ?
                                "Influencer desativado com sucesso!" :
                                "Influencer ativado com sucesso!"
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
