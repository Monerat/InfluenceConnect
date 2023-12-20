import { useContext, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { CreateCampanhasData } from '../../interface'

import { Title } from '../../components/Title'
import { ButtonPrincipal } from '../../components/ButtonPrincipal'
import { Modal } from '../../components/Modal'
import { Formulario } from '../../GlobalStyle'
import { Background } from './styles'
import { FontSizeContext } from '../../context/fontSizeContext'
import { ThemeContext } from '../../context/themeContext'
import { createCampanhaSchema } from '../../schemas'
import { DadosCampanhas } from '../../components/DadosCampanha'
import { ImagensCampanha } from '../../components/ImagensCampanha'

import BackgroundImage from '../../assets/img/BackgroundImage/background_cadastro_campanhas.jpg'

import { headersRequest, postEntidade } from '../../api/api'

import { useNavigate } from 'react-router-dom'

export const CadastroCampanha = () => {

    const { darkMode } = useContext(ThemeContext)
    const { paragrafoSize } = useContext(FontSizeContext)

    const { header, headersImg } = headersRequest()

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [imagensExists, setImagensExist] = useState<boolean>(false)

    const navigate = useNavigate()
    
    const createCampanhaForm = useForm<CreateCampanhasData>({

        resolver: zodResolver(createCampanhaSchema)
    })

    const { handleSubmit } = createCampanhaForm

    const createCampanha = async (data: CreateCampanhasData) => {

        const {

            nomeCampanha,
            nicho,
            inicioCampanha,
            encerramentoCampanha,
            idEmpresa,
            orcamento,
            imagens,
        } = data;

        const campanha = {

            ativo: true,
            nome: nomeCampanha,
            nicho: nicho,
            inicioCampanha: inicioCampanha,
            encerramentoCampanha: encerramentoCampanha,
            orcamento: orcamento,
            empresa: {

                id: idEmpresa
            }
        }

        if (
            imagens.perfil === null ||
            imagens.feed1 === null ||
            imagens.feed2 === null ||
            imagens.feed3 === null ||
            imagens.background === null
        ) {
            setImagensExist(true)
        }

        postEntidade('campanhas', campanha, header)
            .then(response => {

                const id = response.data.id;

                if (imagensExists) {

                    postEntidade(`campanhas/imagem/${id}`, imagens, headersImg)
                        .then(() => {
                            setIsModalOpen(true);

                            setTimeout(() => {
                                navigate('/campanhas');
                            }, 2000);
                        }).catch(err => {

                            console.log(err);
                            setError(true);

                            setTimeout(() => {
                                setError(false);
                            }, 2000);
                        })
                } else {

                    setIsModalOpen(true);

                    setTimeout(() => {
                        navigate('/campanhas');
                    }, 2000);
                }

            }).catch(err => {

                console.log(err);
                setError(true);

                setTimeout(() => {
                    setError(false);
                }, 2000);
            })
    }

    return (

        <Background>
            <FormProvider {...createCampanhaForm}>

                <div
                    className='image'
                    style={{
                        background: `url(${BackgroundImage}) no-repeat fixed`,
                        backgroundSize: 'cover'
                    }}
                ></div>

                <Formulario
                    onSubmit={handleSubmit(createCampanha)}
                    $darkMode={darkMode}
                    $fontSizeLabel={`${paragrafoSize}rem`}
                >

                    <Title>
                        Cadastre uma campanha
                    </Title>

                    <fieldset>

                        <legend>Dados da campanha</legend>

                        <DadosCampanhas />
                    </fieldset>

                    <fieldset>

                        <legend>Imagens</legend>

                        <ImagensCampanha />
                    </fieldset>

                    <div className="butoes">

                        <ButtonPrincipal
                            type='submit'
                        >
                            confirmar
                        </ButtonPrincipal>
                    </div>
                </Formulario>

                {
                    isModalOpen &&
                    <Modal>
                        <h1 style={{ color: 'green' }}>
                            Campanha Cadastrada com sucesso !
                        </h1>
                    </Modal>
                }

                {
                    error &&
                    <Modal>
                        Erro ao cadastrar campanha
                    </Modal>
                }

            </FormProvider >
        </Background>
    )
}