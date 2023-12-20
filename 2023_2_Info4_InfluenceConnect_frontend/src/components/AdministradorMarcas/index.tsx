import { useCallback, useContext, useEffect, useRef, useState } from 'react'

import { Plus } from 'lucide-react'

import { ThemeContext } from "../../context/themeContext"
import { FontSizeContext } from "../../context/fontSizeContext"

import { SearchBar } from './../SearchBar/index.tsx'

import { Link, useNavigate } from 'react-router-dom'

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
    ContainerFuncao,
    MarcasSegmento,
    Negritos,
} from './styles'

import { getAllMarcas, getImagem, headersRequest } from '../../api/api'
import { Loading } from '../Loading'
import { Marca } from '../../interface'
import { ButtonNeutroTransparent } from '../ButtonNeutroTransparent/index.tsx'
import { ButtonPrincipal } from '../ButtonPrincipal/index.tsx'
import imagemPadrao from "./../../assets/img/Logo/INFLUENCE_CONNECT_SÍMBOLO_PRETO.png"

export const AdministradorMarcas: React.FC = () => {

    const { darkMode } = useContext(ThemeContext)
    const { paragrafoSize, megaSize } = useContext(FontSizeContext)

    const { header } = headersRequest();

    const navigate = useNavigate();

    const [marcas, setMarcas] = useState<Marca[]>([])
    const [searchMessage, setSearchMessage] = useState<string>("");
    const [marcasFiltradas, setMarcasFiltradas] = useState<Marca[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [loadedProfileImages, setLoadedProfileImages] = useState<{ [key: number]: string }>({});

    const [visibleCount, setVisibleCount] = useState<number>(9); // Quantidade inicial de marcas visíveis
    const loadMoreCount = 9; // Quantidade de marcas a serem carregadas a cada vez

    const observer = useRef<IntersectionObserver | null>(null);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllMarcas(header);
                const empresasData = response.data;
                setMarcas(empresasData);
                setMarcasFiltradas(empresasData);

                const loadedImagesIds: number[] = [];
                const loadedImages: { [key: number]: string } = {};


                empresasData.forEach((marca: Marca) => {
                    if (!loadedProfileImages[marca.imgPerfil]) {
                        loadedImagesIds.push(marca.imgPerfil);
                    }
                });


                await Promise.all(
                    loadedImagesIds.map(async (id) => {
                        try {
                            if (id === null) {
                                loadedImages[id] = imagemPadrao;
                            } else {
                                const imageResponse = await getImagem(id, 'empresas', header);
                                const imageUrl = URL.createObjectURL(imageResponse.data);
                                loadedImages[id] = imageUrl;
                            }
                        } catch (error) {
                            console.error("Erro ao carregar imagem:", error);
                        }
                    })
                );

                setLoadedProfileImages((prevState) => ({
                    ...prevState,
                    ...loadedImages,
                }));
            } catch (error) {
                console.error("Erro ao buscar informação de marcas", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + loadMoreCount);
    };

    const lastMarcaRef = useCallback((node: HTMLDivElement | null) => {
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && marcasFiltradas.length > visibleCount) {
                handleLoadMore();
            }
        });

        if (node) {
            observer.current.observe(node);
        }
    }, [handleLoadMore, marcasFiltradas.length, visibleCount]);


    const handleSearch = (query: string) => {

        const trimmedQuery = query.trim().toLowerCase();

        if (trimmedQuery === "") {
            marcasFiltradas
            setMarcasFiltradas(marcas);
            setSearchMessage("");
        } else {
            const filteredMarcas = marcas.filter((marca) =>
                marca.nome.toLowerCase().includes(trimmedQuery)
            );

            setMarcasFiltradas(filteredMarcas);

            if (filteredMarcas.length === 0) {
                setSearchMessage(`Nenhuma marca encontrada para: "${query}"`);
            } else {
                setSearchMessage("");
            }
        }
    };

    const handleAdicionarMarca = () => {
        navigate("/cadastro/marcas");
    };

    const renderMarcas = () => {
        return marcasFiltradas.slice(0, visibleCount).map((marca, index) => {
            if (index === visibleCount - 1) {
                return (
                    <div key={marca.id} ref={lastMarcaRef}>
                        {/* Renderizar marca */}
                    </div>
                );
            }

            const imgUrl = loadedProfileImages[marca.imgPerfil] || '';

            return (
                <Cards $darkMode={darkMode} key={marca.id}>
                    <MarcasFoto
                        $inativo={marca.ativo}
                    >
                        <MarcasFotoImg src={imgUrl} alt={`Logo da ${marca.nome}`} />
                    </MarcasFoto>
                    <Informacao>

                        {

                            marca.ativo === false &&
                            <h2>Inativo</h2>
                        }
                        
                        <MarcasNome $darkMode={darkMode} $fontSizeLabel={`${paragrafoSize}rem`}>
                            {marca.nome}
                        </MarcasNome>
                        <MarcasSegmento
                            $darkMode={darkMode}
                            $fontSizeLabel={`${paragrafoSize}rem`}>

                            <Negritos>Nicho: </Negritos>
                            {marca.segmento}
                        </MarcasSegmento>
                        <Link aria-label={`Ver Detalhes de ${marca.nome}`} to={`/marcas/${marca.id}`}>
                            <ButtonPrincipal>
                                Ver Detalhes
                            </ButtonPrincipal>
                        </Link>
                    </Informacao>
                </Cards>
            );
        });
    };


    return (

        <>
            {isLoading && <Loading />}
            <MarcasContent>

                <MarcasContainer>

                    <ContainerTopo>

                        <Titulo $darkMode={darkMode} $fontSizeLabel={`${megaSize}rem`}>
                            MAR<br />CAS
                        </Titulo>

                        <ContainerFuncao>

                            <ContainerSearch>
                                <SearchBar onSearch={handleSearch} labelButton={"Campo de pesquisa"} labelInput={"Botão Pesquisar"} />
                            </ContainerSearch>
                            <ButtonNeutroTransparent label={'Cadastrar Nova Marca'} onToggle={handleAdicionarMarca}>
                                <Plus aria-label='Icone de adicionar' size={55} />
                            </ButtonNeutroTransparent>

                        </ContainerFuncao>
                    </ContainerTopo>

                    {searchMessage && <div>{searchMessage}</div>}
                    <CardsContainer>
                        {renderMarcas()}
                    </CardsContainer>
                    {marcasFiltradas.length > visibleCount && (
                        <button onClick={handleLoadMore}>Carregar Mais</button>
                    )}
                </MarcasContainer>
            </MarcasContent>
        </>

    )
}