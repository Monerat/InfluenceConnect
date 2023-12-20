import { useContext, useEffect, useState } from "react"

import { ThemeContext } from "../../context/themeContext"

import { CarrinhoInfluencersContext } from "../../context/carrinhoInfluencers"

import { CardCampanhaInfluenciador } from "../../components/CardCampanhaInfluenciador"
import { BackgroundStyle, Border, Container, ContainerCards } from "./styles"
import { ButtonPrincipal } from "../../components/ButtonPrincipal"
import { Title } from "../../components/Title"
import { handleDate, handleNumero } from "../../common/Utils"
import { headersRequest, putEntidade } from "../../api/api"
import { CampanhaInfluenciadores } from "../../interface"
import { Modal } from "../../components/Modal"
import { useNavigate } from "react-router-dom"

export const AdicionarInfluecerCampanha = () => {

    const { darkMode } = useContext(ThemeContext)
    const { campanha, influencersCampanhas } = useContext(CarrinhoInfluencersContext)

    let valorInicial = campanha.valorGasto === null ? 0 : campanha.valorGasto

    const [valorTotal, setValorTotal] = useState<number>(valorInicial)
    const [quantidadesPosts, setQuantidadesPosts] = useState<number[]>([])
    const [subtotais, setSubTotal] = useState<number[]>([])
    const [naoEntrou, setNaoEntrou] = useState<boolean>(true)
    const [idMap, setIdMap] = useState<number[]>([])

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [errorString, setErrorString] = useState<string>('')

    const { header } = headersRequest()
    const navigate = useNavigate()

    useEffect(() => {
        inicializarVetorDeQuantidade()
        handleCalcularValorTotal()
    }, [quantidadesPosts])

    const handleEnviarRequisicao = () => {
        const influencersCampanhasAtualizadas: CampanhaInfluenciadores[] = influencersCampanhas.filter((_, index) => quantidadesPosts[index] !== undefined);

        let requisicaoJson = {
            "campanhaInfluenciadores":
                influencersCampanhasAtualizadas.map((influencerCampanha) => {

                    if (influencerCampanha.influenciador?.id !== undefined) {

                        return (

                            {
                                "quantidade": quantidadesPosts[idMap.findIndex((idmap) => idmap === influencerCampanha.id)],
                                "idRedeSocial": influencerCampanha.idRedeSocial,
                                "influenciador": {
                                    "id": influencerCampanha.influenciador.id
                                }
                            }
                        )
                    }
                })
        }

        putEntidade(`campanhas/${campanha.id}`, requisicaoJson, header)
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

    const inicializarVetorDeQuantidade = () => {
        if (naoEntrou) {
            setNaoEntrou(false);
            influencersCampanhas.forEach((influencerCampanha) => {
                setIdMap((oldState) => [...oldState, influencerCampanha.id]);
                setQuantidadesPosts((prevPostsArray) => {
                    const newPostsArray = [...prevPostsArray];
                    const currentIndex = idMap.length - 1;
                    newPostsArray[currentIndex] = influencerCampanha.quantidade;
                    return newPostsArray;
                });
            });
        }
    };

    const updatePosts = (index: number, newPosts: number) => {
        setQuantidadesPosts((prevPostsArray) => {
            const newPostsArray = [...prevPostsArray];
            newPostsArray[index] = newPosts;
            return newPostsArray;
        });
    };

    const updateSubtotal = (index: number, newSubtotal: number) => {
        setSubTotal((prevSubtotalArray) => {
            const newSubtotalArray = [...prevSubtotalArray];
            newSubtotalArray[index] = newSubtotal;
            return newSubtotalArray;
        });
    };

    const handleCalcularValorTotal = () => {

        let subValorTotal: number = 0

        subtotais.forEach(subTotal => {
            if (subTotal != undefined) {
                subValorTotal += subTotal
            }
        })
        setValorTotal(valorInicial + subValorTotal)
    }

    return (

        <BackgroundStyle>

            {
                campanha.nome === '' &&
                <Title> Nenhuma campanha selecionada </Title>
            }

            {campanha.nome !== '' && <Border>

                <Container
                    $darkMode={darkMode}
                >
                    <Title>
                        Adicionar influenciadores a campanha
                    </Title>

                    <div className="infoCampanha">
                        <strong>Nome da campanha:</strong> {campanha.nome}
                        <section>
                            <strong>Data de inicio:</strong> {handleDate(campanha.inicioCampanha)}
                            <strong>Data de encerramento:</strong> {handleDate(campanha.encerramentoCampanha)}
                        </section>
                        <strong>Segmento:</strong> {campanha.nicho}
                    </div>

                    <ContainerCards>
                        {influencersCampanhas.map((influencerCampanha, index) => (
                            <CardCampanhaInfluenciador
                                key={index}
                                influencerCampanha={influencerCampanha}
                                updatePosts={(newPosts) => updatePosts(index, newPosts)}
                                updateSubtotal={(newSubtotal) => updateSubtotal(index, newSubtotal)}
                            />
                        ))}
                    </ContainerCards>

                    <div className="orcamento">
                        <strong>Orçamento: </strong>
                        {
                            valorTotal < (campanha.orcamento * 0.8)
                                ? <span style={{ color: 'green' }}>
                                    R$ {handleNumero(campanha.orcamento)}
                                </span>
                                : valorTotal < campanha.orcamento
                                    ? <span style={{ color: 'orange' }}>
                                        R$ {handleNumero(campanha.orcamento)}
                                    </span>
                                    : <span style={{ color: 'red' }}>
                                        R$ {handleNumero(campanha.orcamento)}
                                    </span>
                        }
                        <br />

                        <strong>Total gasto: </strong>R$ {handleNumero(valorTotal)}
                    </div>

                    <div className="butoes">

                        <ButtonPrincipal
                            onClick={handleEnviarRequisicao}
                        >
                            Confirmar
                        </ButtonPrincipal>
                    </div>
                </Container>
            </Border>}

            {
                isModalOpen &&
                <Modal>
                    <h1 style={{ color: "green" }}>
                        Os influenciadores foram adicionados a campanha
                    </h1>
                </Modal>
            }

            {
                error &&
                <Modal>
                    {errorString}
                </Modal>
            }
        </BackgroundStyle>
    )
}