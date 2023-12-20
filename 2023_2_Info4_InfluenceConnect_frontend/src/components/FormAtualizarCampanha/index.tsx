import { useContext, useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { AtualizarCampanhaData, FormularioAtualizarProps } from '../../interface'

import { Title } from '../Title'
import { ButtonPrincipal } from '../ButtonPrincipal'
import { Modal } from '../Modal'
import { Background, Container } from './styles'
import { FontSizeContext } from '../../context/fontSizeContext'
import { ThemeContext } from '../../context/themeContext'
import { atualizarCampanhaSchema } from '../../schemas'
import { ImagensCampanha } from '../ImagensCampanha'

import { headersRequest, postEntidade, putEntidade } from '../../api/api'

import { useNavigate } from 'react-router-dom'
import { AtualizarDadosCampanha } from '../DadosCampanha'

export const FormularioAtualizarCampanha: React.FC<FormularioAtualizarProps> = (
    { id, setIsMenuOpen, isMenuOpen }
) => {

    const navigate = useNavigate();
    const { darkMode } = useContext(ThemeContext);
    const { paragrafoSize } = useContext(FontSizeContext);

    const { header, headersImg } = headersRequest();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [erroAconteceu, setErroAconteceu] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<String>("")
    const [isLoadingImagens, setIsLoadingImagens] = useState<boolean>(true)
    const [isLoadingCampanhas, setIsLoadingCampanhas] = useState<boolean>(true)

    useEffect(() => {
        handleLoadingPage()
    }, [isLoadingCampanhas,
        isLoadingImagens,
        erroAconteceu])

    const handleLoadingPage = () => {

        if(
            !isLoadingCampanhas &&
            !isLoadingImagens &&
            !erroAconteceu
        ){
            setIsModalOpen(true)
            setTimeout(() => {
                
                navigate('/campanhas')
            }, 2000)
        }
    }

    const atualizarCampanha = async (data: AtualizarCampanhaData) => {

        setIsLoadingCampanhas(true)
        setIsLoadingImagens(true)
        setErroAconteceu(false)

        const {

            nomeCampanha,
            nicho,
            inicioCampanha,
            encerramentoCampanha,
            orcamento,
            imagens,

        } = data;


        const campanha = {

            ativo: null,
            nome: nomeCampanha != "" ? nomeCampanha : null,
            nicho: nicho != "" ? nicho : null,
            inicioCampanha: inicioCampanha != "" ? inicioCampanha : null,
            encerramentoCampanha: encerramentoCampanha != "" ? encerramentoCampanha : null,
            orcamento: orcamento != "" ? orcamento : null,
        }

        const handleImagens = () => {

            if(Object.values(imagens).some(value => value != null)&&
                Object.values(imagens).some(value => value == null)){
                
                setError(true)
                setErroAconteceu(true)
                setErrorMessage("Selecione todas as imagens para alterá-las")

                setTimeout(() => {

                    setError(false)
                }, 2000)
            }

            if(Object.values(imagens).every(value => value != null)){
                
                postEntidade(`campanhas/imagem/${id}`, imagens, headersImg)
                .then((response) => {console.log(response)})
                .catch(err => {

                    console.log(err)
                    setError(true)
                    setErrorMessage(err.response.data.message)
                    setErroAconteceu(true)

                    setTimeout(() => {

                        setError(false)
                    }, 2000);
                })
                .finally(() => {

                    setIsLoadingImagens(false)
                })
                
            } else {

                setIsLoadingImagens(false)
            }

        }

        const handleCampanhas = () => {

            if(Object.values(campanha).some(value => value != null)){
                putEntidade(`campanhas/${id}`, campanha, header)
                .then()
                .catch(err =>{

                    console.log(err)
                    setError(true)
                    setErrorMessage(err.response.data.message)
                    setErroAconteceu(true)
                    setTimeout(() => {

                        setError(false)
                    }, 2000);
                })
                .finally(() => {

                    setIsLoadingCampanhas(false)
                })
            } else {

                setIsLoadingCampanhas(false)
            }

        }

        const updateData = async () => {
            await handleCampanhas()
            await handleImagens()
        }

        try {
            
            await updateData()

        } catch (error) {

            console.error(error);
        }

        console.log(errorMessage)
        console.log(imagens)
        console.log(erroAconteceu)

    }

    const atualizarCampanhaForm = useForm<AtualizarCampanhaData>({

        resolver: zodResolver(atualizarCampanhaSchema)

    });

    const { handleSubmit } = atualizarCampanhaForm

    return (
        <>
            <Background>
                <FormProvider {...atualizarCampanhaForm}>
                    <Container
                        onReset={() => setIsMenuOpen(!isMenuOpen)}
                        onSubmit={handleSubmit(atualizarCampanha)}
                        $fontSizeLabel={`${paragrafoSize}rem`}
                        $darkMode={darkMode}
                    >

                        <Title>
                            Atualize uma campanha
                        </Title>

                        <fieldset>

                            <legend>Dados da campanha</legend>
                            <AtualizarDadosCampanha />
                        </fieldset>

                        <fieldset>

                            <legend>Imagens</legend>
                            <ImagensCampanha />
                        </fieldset>

                        <div className='butoes'>

                            <ButtonPrincipal>
                                <button
                                    type='reset'
                                >
                                    cancelar
                                </button>
                            </ButtonPrincipal>

                            <ButtonPrincipal>
                                <button
                                    type='submit'
                                >
                                    salvar
                                </button>
                            </ButtonPrincipal>
                        </div>

                        {
                            isModalOpen &&
                            <Modal>
                                <h1 style={{ color: 'green' }}>
                                    Campanha Atualizada com sucesso !
                                </h1>
                            </Modal>
                        }

                        {
                            error &&
                            <Modal>
                                {errorMessage}
                            </Modal>
                        }

                    </Container>
                </FormProvider>
            </Background >
        </>
    )
}

