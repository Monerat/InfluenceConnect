import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/themeContext'
import { FontSizeContext } from '../../context/fontSizeContext'
import { BottomInfo, Button, CardDetalhes, CardFeed, DetalhesContainer, DetalhesContent, DetalhesFoto, DetalhesFotoContainer, DetalhesFotoImg, DetalhesInfoContainer, FeedMarcas, Info, Informacoes, InformacoesContainer, TopInfo } from './styles.ts'
import { getImagem, getMarca, getPessoaPorIdMarca, headersRequest } from '../../api/api.ts'
import { useParams } from "react-router-dom"
import { UsuarioContext } from '../../context/UsuarioContext.tsx'
import { Marca, Pessoa } from '../../interface/index.tsx'
import { FormAtualizarMarca } from '../../components/FormAtualizarMarca/index.tsx'
import { Loading } from '../../components/Loading/index.tsx'
import { FileEdit } from 'lucide-react'
// import { ButtonNeutroTransparent } from '../../components/ButtonNeutroTransparent/index.tsx'
import { Dark, Light } from '../../GlobalStyle.ts'
import imagemPadrao from "./../../assets/img/Logo/INFLUENCE_CONNECT_SÍMBOLO_PRETO.png"
import { ButtonPrincipal } from '../../components/ButtonPrincipal/index.tsx'
import { MessageConfirmMarca } from '../../components/MessageConfirmMarca/index.tsx'

export const DetalhesMarcas: React.FC = () => {

    const { id } = useParams()

    const { darkMode } = useContext(ThemeContext)
    const { paragrafoSize } = useContext(FontSizeContext)
    const { usuario } = useContext(UsuarioContext)

    const [marca, setMarca] = useState<Marca>()
    const [pessoa, setPessoa] = useState<Pessoa>()
    const [perfil, setPerfil] = useState<string>()
    const [feed1, setFeed1] = useState<string>()
    const [feed2, setFeed2] = useState<string>()
    const [feed3, setFeed3] = useState<string>()
    const [background, setBackground] = useState<string>()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false)


    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingPessoa, setIsLoadingPessoa] = useState(true)
    const [isLoadingImgPerfil, setIsLoadingImgPerfil] = useState<boolean>(true)
    const [isLoadingImgFeed1, setIsLoadingImgFeed1] = useState<boolean>(true)
    const [isLoadingImgFeed2, setIsLoadingImgFeed2] = useState<boolean>(true)
    const [isLoadingImgFeed3, setIsLoadingImgFeed3] = useState<boolean>(true)
    const [isLoadingImgBackground, setIsLoadingImgBackground] = useState<boolean>(true)
    const [isLoadingGlobal, setIsLoadingGlobal] = useState<boolean>(true)

    const [entered, setEntered] = useState<boolean>(true)
    const [enteredPessoa, setEnteredPessoa] = useState<boolean>(true)
    const [enteredPerfil, setEnteredPerfil] = useState<boolean>(true)
    const [enteredFeed1, setEnteredFeed1] = useState<boolean>(true)
    const [enteredFeed2, setEnteredFeed2] = useState<boolean>(true)
    const [enteredFeed3, setEnteredFeed3] = useState<boolean>(true)
    const [enteredBackground, setEnteredBackground] = useState<boolean>(true)

    const { header } = headersRequest()
    const isAdmin = usuario && usuario.pessoa && usuario.pessoa.role === 'ADMIN'

    useEffect(() => {
        getMarcaDetalhes()
        getPessoaMarca()
        handleFotoPerfil()
        handleFotoFeed1()
        handleFotoFeed2()
        handleFotoFeed3()
        handleFotoBackground()
        handlePageLoading()
    }, [
        isLoading,
        isLoadingPessoa,
        isLoadingImgPerfil,
        isLoadingImgFeed1,
        isLoadingImgFeed2,
        isLoadingImgFeed3,
        isLoadingImgBackground,
        isLoadingGlobal
    ])

    function getMarcaDetalhes() {
        if (entered && isLoading) {
            setEntered(false)
            getMarca(id, header)
                .then(response => {

                    setMarca(response.data)
                })
                .catch(error => {

                    console.log(error.data)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    function getPessoaMarca() {
        if (enteredPessoa && !isLoading && isLoadingPessoa) {
            setEnteredPessoa(false)
            getPessoaPorIdMarca(marca?.id, header)
                .then(response => {
                    setPessoa(response.data)
                })
                .catch(error => {
                    console.log(error.data)
                })
                .finally(() => {
                    setIsLoadingPessoa(false)
                })
        }
    }

    const handleFotoPerfil = () => {
        if (enteredPerfil && !isLoading && isLoadingImgPerfil) {
            setEnteredPerfil(false)
            if (marca?.imgPerfil === null) {
                setPerfil(imagemPadrao)
                setIsLoadingImgPerfil(false)
            } else {
                getImagem(marca?.imgPerfil, 'empresas', header)
                    .then(response => {
                        var imageUrl = URL.createObjectURL(response.data)
                        setPerfil(imageUrl)
                    })
                    .catch(error => {
                        console.log(error.data)
                    })
                    .finally(() => {
                        setIsLoadingImgPerfil(false)
                    })
            }
        }
    }

    const handleFotoFeed1 = () => {
        if (enteredFeed1 && !isLoading && isLoadingImgFeed1) {
            setEnteredFeed1(false)
            if (marca?.imgFeed1 === null) {
                setFeed1(imagemPadrao)
                setIsLoadingImgFeed1(false)
            } else {
                getImagem(marca?.imgFeed1, 'empresas', header)
                    .then(response => {
                        var imageUrl = URL.createObjectURL(response.data)
                        setFeed1(imageUrl)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => {
                        setIsLoadingImgFeed1(false)
                    })
            }
        }
    }

    const handleFotoFeed2 = () => {
        if (enteredFeed2 && !isLoading && isLoadingImgFeed2) {
            setEnteredFeed2(false)
            if (marca?.imgFeed2 === null) {
                setFeed2(imagemPadrao)
                setIsLoadingImgFeed2(false)
            } else {
                getImagem(marca?.imgFeed2, 'empresas', header)
                    .then(response => {
                        var imageUrl = URL.createObjectURL(response.data)
                        setFeed2(imageUrl)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => {
                        setIsLoadingImgFeed2(false)
                    })
            }
        }
    }

    const handleFotoFeed3 = () => {
        if (enteredFeed3 && !isLoading && isLoadingImgFeed3) {
            setEnteredFeed3(false)
            if (marca?.imgFeed3 === null) {
                setFeed3(imagemPadrao)
                setIsLoadingImgFeed3(false)
            } else {
                getImagem(marca?.imgFeed3, 'empresas', header)
                    .then(response => {
                        var imageUrl = URL.createObjectURL(response.data)
                        setFeed3(imageUrl)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => {
                        setIsLoadingImgFeed3(false)
                    })
            }
        }
    }
    const handleFotoBackground = () => {
        if (enteredBackground && !isLoading && isLoadingImgBackground) {
            setEnteredBackground(false)
            if (marca?.imgBackground === null) {
                setBackground(imagemPadrao)
                setIsLoadingImgBackground(false)
            } else {
                getImagem(marca?.imgBackground, 'empresas', header)
                    .then(response => {
                        var imageUrl = URL.createObjectURL(response.data)
                        setBackground(imageUrl)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => {
                        setIsLoadingImgBackground(false)
                    })
            }
        }
    }

    const handlePageLoading = () => {
        if (
            !isLoading &&
            !isLoadingPessoa &&
            !isLoadingImgPerfil &&
            !isLoadingImgFeed1 &&
            !isLoadingImgFeed2 &&
            !isLoadingImgFeed3 &&
            !isLoadingImgBackground
        ) {
            setIsLoadingGlobal(false)
        }
    }

    return (

        <>
            {
                isLoadingGlobal &&
                <Loading />
            }
            <DetalhesContent $background={background}>
                <DetalhesContainer>
                    <CardDetalhes $darkmode={darkMode}>
                        <Informacoes>
                            <TopInfo>
                                {isAdmin && (
                                    <Button onClick={() => setIsModalOpen(!isModalOpen)}>
                                        <FileEdit aria-label='Icone de Editar Marca' size={50} color={darkMode ? Light : Dark} />
                                    </Button>
                                )}
                                {isModalOpen && marca && (
                                    <FormAtualizarMarca
                                        id={id !== undefined ? Number(id) : 0}
                                        setIsMenuOpen={setIsModalOpen}
                                        isMenuOpen={isModalOpen}
                                    />
                                )}
                            </TopInfo>
                            <Info>
                                <DetalhesFotoContainer>
                                    <DetalhesFoto $darkmode={darkMode}>
                                        <DetalhesFotoImg src={perfil} alt={marca?.nome} />
                                    </DetalhesFoto>
                                </DetalhesFotoContainer>
                                <DetalhesInfoContainer>
                                    <InformacoesContainer
                                        $darkmode={darkMode}
                                        $fontSizeLabel={`${paragrafoSize}rem`}
                                    >
                                        <strong>Nome da Empresa: </strong>{marca?.nome}<br />
                                        <strong>Resposável pela Empresa: </strong>{pessoa?.nome}<br />
                                        <strong>Nicho: </strong>{marca?.segmento}<br />
                                    </InformacoesContainer>

                                    <ButtonPrincipal
                                        onClick={() => setIsMessageOpen(!isMessageOpen)}
                                    >

                                        {
                                            marca !== undefined &&
                                                marca.ativo ?
                                                "Desativar marca" :
                                                "Ativar marca"
                                        }
                                    </ButtonPrincipal>

                                </DetalhesInfoContainer>
                            </Info>
                            <BottomInfo />
                        </Informacoes>
                    </CardDetalhes>
                    <CardFeed>
                        <FeedMarcas>
                            <img src={feed1} alt={`feed1`} />
                            <img src={feed2} alt={`feed2`} />
                            <img src={feed3} alt={`feed3`} />
                        </FeedMarcas>
                    </CardFeed>
                </DetalhesContainer>
            </DetalhesContent >

            {
                isMessageOpen && marca &&
                <MessageConfirmMarca
                    marca={marca}
                    setIsMenuOpen={setIsMessageOpen}
                    isMenuOpen={isMessageOpen}
                />
            }
        </>
    )
} 
