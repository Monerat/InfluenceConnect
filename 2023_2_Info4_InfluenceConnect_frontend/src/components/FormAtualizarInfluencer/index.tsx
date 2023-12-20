import { useContext, useEffect, useState } from 'react'

import { atualizarInfluencerSchema } from '../../schemas'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Container, Background } from './styles'

import { ButtonPrincipal } from '../../components/ButtonPrincipal'
import { Title } from '../../components/Title'
import { AtualizarDadosPessoais } from '../../components/DadosPessoais'
import { Imagens } from '../../components/Imagens'
import { RedeSocial } from '../RedeSocial'
import { Nicho } from '../../components/DadosInfluencer'

import { FontSizeContext } from '../../context/fontSizeContext'
import { ThemeContext } from '../../context/themeContext'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AtualizarInfluencerData, FormularioAtualizarProps, PessoaResponse, } from '../../interface'
import { Modal } from '../../components/Modal'
import { api, headersRequest, postEntidade, putEntidade } from '../../api/api'

export const FormularioAtualizarInfluencer: React.FC<FormularioAtualizarProps> = (

    { id, setIsMenuOpen, isMenuOpen }
) => {

    const navigate = useNavigate()

    const { darkMode } = useContext(ThemeContext)
    const { paragrafoSize } = useContext(FontSizeContext)

    const { header, headersImg } = headersRequest()

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [erroAconteceu, setErroAconteceu] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<String>("")
    const [pessoaResponse, setPessoa] = useState<PessoaResponse>()
    const [idEndereco, setIdEndereco] = useState<number>(0)
    const [idNicho, setIdNicho] = useState<number>(0)
    const [isLoadingInfluenciadores, setIsLoadingInfluenciadores] = useState<boolean>(true)
    const [isLoadingPessoas, setIsLoadingPessoas] = useState<boolean>(true)
    const [isLoadingEnderecos, setIsLoadingEnderecos] = useState<boolean>(true)
    const [isLoadingNichos, setIsLoadingNichos] = useState<boolean>(true)
    const [isLoadingImagens, setIsLoadingImagens] = useState<boolean>(true)
    const [isLoadingRedesSociais, setIsLoadingRedesSociais] = useState<boolean>(true)

    useEffect(() => {

        api.get(`influenciadores/pessoa/${id}`, { headers: header })
            .then(response => {
                setPessoa(response.data)
                setIdEndereco(response.data.enderecos[0].id)
            })
            .catch(error => console.log(error)),

        api.get(`influenciadores/${id}`, { headers: header })
            .then(response => {
                setIdNicho(response.data.nicho.id)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        handleLoadingPage()
    }, [isLoadingInfluenciadores,
        isLoadingRedesSociais,
        isLoadingEnderecos,
        isLoadingImagens,
        isLoadingPessoas, 
        isLoadingNichos, 
        erroAconteceu])

    const handleLoadingPage = () => {

        if(
            !isLoadingInfluenciadores &&
            !isLoadingRedesSociais &&
            !isLoadingEnderecos &&
            !isLoadingImagens &&
            !isLoadingPessoas &&
            !isLoadingNichos &&
            !erroAconteceu
        ){
            setIsModalOpen(true)
            setTimeout(() => {
                
                navigate('/influencers')
            }, 2000)
        }
    }

    
    const atualizarInfluencerForm = useForm<AtualizarInfluencerData>({

        resolver: zodResolver(atualizarInfluencerSchema)
    })

    const atualizarInfluencer = async (data: AtualizarInfluencerData) => {

        setIsLoadingInfluenciadores(true)
        setIsLoadingRedesSociais(true)
        setIsLoadingEnderecos(true)
        setIsLoadingImagens(true)
        setIsLoadingPessoas(true)
        setIsLoadingNichos(true)
        setErroAconteceu(false)

        const {

            nome,
            nomeFantasia,
            email,
            cpf,
            cep,
            numero,
            redeSocial,
            imagens,
            tipoEndereco,
            nicho

        } = data

        const response = cep != "" ? await (await axios.get(`https://viacep.com.br/ws/${cep}/json/`)).data : null

        const {

            logradouro,
            complemento,
            bairro,
            localidade,
            uf

        } = response != null ? response : 
            {logradouro: null, complemento: null, bairro: null, localidade: null, uf: null}

        const influencer = {

            ativo: true,
            nomeFantasia: nomeFantasia != "" ? nomeFantasia : null
        }

        const pessoa = {

            nome: nome != "" ? nome : null,
            cpf: cpf != "" ? cpf : null,
            role: null,
            email: email != "" ? email : null
        }

        const {

            arroba,
            custoPubli,
            idRedeAtualizar,
            link,
            nomeRedeNova,
            quantidadeSeguidores,
            regiaoAtuacao,
            taxaEngajamento
        } = redeSocial

        const redeSocialRequest = {

            arroba: arroba != "" ? arroba : null,
            link: link != "" ? link : null,
            custoPubli: custoPubli != "" ? custoPubli : null,
            quantidadeSeguidores: quantidadeSeguidores != "" ? quantidadeSeguidores : null,
            taxaEngajamento: taxaEngajamento != "" ? taxaEngajamento : null,
            regiaoAtuacao: regiaoAtuacao != "" ? regiaoAtuacao : null,
            nomeRede: nomeRedeNova != "" ? nomeRedeNova : null
        }

        const {

            nomeNicho,
            descricao,
            faixaEtaria,
            genero

        } = nicho

        const nichoRequest = {

            nome: nomeNicho != "" ? nomeNicho : null,
            descricao: descricao != "" ? descricao : null,
            faixaEtaria: faixaEtaria != "" ? faixaEtaria : null,
            genero: genero != "" ? genero : null
        }

        const endereco = {

            tipoLogradouro: 'rua',
            tipoEndereco: tipoEndereco,
            numero: numero,
            cep: cep,
            logradouro: logradouro,
            complemento: complemento,
            bairro: bairro,
            cidade: localidade,
            estado: uf
        }

        const handleInfluenciadores = () => {

            if(Object.values(influencer).some(value => value != null)){

                putEntidade(`influenciadores/${id}`, influencer, header)
                .then()
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

                    setIsLoadingInfluenciadores(false)
                })
                
            } else {

                setIsLoadingInfluenciadores(false)
            }

        }

        const handlePessoas = () => {

            if(Object.values(pessoa).some(value => value != null)){

                putEntidade(`pessoas/${pessoaResponse?.id}`, pessoa, header)
                .then()
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

                    setIsLoadingPessoas(false)
                })
                
            } else {

                setIsLoadingPessoas(false)
            }

        }

        const handleRedesSociais = () => {

            if(idRedeAtualizar){
                
                putEntidade(`redessociais/${idRedeAtualizar}`, redeSocialRequest, header)
                .then()
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

                    setIsLoadingRedesSociais(false)
                })
                
            } else {

                setIsLoadingRedesSociais(false)
            }

        }

        const handleNichos = () => {

            if(Object.values(nichoRequest).some(value => value != null)){
                
                putEntidade(`nichos/${idNicho}`, nichoRequest, header)
                .then()
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

                    setIsLoadingNichos(false)
                })
                
            } else {

                setIsLoadingNichos(false)
            }

        }

        const handleEnderecos = () => {

            if(cep != "" && logradouro == null){
                
                setError(true)
                setErroAconteceu(true)
                setErrorMessage("Insira um CEP válido")

                setTimeout(() => {

                    setError(false)
                }, 2000)
            }

            if(logradouro != null){
                
                putEntidade(`enderecos/${idEndereco}`, endereco, header)
                .then()
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

                    setIsLoadingEnderecos(false)
                })
                
            } else {

                setIsLoadingEnderecos(false)
            }

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
                
                postEntidade(`influenciadores/imagem/${id}`, imagens, headersImg)
                .then()
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

        const updateData = async () => {
            await handleInfluenciadores()
            await handleRedesSociais()
            await handleEnderecos()
            await handleImagens()
            await handlePessoas()
            await handleNichos()
        }

        try {
            
            await updateData()

        } catch (error) {

            console.error(error);
        }
    }

    const {

        handleSubmit
    } = atualizarInfluencerForm

    return (

        <Background>
            <FormProvider {...atualizarInfluencerForm}>
                <Container
                    onReset={() => setIsMenuOpen(!isMenuOpen)}
                    onSubmit={handleSubmit(atualizarInfluencer)}
                    $fontSize={`${paragrafoSize}rem`}
                    $darkMode={darkMode}
                >
                    <Title>Atualize um influencer</Title>

                    <fieldset>

                        <AtualizarDadosPessoais />
                    </fieldset>

                    <fieldset>

                        <Nicho />
                    </fieldset>

                    <fieldset>

                        <RedeSocial id={`${id}`} />
                    </fieldset>

                    <fieldset>

                        <Imagens />
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
                        !erroAconteceu &&
                        <Modal>
                            <h1 style={{ color: 'green' }}>
                                Influencer Atualizado com sucesso
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
    )
}