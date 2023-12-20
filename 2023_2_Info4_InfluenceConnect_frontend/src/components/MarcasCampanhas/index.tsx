import React, { useContext, useEffect, useState } from 'react'
import { FontSizeContext } from '../../context/fontSizeContext'
import { ThemeContext } from '../../context/themeContext'
import { CampanhaDetalhesButton, CampanhaFoto, CampanhaFotoImg, CampanhasContainer, CampanhasContent, CampanhasInfo, CampanhasInfoContainer, Cards, CardsContainer, ContainerSearch, EmpresaCampanha, Informacao, Titulo } from './styles'
import { SearchBar } from './../SearchBar/index.tsx'
import { Campanha, Marca } from '../../interface/index.tsx'
import { getEmpresasPorToken, getImagem, headersRequest } from '../../api/api.ts'

import imagemPadrao from "./../../assets/img/Logo/INFLUENCE_CONNECT_SÍMBOLO_PRETO.png"
import { Loading } from '../Loading/index.tsx'


export const MarcasCampanhas: React.FC = () => {

  const { darkMode } = useContext(ThemeContext)
  const { paragrafoSize, megaSize, subTitleSize } = useContext(FontSizeContext)

  const [marca, setMarca] = useState<Marca>()
  const [campanhasData, setCampanhasData] = useState<Campanha[]>([])
  const [campanhasFiltradas, setCampanhasFiltradas] = useState<Campanha[]>([])
  const [searchMessage, setSearchMessage] = useState<string>("")
  
  const [isLoading, setIsLoading] = useState<boolean>(true)
  
  const { header } = headersRequest()
  const [loadedProfileImages, setLoadedProfileImages] = useState<{ [key: number]: string }>({})
  
  const [visibleCount, setVisibleCount] = useState<number>(9)
  const loadMoreCount = 9
  
  {searchMessage && marca && visibleCount}
  useEffect(() => {

    fetchData()
  }, [])

  const fetchData = async () => {

    getEmpresasPorToken(header)
      .then(response => {

        console.log(response.data.campanhas)

        setMarca(response.data)
        setCampanhasData(response.data.campanhas)
        setCampanhasFiltradas(response.data.campanhas)

        const loadedImagesIds: number[] = []
        const loadedImages: { [key: number]: string } = {}

        campanhasData.forEach(campanha => {

          if (!loadedProfileImages[campanha.imgPerfil]) {

            loadedImagesIds.push(campanha.imgPerfil)
          }
        })

        Promise.all(

          loadedImagesIds.map(async (id) => {

            try {

              if (id === null) {

                loadedImages[id] = imagemPadrao
              } else {
                
                const imageResponse = await getImagem(id, 'influenciadores', header)
                const imageUrl = URL.createObjectURL(imageResponse.data)
                loadedImages[id] = imageUrl
              }

              setLoadedProfileImages((prevState) => ({
                ...prevState,
                ...loadedImages,
              }))
            } catch (error) {
              console.error("Erro ao carregar imagem:", error)
            } finally {

              setIsLoading(false)
            }
          })
        )
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false))
  }

  const renderCampanhas = () => {

    return campanhasFiltradas.map((campanha) => {

      const imgUrl = loadedProfileImages[campanha.imgPerfil]

      return (

        <Cards $darkMode={darkMode} key={campanha.id}>

          <EmpresaCampanha $darkMode={darkMode} $fontSizeLabel={`${subTitleSize}rem`}>
            {campanha.nome}
          </EmpresaCampanha>
          <Informacao>
            <CampanhaFoto>
              <CampanhaFotoImg src={imgUrl} alt={campanha.campanha} />
            </CampanhaFoto>
            <CampanhasInfoContainer>
              <CampanhasInfo $darkMode={darkMode} $fontSizeLabel={`${paragrafoSize}rem`}>
                <span><strong>Nome:</strong></span> {campanha.campanha}<br />
                <span><strong>Nicho:</strong></span> {campanha.nicho}
              </CampanhasInfo>
              <CampanhaDetalhesButton $darkMode={darkMode} $fontSizeLabel={`${paragrafoSize}rem`}>
                Ver Detalhes
              </CampanhaDetalhesButton>
            </CampanhasInfoContainer>
          </Informacao>
        </Cards>
      )
    })
  }

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + loadMoreCount)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        handleLoadMore()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleLoadMore])

  const handleSearch = (query: string) => {

    const trimmedQuery = query.trim().toLowerCase()

    let filteredCampanhas: Campanha[] = []

    if (trimmedQuery !== "") {

      filteredCampanhas = campanhasData.filter(
        campanha => campanha.nome.toLowerCase().includes(trimmedQuery)
      )

      setCampanhasFiltradas(filteredCampanhas)

      if (filteredCampanhas.length === 0) {

        setSearchMessage(`Nenhum influenciador encontrado para: "${query}"`)
      } else {

        setSearchMessage("")
      }
    } else {

      setCampanhasFiltradas(campanhasData)
    }
  }

  return (

    <>
      {
        isLoading &&
        <Loading />
      }

      <CampanhasContent>
        <CampanhasContainer>

          <Titulo $darkMode={darkMode} $fontSizeLabel={`${megaSize}rem`}>
            MINHAS CAMPANHAS
          </Titulo>

          <ContainerSearch>
            <SearchBar
              onSearch={handleSearch}
              labelButton={"Botão para pesquisar"}
              labelInput={"Campo de pesquisa"}
            />
          </ContainerSearch>

          <CardsContainer>
            {renderCampanhas()}
          </CardsContainer>

        </CampanhasContainer>
      </CampanhasContent>
    </>
  )
}

