import React, { useContext, useEffect, useState } from 'react'
import { FontSizeContext } from '../../context/fontSizeContext';
import { ThemeContext } from '../../context/themeContext';
import { CampanhaFoto, CampanhaFotoImg, CampanhasContainer, CampanhasContent, CampanhasInfo, CampanhasInfoContainer, Cards, CardsContainer, ContainerSearch, EmpresaCampanha, Informacao, Titulo } from './styles';
import SearchBar from './SearchBar';
import { MyMarcasData } from '../../interface';
import { getImagem, getMyMarcas, headersRequest } from '../../api/api';
import { Loading } from '../Loading';

export const InfluencersCampanhas: React.FC = () => {

  const { darkMode } = useContext(ThemeContext);
  const { paragrafoSize, subTitleSize, megaSize } = useContext(FontSizeContext)

  const [marcasData, setMarcaData] = useState<MyMarcasData[]>()
  const [entered, setEntered] = useState<boolean>(true)
  const [enteredPerfil, setEnteredPerfil] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingImgPerfil, setIsLoadingImgPerfil] = useState(true)
  const [images, setImages] = useState<string[]>([])
  const [isLoadingGlobal, setIsLoadingGlobal] = useState<boolean>(true)

  const { header } = headersRequest()

  useEffect(() => {

    getInfluencersMarca()
    handleFotoPerfil()
    handlePageLoading()

  }, [isLoading, isLoadingImgPerfil, isLoadingGlobal]);

  const getInfluencersMarca = () => {
    if (entered && isLoading) {
      setEntered(false)
      getMyMarcas(header)
        .then(response => {
          
          setMarcaData(response.data)
        }).catch(error => {
          console.log(error.response)
        }).finally(() => {
          setIsLoading(false)
        })
    }
  }

  const handleFotoPerfil = () => {

    if (enteredPerfil && !isLoading) {
      setEnteredPerfil(false)

      marcasData?.map((marca) => {
        marca.campanhas.map((campanhas) => {
          getImagem(campanhas.imgPerfil, 'campanhas', header)
            .then(response => {
              var imageUrl = URL.createObjectURL(response.data)
              addNewImage(imageUrl)
            })
            .catch(error => {
              console.log(error)
            }).finally(() => {
              setIsLoadingImgPerfil(false)
            })
        })
      })
    }
  }

  const addNewImage = (image: string) => {
    setImages(oldState => [...oldState, image])
  }

  const handlePageLoading = () => {
    if (
      !isLoading &&
      !isLoadingImgPerfil
    ) {
      setIsLoadingGlobal(false)
    }
  }

  const handleSearch = (query: String) => {
    console.log('Buscando por: ', query);
  };

  const renderCampanhas = () => {
    var i = 0
    return marcasData?.map((marca) => (
      marca.campanhas.map((campanha) => (

        <Cards $darkMode={darkMode} key={campanha.id}>

          <EmpresaCampanha $darkMode={darkMode} $fontSizeLabel={`${subTitleSize}rem`}>
            {campanha.nome}
          </EmpresaCampanha>
          <Informacao>
            <CampanhaFoto>
              <CampanhaFotoImg src={images[i]} alt={campanha.nome} />
            </CampanhaFoto>
            <CampanhasInfoContainer>
              <CampanhasInfo $darkMode={darkMode} $fontSizeLabel={`${paragrafoSize}rem`}>
                <span><strong>Nome:</strong></span> {campanha.nome}<br />
                <span><strong>Nicho:</strong></span> {campanha.nicho}
              </CampanhasInfo>
            </CampanhasInfoContainer>
          </Informacao>
          <pre style={{ visibility: 'hidden' }}>{i = i + 1}</pre>
        </Cards>
      ))
    ));
  };

  return (
    <>
      {
        isLoadingGlobal &&
        <Loading />
      }
      <CampanhasContent>
        <CampanhasContainer>

          <Titulo $darkMode={darkMode} $fontSizeLabel={`${megaSize}rem`}>
            MINHAS CAMPANHAS
          </Titulo>

          <ContainerSearch>
            <SearchBar onSearch={handleSearch} />
          </ContainerSearch>

          <CardsContainer>
            {renderCampanhas()}
          </CardsContainer>

        </CampanhasContainer>
      </CampanhasContent>
    </>
  );
};
