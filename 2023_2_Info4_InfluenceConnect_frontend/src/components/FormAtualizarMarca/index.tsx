import { useContext, useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { AtualizarMarcasData, FormularioAtualizarProps } from '../../interface'

import { AtualizarDadosResponsavelMarca } from '../../components/DadosResponsavelMarca'
import { Title } from '../../components/Title'
import { ImagensMarca } from '../../components/ImagensMarca'
import { ButtonPrincipal } from '../../components/ButtonPrincipal'
import { AtualizarDadosMarcas } from '../../components/DadosEmpresa'
import { Modal } from '../../components/Modal'

import { Background, Container } from './styles'

import { FontSizeContext } from '../../context/fontSizeContext'
import { ThemeContext } from '../../context/themeContext'

import { atualizarMarcaSchema } from '../../schemas'

import { api, headersRequest, postEntidade, putEntidade } from '../../api/api'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const FormAtualizarMarca: React.FC<FormularioAtualizarProps> = (

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
    const [idPessoa, setIdPessoa] = useState<number>(0)
    const [idEndereco, setIdEndereco] = useState<number>(0)
    const [isLoadingEmpresas, setIsLoadingEmpresas] = useState<boolean>(true)
    const [isLoadingPessoas, setIsLoadingPessoas] = useState<boolean>(true)
    const [isLoadingImagens, setIsLoadingImagens] = useState<boolean>(true)
    const [isLoadingEnderecos, setIsLoadingEnderecos] = useState<boolean>(true)

    useEffect(() => {

        api.get(`empresas/pessoa/${id}`, { headers: header })
            .then(response => {
                setIdPessoa(response.data.id)
                setIdEndereco(response.data.enderecos[0].id)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        handleLoadingPage()
    }, [isLoadingEnderecos,
        isLoadingEmpresas,
        isLoadingPessoas, 
        isLoadingImagens,
        erroAconteceu])

    const handleLoadingPage = () => {

        if(
            !isLoadingEnderecos &&
            !isLoadingEmpresas &&
            !isLoadingPessoas &&
            !isLoadingImagens &&
            !erroAconteceu
        ){
            setIsModalOpen(true)
            setTimeout(() => {
                
                navigate('/marcas')
            }, 2000)
        }
    }

    const atualizarMarcaForm = useForm<AtualizarMarcasData>({

        resolver: zodResolver(atualizarMarcaSchema)
    })

    const { handleSubmit } = atualizarMarcaForm

    const atualizarMarca = async (data: AtualizarMarcasData) => {

        setIsLoadingEnderecos(true)
        setIsLoadingEmpresas(true)
        setIsLoadingPessoas(true)
        setIsLoadingImagens(true)
        setErroAconteceu(false)

        const {

            cnpj,
            cpf,
            cep,
            numero,
            email,
            imagens,
            nome,
            tipoEndereco,
            nomeEmpresa,
            segmento,
            senha

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

        const marca = {

            ativo: true,
            cnpj: cnpj != "" ? cnpj : null,
            nome: nomeEmpresa != "" ? nomeEmpresa : null,
            segmento: segmento != "" ? segmento : null
        }

        const pessoa = {

            nome: nome != "" ? nome : null,
            cpf: cpf != "" ? cpf : null,
            role: null,
            email: email != "" ? email : null,
            senha: senha != "" ? senha : null
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

        const handleEmpresas = () => {

            if(Object.values(marca).some(value => value != null)){
                putEntidade(`empresas/${id}`, marca, header)
                .then((response) => {

                    console.log(response)
                    console.log("ENTROU EM EMPRESAS")
                })
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

                    setIsLoadingEmpresas(false)
                })
            } else {
                
                setIsLoadingEmpresas(false)
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
                
                postEntidade(`empresas/imagem/${id}`, imagens, headersImg)
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

        const handlePessoas = () => {

            if(Object.values(pessoa).some(value => value != null)){

                putEntidade(`pessoas/${idPessoa}`, pessoa, header)
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

                    setIsLoadingPessoas(false)
                })
                
            } else {

                setIsLoadingPessoas(false)
            }

        }

        const updateData = async () => {
            await handleEnderecos()
            await handleImagens()
            await handleEmpresas()
            await handlePessoas()
        }

        try {
            
            await updateData()

        } catch (error) {

            console.error(error);
        }

        console.log(erroAconteceu)
    }

    return (

        <FormProvider {...atualizarMarcaForm}>
            <Background>

                <Container
                    onSubmit={handleSubmit(atualizarMarca)}
                    onReset={() => setIsMenuOpen(!isMenuOpen)}
                    $fontSize={`${paragrafoSize}rem`}
                    $darkMode={darkMode}
                >

                    <Title>
                        Atualizar empresa parceira
                    </Title>

                    <fieldset>

                        <legend>Dados da empresa</legend>

                        <AtualizarDadosMarcas />
                    </fieldset>

                    <fieldset>

                        <legend>Dados do responsavel</legend>

                        <AtualizarDadosResponsavelMarca />
                    </fieldset>

                    <fieldset>

                        <legend>Imagens</legend>

                        <ImagensMarca />
                    </fieldset>

                    <div className="butoes">

                        <ButtonPrincipal>
                            <button
                                type='reset'
                            >
                                cancelar
                            </button>
                        </ButtonPrincipal>

                        <ButtonPrincipal>

                            <button type='submit'>
                                confirmar
                            </button>
                        </ButtonPrincipal>

                    </div>
                </Container>

                {
                    isModalOpen &&
                    !erroAconteceu &&
                    <Modal>
                        <h1 style={{ color: 'green' }}>
                            Empresa atualizada com sucesso
                        </h1>
                        
                    </Modal>
                }

                {
                    error &&
                    <Modal>
                        {errorMessage}
                    </Modal>
                }

            </Background>
        </FormProvider>
    )
}
