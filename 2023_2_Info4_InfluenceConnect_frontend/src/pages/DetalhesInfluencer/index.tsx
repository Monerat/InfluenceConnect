import { useContext, useEffect, useState } from "react"

import {

  Container,
  Banner,
  ProfileImage,
  InfoContainer,
  FollowersContainer,
  PhotoGrid,
  ProfileContainer,
  RedeSocialContainer,
  InfoRedeSocial,
  NomeInfluenciador,
  NichoInfluenciador,
  RegiaoInfluenciador,
  Butoes
} from "./styles.ts"

import { getImagem, getInfluenciador, headersRequest } from "../../api/api.ts"

import { ThemeContext } from "../../context/themeContext.tsx"
import { FontSizeContext } from "../../context/fontSizeContext.tsx"
import { UsuarioContext } from "../../context/UsuarioContext.tsx"
import imagemPadrao from "./../../assets/img/Logo/INFLUENCE_CONNECT_SÍMBOLO_PRETO.png"
import { useParams } from "react-router-dom"
import { FormularioAtualizarInfluencer } from "../../components/FormAtualizarInfluencer/index.tsx"
import { CampanhaInfluenciadores, Influenciador, RedesSociais } from "../../interface/index.tsx"
import { Loading } from "../../components/Loading/index.tsx"
import { CardRedeSocial } from "../../components/CardRedeSocial/index.tsx"
import { ButtonPrincipal } from "../../components/ButtonPrincipal/index.tsx"
import { MessageConfirmInfluencer } from "../../components/MessageConfirmInfluencer/index.tsx"

export const DetalhesInfluencer = () => {

  const { id } = useParams()

  const { darkMode } = useContext(ThemeContext)
  const { paragrafoSize } = useContext(FontSizeContext)

  const [influenciador, setInfluenciador] = useState<Influenciador>()
  const influencerCampanha: CampanhaInfluenciadores = {

    id: 0,
    valorGasto: 0,
    quantidade: 0,
    idRedeSocial: influenciador?.redesSociais[0].id || 0,
    influenciador: influenciador
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false)

  const [perfil, setPerfil] = useState<string>()
  const [feed1, setFeed1] = useState<string>()
  const [feed2, setFeed2] = useState<string>()
  const [feed3, setFeed3] = useState<string>()
  const [background, setBackground] = useState<string>()
  const [redesSociais, setRedesSocias] = useState<RedesSociais[]>()

  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingImgPerfil, setIsLoadingImgPerfil] = useState(true)
  const [isLoadingImgFeed1, setIsLoadingImgFeed1] = useState(true)
  const [isLoadingImgFeed2, setIsLoadingImgFeed2] = useState(true)
  const [isLoadingImgFeed3, setIsLoadingImgFeed3] = useState(true)
  const [isLoadingImgBackground, setIsLoadingImgBackground] = useState(true)
  const [isLoadingGlobal, setIsLoadingGlobal] = useState<boolean>(true)
  const [entered, setEntered] = useState<boolean>(true)
  const [enteredPerfil, setEnteredPerfil] = useState<boolean>(true)
  const [enteredFeed1, setEnteredFeed1] = useState<boolean>(true)
  const [enteredFeed2, setEnteredFeed2] = useState<boolean>(true)
  const [enteredFeed3, setEnteredFeed3] = useState<boolean>(true)
  const [enteredBackground, setEnteredBackground] = useState<boolean>(true)

  const { header } = headersRequest()

  const { usuario } = useContext(UsuarioContext)
  const isAdmin = usuario && usuario.pessoa && usuario.pessoa.role === "ADMIN"

  useEffect(() => {
    getInfluenciadorDetalhes(id)
    handleFotoPerfil()
    handleFotoFeed1()
    handleFotoFeed2()
    handleFotoFeed3()
    handleFotoBackground()
    handlePageLoading()

  }, [isLoading,
    isLoadingImgPerfil,
    isLoadingImgFeed1,
    isLoadingImgFeed2,
    isLoadingImgFeed3,
    isLoadingImgBackground,
    isLoadingGlobal])

  function getInfluenciadorDetalhes(idInfluenciador?: string) {

    if (entered && isLoading) {
      setEntered(false)
      getInfluenciador(idInfluenciador, header)
        .then((response) => {
          setInfluenciador(response.data)
          setRedesSocias(response.data.redesSociais)
        })
        .catch((error) => {
          console.log(error.data)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  const handleFotoPerfil = () => {

    if (enteredPerfil && isLoadingImgPerfil && !isLoading) {
      setEnteredPerfil(false)
      if (influenciador?.imgPerfil === null) {
        setPerfil(imagemPadrao)
        setIsLoadingImgPerfil(false)
      } else {
        getImagem(influenciador?.imgPerfil, "influenciadores", header)
          .then((response) => {
            var imageUrl = URL.createObjectURL(response.data)
            setPerfil(imageUrl)
          })
          .catch((error) => {
            console.log(error.data)
          })
          .finally(() => {
            setIsLoadingImgPerfil(false)
          })
      }
    }
  }

  const handleFotoFeed1 = () => {

    if (enteredFeed1 && isLoadingImgFeed1 && !isLoading) {
      setEnteredFeed1(false)
      if (influenciador?.imgFeed1 === null) {
        setFeed1(imagemPadrao)
        setIsLoadingImgFeed1(false)
      } else {
        getImagem(influenciador?.imgFeed1, "influenciadores", header)
          .then((response) => {
            var imageUrl = URL.createObjectURL(response.data)
            setFeed1(imageUrl)
          })
          .catch((error) => {
            console.log(error.data)
          })
          .finally(() => {
            setIsLoadingImgFeed1(false)
          })
      }
    }
  }

  const handleFotoFeed2 = () => {

    if (enteredFeed2 && isLoadingImgFeed2 && !isLoading) {
      setEnteredFeed2(false)
      if (influenciador?.imgFeed2 === null) {
        setFeed2(imagemPadrao)
        setIsLoadingImgFeed2(false)
      } else {
        getImagem(influenciador?.imgFeed2, "influenciadores", header)
          .then((response) => {
            var imageUrl = URL.createObjectURL(response.data)
            setFeed2(imageUrl)
          })
          .catch((error) => {
            console.log(error.data)
          })
          .finally(() => {
            setIsLoadingImgFeed2(false)
          })
      }
    }
  }

  const handleFotoFeed3 = () => {

    if (enteredFeed3 && isLoadingImgFeed3 && !isLoading) {
      setEnteredFeed3(false)
      if (influenciador?.imgFeed3 === null) {
        setFeed3(imagemPadrao)
        setIsLoadingImgFeed3(false)
      } else {
        getImagem(influenciador?.imgFeed3, "influenciadores", header)
          .then((response) => {
            var imageUrl = URL.createObjectURL(response.data)
            setFeed3(imageUrl)
          })
          .catch((error) => {
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
      if (influenciador?.imgBackground === null) {
        setBackground(imagemPadrao)
        setIsLoadingImgBackground(false)
      } else {
        getImagem(influenciador?.imgBackground, "influenciadores", header)
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

      <Container $background={darkMode}>
        <Banner style={{ backgroundImage: `url(${background})` }}></Banner>

        <ProfileContainer>

          <div>
            <ProfileImage src={perfil} alt="Imagem de perfil do influencer" />
          </div>

          <InfoContainer>
            <NomeInfluenciador $fontSizeLabel={`${paragrafoSize}rem`}>{influenciador?.nomeFantasia}</NomeInfluenciador>
            <NichoInfluenciador $fontSizeLabel={`${paragrafoSize}rem`}><strong>Nicho: </strong>
              {influenciador?.nicho.nome}</NichoInfluenciador>
            <RegiaoInfluenciador $fontSizeLabel={`${paragrafoSize}rem`}>
              <strong>Região de Atuação: </strong>
              {influenciador ? (
                Array.from(new Set(influenciador.redesSociais.map(redeSocial => redeSocial.regiaoAtuacao))).map((regiao, index) => (
                  <p key={index}>{regiao}</p>
                ))
              ) : (
                <p>Nenhuma informação de região disponível</p>
              )}
            </RegiaoInfluenciador>
          </InfoContainer>

        </ProfileContainer>

        <RedeSocialContainer>

          <InfoRedeSocial>
            {
              redesSociais?.map(redeSocial => {

                return (

                  <CardRedeSocial
                    key={redeSocial.id}
                    id={redeSocial.id}
                    nomeRede={redeSocial.nomeRede}
                    arroba={redeSocial.arroba}
                    link={redeSocial.link}
                    custoPubli={redeSocial.custoPubli}
                    quantidadeSeguidores={redeSocial.quantidadeSeguidores}
                    taxaEngajamento={redeSocial.taxaEngajamento}
                    regiaoAtuacao={redeSocial.regiaoAtuacao}
                    influencerCampanha={influencerCampanha}
                  />
                )
              })
            }
          </InfoRedeSocial>

        </RedeSocialContainer>


        <FollowersContainer>
          <PhotoGrid>
            {influenciador?.imgFeed1 && (
              <img src={feed1} alt="Primeira foto do feed" />
            )}
            {influenciador?.imgFeed2 && (
              <img src={feed2} alt="Segunda foto do feed" />
            )}
            {influenciador?.imgFeed3 && (
              <img src={feed3} alt="Terceira foto do feed" />
            )}
          </PhotoGrid>
        </FollowersContainer>

        <>
          {isAdmin && (

            <Butoes>

              <ButtonPrincipal
                aria-label="Atualizar Perfil"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                Atualizar Perfil
              </ButtonPrincipal>

              <ButtonPrincipal
                aria-label="Ativar/desativar influencer"
                onClick={() => setIsMessageOpen(!isMessageOpen)}
              >

                {
                  influenciador !== undefined &&
                    influenciador.ativo ?
                    "Desativar influencer" :
                    "Ativar influencer"
                }

              </ButtonPrincipal>

              {
                isMessageOpen && influenciador &&
                <MessageConfirmInfluencer
                  isMenuOpen={isMessageOpen}
                  setIsMenuOpen={setIsMessageOpen}
                  influenciador={influenciador}
                />
              }

              {
                isModalOpen && influenciador &&
                <FormularioAtualizarInfluencer
                  id={influenciador.id}
                  setIsMenuOpen={setIsModalOpen}
                  isMenuOpen={isModalOpen}
                />
              }
            </Butoes>
          )}
        </>
      </Container>
    </>
  );
};
