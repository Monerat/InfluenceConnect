import SearchBar from "./SearchBar";

import {

    MarcasContent,
    MarcasContainer,
    ContainerTopo,
    Titulo,
    ContainerSearch,
    CardsContainer,
    Cards,
    MarcasFoto,
    MarcasFotoImg,
    Informacao,
    MarcasNome,
    MarcaDetalhesButton,
    ContainerFuncao
} from "./styles";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/themeContext";
import { FontSizeContext } from "../../context/fontSizeContext";
import { getImagem, getMyMarcas } from "../../api/api";
import { headersRequest } from "../../api/api";
import { MyMarcasData } from "../../interface";
import { Loading } from "../Loading";

export const InfluencersMarcas: React.FC = () => {

    const { darkMode } = useContext(ThemeContext);
    const { paragrafoSize, titleSize } = useContext(FontSizeContext);

    const { header } = headersRequest()

    const [marcasData, setMarcaData] = useState<MyMarcasData[]>()
    const [entered, setEntered] = useState<boolean>(true)
    const [enteredPerfil, setEnteredPerfil] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingImgPerfil, setIsLoadingImgPerfil] = useState(true)
    const [images, setImages] = useState<string[]>([])
    const [isLoadingGlobal, setIsLoadingGlobal] = useState<boolean>(true)


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
                getImagem(marca.imgPerfil, 'empresas', header)
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
        }
    }

    const handlePageLoading = () => {
        if (
            !isLoading &&
            !isLoadingImgPerfil
        ) {
            setIsLoadingGlobal(false)
        }
    }

    const addNewImage = (image: string) => {
        setImages(oldState => [...oldState, image])
    }

    const handleSearch = (query: String) => {
        console.log("Buscando por:", query);
    };

    const renderMarcas = () => {
        var i = 0
        return marcasData?.map((marca) => (

            <Cards key={marca.id}>
                <MarcasFoto>
                    <MarcasFotoImg src={images[i]} alt={marca.nome} />
                </MarcasFoto>
                <Informacao>
                    <MarcasNome
                        $darkMode={darkMode}
                        $fontSizeLabel={`${paragrafoSize}rem`}
                    >
                        <h3>{marca.nome}</h3>
                    </MarcasNome>
                    <MarcaDetalhesButton
                        $darkMode={darkMode}
                        $fontSizeLabel={`${paragrafoSize}rem`}
                    >
                        Ver Detalhes
                    </MarcaDetalhesButton>
                </Informacao>
                <pre style={{ visibility: 'hidden' }}>{i = i + 1}</pre>
            </Cards>
        ));
    };

    return (
        <>
            {
                isLoadingGlobal &&
                <Loading />
            }
            <MarcasContent>
                <MarcasContainer>
                    <ContainerTopo>
                        <Titulo $darkMode={darkMode} $fontSizeLabel={`${titleSize}rem`}>
                            Minhas marcas Parceiras
                        </Titulo>
                        <ContainerFuncao>
                            <ContainerSearch>
                                <SearchBar onSearch={handleSearch} />
                            </ContainerSearch>
                        </ContainerFuncao>
                    </ContainerTopo>
                    <CardsContainer>{renderMarcas()}</CardsContainer>
                </MarcasContainer>
            </MarcasContent>
        </>
    );
};

