import { useContext, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { CreateMarcasData } from '../../interface'

import { DadosResponsavelMarca } from '../../components/DadosResponsavelMarca'
import { Title } from '../../components/Title'
import { ImagensMarca } from '../../components/ImagensMarca'
import { ButtonPrincipal } from '../../components/ButtonPrincipal'
import { DadosMarcas } from '../../components/DadosEmpresa'
import { Modal } from '../../components/Modal'

import { Formulario } from '../../GlobalStyle'
import { Background } from './styles'

import { FontSizeContext } from '../../context/fontSizeContext'
import { ThemeContext } from '../../context/themeContext'

import BackgroundImage from '../../assets/imagens/backgroundCadastroMarcas.jpg'

import { createMarcaSchema } from '../../schemas'

import axios from 'axios'
import { headersRequest, postEntidade } from '../../api/api'

import { useNavigate } from 'react-router-dom'

export const CadastroMarca = () => {

    const { darkMode } = useContext(ThemeContext)
    const { paragrafoSize } = useContext(FontSizeContext)

    const { header, headersImg } = headersRequest()

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<String>("")
    const [imagensExists, setImagensExist] = useState<boolean>(false)

    const navigate = useNavigate()

    const createMarcaForm = useForm<CreateMarcasData>({

        resolver: zodResolver(createMarcaSchema)
    })

    const { handleSubmit } = createMarcaForm

    const createMarca = async (data: CreateMarcasData) => {

        const {

            cep,
            cnpj,
            cpf,
            email,
            imagens,
            nome,
            nomeEmpresa,
            numero,
            segmento,
            senha
        } = data

        const response = await (await axios.get(`https://viacep.com.br/ws/${cep}/json/`)).data

        const {

            logradouro,
            complemento,
            bairro,
            localidade,
            uf

        } = response

        const marca = {

            ativo: true,
            cnpj: cnpj,
            nome: nomeEmpresa,
            segmento: segmento,
            pessoa: {

                nome: nome,
                cpf: cpf,
                role: 1,
                email: email,
                senha: senha,
                enderecos: [

                    {
                        tipoLogradouro: 'rua',
                        tipoEndereco: 0,
                        numero: numero,
                        cep: cep,
                        logradouro: logradouro,
                        complemento: complemento,
                        bairro: bairro,
                        cidade: localidade,
                        estado: uf
                    }
                ],
            },
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

        postEntidade('empresas', marca, header)
            .then(response => {

                console.log(response)

                const id = response.data.id

                if (imagensExists) {

                    postEntidade(`empresas/imagem/${id}`, imagens, headersImg)
                        .then(() => {

                            setIsModalOpen(true)

                            setTimeout(() => {

                                navigate('/marcas')
                            }, 2000) 
                        })
                        .catch(err => {

                            console.log(err)
                            setError(true)
                            setErrorMessage(err.response.data.message)

                            setTimeout(() => {

                                setError(false)
                            }, 2000) 
                        })
                } else {

                    setIsModalOpen(true)

                    setTimeout(() => {

                        navigate('/marcas')
                    }, 2000) 
                }

            }).catch(err => {

                if (marca.pessoa.enderecos[0].logradouro == undefined) {

                    console.log(err)
                    setError(true)
                    setErrorMessage("O CEP informado é inválido.")
                } else {

                    console.log(err)
                    setError(true)
                    setErrorMessage(err.response.data.message)
                }

                setTimeout(() => {

                    setError(false)
                }, 2000) 
            })
    }

    return (

        <FormProvider {...createMarcaForm}>
            <Background>

                <div
                    className='image'
                    style={{
                        background: `url(${BackgroundImage}) no-repeat fixed`,
                        backgroundSize: 'cover'
                    }}
                ></div>

                <Formulario
                    onSubmit={handleSubmit(createMarca)}
                    $darkMode={darkMode}
                    $fontSizeLabel={`${paragrafoSize}rem`}
                >

                    <Title>
                        Cadastre um empresa parceira
                    </Title>

                    <fieldset>

                        <legend>Dados da empresa</legend>

                        <DadosMarcas />
                    </fieldset>

                    <fieldset>

                        <legend>Dados do responsavel</legend>

                        <DadosResponsavelMarca />
                    </fieldset>

                    <fieldset>

                        <legend>Imagens</legend>

                        <ImagensMarca />
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
                            Empresa Cadastrada com sucesso !
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