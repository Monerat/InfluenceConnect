import { useContext, useEffect, useState } from "react"
import {
  BottomInfo, CardDetalhes, CardFeed, DetalhesContainer, DetalhesContent, DetalhesFoto, DetalhesFotoContainer, DetalhesFotoImg, DetalhesInfoContainer, FeedMarcas, Info, Informacoes, InformacoesContainer, Button, Banner, ModalWrapper, ModalContent, ModalButton, InfluenciadorFotoImg,
} from './styles.ts'

import imagemPadrao from "./../../assets/img/Logo/INFLUENCE_CONNECT_SÍMBOLO_PRETO.png"
import { ThemeContext } from "../../context/themeContext";
import { FontSizeContext } from "../../context/fontSizeContext";
import { Loading } from "../../components/Loading";
import { UsuarioContext } from "../../context/UsuarioContext";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCampanhaPorId, getImagem, headersRequest, putEntidade } from "../../api/api";
import { Campanha, CampanhaInfluenciadores } from "../../interface";
import { PenLine, Plus, XCircle } from "lucide-react";
import { FormularioAtualizarCampanha } from "../../components/FormAtualizarCampanha/index.tsx";
import { handleDate, handleMoney } from "../../common/Utils/index.tsx";
import { CarrinhoInfluencersContext } from "../../context/carrinhoInfluencers.tsx";
import { ButtonNeutro } from "../../components/ButtonNeutro/index.tsx";

export const DetalhesCampanha = () => {

  const { id } = useParams()

  const { darkMode } = useContext(ThemeContext)
  const { paragrafoSize } = useContext(FontSizeContext)
  const { usuario } = useContext(UsuarioContext)
  const { setCampanha: setCampanhaContext, setInfluencersCampanhas } = useContext(CarrinhoInfluencersContext)

  const [campanha, setCampanha] = useState<Campanha>()
  const [listaInfluencers, setListaInfluencers] = useState<CampanhaInfluenciadores[]>()
  const [perfil, setPerfil] = useState<string>()
  const [feed1, setFeed1] = useState<string>()
  const [feed2, setFeed2] = useState<string>()
  const [feed3, setFeed3] = useState<string>()
  const [background, setBackground] = useState<string>()

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingImgPerfil, setIsLoadingImgPerfil] = useState<boolean>(true)
  const [isLoadingImgFeed1, setIsLoadingImgFeed1] = useState<boolean>(true)
  const [isLoadingImgFeed2, setIsLoadingImgFeed2] = useState<boolean>(true)
  const [isLoadingImgFeed3, setIsLoadingImgFeed3] = useState<boolean>(true)
  const [isLoadingImgBackground, setIsLoadingImgBackground] = useState(true)

  const [isLoadingGlobal, setIsLoadingGlobal] = useState<boolean>(true)
  const [entered, setEntered] = useState<boolean>(true)
  const [enteredPerfil, setEnteredPerfil] = useState<boolean>(true)
  const [enteredFeed1, setEnteredFeed1] = useState<boolean>(true)
  const [enteredFeed2, setEnteredFeed2] = useState<boolean>(true)
  const [enteredFeed3, setEnteredFeed3] = useState<boolean>(true)
  const [enteredBackground, setEnteredBackground] = useState<boolean>(true)

  const [profilesImgs, setProfilesImgs] = useState<string[]>([])


  const { header } = headersRequest()
  const isAdmin = usuario && usuario.pessoa && usuario.pessoa.role === 'ADMIN'

  const [isEditing, setIsEditing] = useState(false);
  const [orcamentoValue, setOrcamentoValue] = useState<number | undefined>(
    campanha?.orcamento || undefined
  );
  const [avisoOrcamento, setAvisoOrcamento] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isCampanhaAtiva, setIsCampanhaAtiva] = useState(true);
  const [showConfirmationReactivate, setShowConfirmationReactivate] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    getCampanhaDetalhes()
    handleFotoPerfil()
    handleFotoFeed1()
    handleFotoFeed2()
    handleFotoFeed3()
    handleFotoBackground()
    handlePageLoading()
    handleImgsProfiles()
  }, [
    isLoading,
    isLoadingImgPerfil,
    isLoadingImgFeed1,
    isLoadingImgFeed2,
    isLoadingImgFeed3,
    isLoadingImgBackground,
    isLoadingGlobal
  ])

  function getCampanhaDetalhes() {
    if (entered && isLoading) {
      setEntered(false)
      getCampanhaPorId(id, header)
        .then(response => {
          setListaInfluencers(response.data.campanhaInfluenciadores)
          setCampanha(response.data)
          setIsCampanhaAtiva(response.data.ativo)
        })
        .catch(error => {
          console.log(error.data)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  const handleFotoPerfil = () => {
    if (enteredPerfil && !isLoading && isLoadingImgPerfil) {
      setEnteredPerfil(false)
      if (campanha?.imgPerfil === null) {
        setPerfil(imagemPadrao)
        setIsLoadingImgPerfil(false)
      } else {
        getImagem(campanha?.imgPerfil, 'empresas', header)
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
      if (campanha?.imgFeed1 === null) {
        setFeed1(imagemPadrao)
        setIsLoadingImgFeed1(false)
      } else {
        getImagem(campanha?.imgFeed1, 'empresas', header)
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
      if (campanha?.imgFeed2 === null) {
        setFeed2(imagemPadrao)
        setIsLoadingImgFeed2(false)
      } else {
        getImagem(campanha?.imgFeed2, 'empresas', header)
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
      if (campanha?.imgFeed3 === null) {
        setFeed3(imagemPadrao)
        setIsLoadingImgFeed3(false)
      } else {
        getImagem(campanha?.imgFeed3, 'empresas', header)
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

    if (enteredBackground && isLoadingImgBackground && !isLoading) {
      setEnteredBackground(false)
      if (campanha?.imgBackground === null) {
        setBackground(imagemPadrao)
        setIsLoadingImgBackground(false)
      } else {
        getImagem(campanha?.imgBackground, "campanhas", header)
          .then((response) => {
            var imageUrl = URL.createObjectURL(response.data)
            setBackground(imageUrl)
          })
          .catch((error) => {
            console.log(error.data)
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
      !isLoadingImgPerfil &&
      !isLoadingImgFeed1 &&
      !isLoadingImgFeed2 &&
      !isLoadingImgFeed3
    ) {
      setIsLoadingGlobal(false)
    }
  }

  const handleSetCampanhaContext = () => {

    if (campanha !== undefined) {

      setCampanhaContext(campanha)
      setInfluencersCampanhas(campanha.campanhaInfluenciadores)
    }

    navigate('/influencers')
  }

  const atualizarOrcamento = async (novoOrcamento: number) => {
    if (campanha && campanha.orcamento !== undefined && novoOrcamento < campanha.orcamento) {
      setAvisoOrcamento(true);
      return;
    }

    try {
      const response = await putEntidade(`campanhas/${id}`, { orcamento: novoOrcamento }, header);
      console.log(response);

      if (campanha) {
        setCampanha({ ...campanha, orcamento: novoOrcamento });
      }

      setIsEditing(false);

      setAvisoOrcamento(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isEditing && campanha?.orcamento !== undefined) {
      setOrcamentoValue(campanha.orcamento);
    }
  }, [isEditing, campanha]);

  const desativarCampanha = async () => {
    try {
      const response = await putEntidade(`campanhas/${id}`, { ativo: false }, header);
      console.log(response);

      if (campanha) {
        setCampanha({ ...campanha, ativo: false });
      }

      setIsCampanhaAtiva(false);
      setShowConfirmation(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDesativarCampanha = () => {
    setShowConfirmation(true);
  };

  const handleConfirmarOperacao = async () => {
    if (isCampanhaAtiva) {
      await desativarCampanha();
    } else {
      await handleReativarCampanha();
    }
  };

  const handleCancelarOperacao = () => {
    setShowConfirmation(false);
  };

  const handleReativarCampanha = () => {
    setShowConfirmationReactivate(true);
  };

  const handleConfirmarReativacao = async () => {
    try {
      const response = await putEntidade(`campanhas/${id}`, { ativo: true }, header);
      console.log(response);

      if (campanha) {
        setCampanha({ ...campanha, ativo: true });
      }

      setIsCampanhaAtiva(true);
      setShowConfirmationReactivate(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelarReativacao = () => {
    setShowConfirmationReactivate(false);
  };

  const handleImgsProfiles = () => {
    if (listaInfluencers) {
      const influencerImagePromises = listaInfluencers.map((influencer) => {

        if (influencer.influenciador !== undefined) {

          return getImagem(influencer.influenciador.imgPerfil, 'influenciadores', header)
            .then((response) => URL.createObjectURL(response.data))
            .catch((error) => {
              console.log(`Error fetching influencer image: ${error}`);
              return null;
            });
        }
      });

      Promise.all(influencerImagePromises)
        .then((imageUrls) => {
          setProfilesImgs(imageUrls.filter((imageUrl) => imageUrl !== null) as string[]);
        })
        .catch((error) => {
          console.log(`Error fetching influencer images in parallel: ${error}`);
        });
    }
  }

  return (
    <>
      {
        isLoadingGlobal &&
        <Loading />
      }
      <DetalhesContent $darkmode={darkMode}>
        <Banner style={{ backgroundImage: `url(${background})` }}></Banner>
        <DetalhesContainer>

          <CardDetalhes $darkmode={darkMode}>

            <Informacoes>
              <Info>
                <DetalhesFotoContainer>
                  <DetalhesFoto $darkmode={darkMode}>
                    <DetalhesFotoImg src={perfil} alt={campanha?.nome} />
                  </DetalhesFoto>
                </DetalhesFotoContainer>
                <DetalhesInfoContainer>

                  <InformacoesContainer $darkmode={darkMode} $fontSizeLabel={`${paragrafoSize}rem`}>
                    {campanha && !campanha.ativo && (
                      <strong style={{ color: 'red' }}>Campanha desativada</strong>
                    )}<br />
                    <strong>Nome da Campanha: </strong>{campanha?.nome}<br />
                    <strong>Inicio da Campanha: </strong>{handleDate(campanha?.inicioCampanha)}<br />
                    <strong>Encerramento Campanha: </strong>{handleDate(campanha?.encerramentoCampanha)}<br />

                    {isEditing ? (
                      <>
                        <input
                          type="number"
                          value={orcamentoValue}
                          onChange={(e) => setOrcamentoValue(Number(e.target.value))}
                          min={campanha?.orcamento}
                        />
                        <ButtonNeutro
                          onToggle={() => orcamentoValue && atualizarOrcamento(orcamentoValue)}
                          label="Salvar novo orçamento"
                        >
                          Salvar
                        </ButtonNeutro>
                        <XCircle
                          size={20}
                          onClick={() => setIsEditing(false)}
                          style={{ color: 'red', marginLeft: '10px', cursor: 'pointer', verticalAlign: 'middle' }}
                        />
                      </>
                    ) : (
                      <div>
                        <strong>Orçamento da Campanha: </strong>
                        {handleMoney(campanha?.orcamento)}
                        <PenLine
                          size={20}
                          onClick={() => setIsEditing(true)}
                          style={{ color: 'gray', marginLeft: '10px', cursor: 'pointer', verticalAlign: 'middle' }}
                        />
                      </div>
                    )}
                    {avisoOrcamento && (
                      <div style={{ color: 'red', fontSize: '0.8em' }}>
                        O novo orçamento não pode ser menor do que o orçamento atual.
                      </div>
                    )}
                    <br />

                    <strong>Valor que já foi gasto Gasto: </strong>{handleMoney(campanha?.valorGasto)}<br />
                    <strong>Valor ainda disponivel: </strong>{campanha?.orcamento !== undefined && campanha?.valorGasto !== undefined
                      ? handleMoney(campanha?.orcamento - campanha?.valorGasto)
                      : 'N/A'}<br />
                    <strong>Nicho: </strong>{campanha?.nicho}<br />
                    <strong>Influenciadores da campanha: </strong>

                    <div className="influencersImgs">

                      {
                        listaInfluencers?.map((influencer, index) => {

                          if (influencer.influenciador !== undefined) {

                            return (

                              < div key={influencer.influenciador.id} >
                                <Link
                                  to={`/influencers/${influencer.influenciador.id}`}>
                                  <InfluenciadorFotoImg
                                    src={profilesImgs[index]}
                                    alt={`foto de perfil do ${influencer.influenciador.nomeFantasia}`}
                                  />
                                </Link>
                              </div>
                            )
                          }
                        })

                      }

                      <ButtonNeutro label='Adicionar influenciadores a campanha' onToggle={handleSetCampanhaContext}>
                        <Plus aria-label="Icone Adicionar Influenciador a campanha" size={24} />
                      </ButtonNeutro>

                    </div>
                  </InformacoesContainer>
                </DetalhesInfoContainer>
              </Info>
              <BottomInfo />
            </Informacoes>

            <>
              {isAdmin && (
                <>
                  <Button aria-label="Atualizar Campanha"
                    $background={darkMode}
                    $fontSizeLabel={`${paragrafoSize}rem`}
                    onClick={() => setIsModalOpen(!isModalOpen)}
                  >
                    Atualizar Campanha
                  </Button>

                  {isModalOpen && campanha && (
                    <FormularioAtualizarCampanha
                      id={campanha?.id}
                      setIsMenuOpen={setIsModalOpen}
                      isMenuOpen={isModalOpen}
                    />
                  )}
                </>
              )}

              <Button
                $background={darkMode}
                $fontSizeLabel={`${paragrafoSize}rem`}
                onClick={isCampanhaAtiva ? handleDesativarCampanha : handleReativarCampanha}>
                {isCampanhaAtiva ? 'Desativar Campanha' : 'Reativar Campanha'}
              </Button>

              {showConfirmation && (
                <ModalWrapper>
                  <ModalContent>
                    <p>{isCampanhaAtiva ? 'Tem certeza que deseja desativar a campanha?' : 'Deseja reativar a campanha?'}</p>
                    <ModalButton>
                      <ButtonNeutro onToggle={handleConfirmarOperacao} label="Confirmar Operação">Confirmar</ButtonNeutro>
                      <ButtonNeutro onToggle={handleCancelarOperacao} label="Cancelar Operação">Cancelar</ButtonNeutro>
                    </ModalButton>
                  </ModalContent>
                </ModalWrapper>
              )}

              {showConfirmationReactivate && (
                <ModalWrapper>
                  <ModalContent>
                    <p>Tem certeza que deseja reativar a campanha?</p>
                    <ModalButton>
                      <ButtonNeutro onToggle={handleConfirmarReativacao} label="Confirmar Operação">Confirmar</ButtonNeutro>
                      <ButtonNeutro onToggle={handleCancelarReativacao} label="Cancelar Operação">Cancelar</ButtonNeutro>
                    </ModalButton>
                  </ModalContent>
                </ModalWrapper>
              )}
            </>

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

      {isModalOpen && campanha && (
        <FormularioAtualizarCampanha
          id={campanha?.id}
          setIsMenuOpen={setIsModalOpen}
          isMenuOpen={isModalOpen}
        />
      )
      }
    </>
  )
}