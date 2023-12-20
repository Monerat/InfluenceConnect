import React, { useContext, useEffect, useState, useRef, useCallback } from "react";
import { FontSizeContext } from "../../context/fontSizeContext";
import { ThemeContext } from "../../context/themeContext";
import imagemPadrao from "./../../assets/img/Logo/INFLUENCE_CONNECT_SÍMBOLO_PRETO.png"
import { Link, useNavigate } from "react-router-dom";

import { Plus } from "lucide-react"

import {
  CampanhaFoto,
  CampanhaFotoImg,
  CampanhasContainer,
  CampanhasContent,
  CampanhasInfo,
  CampanhasInfoContainer,
  Cards,
  CardsContainer,
  ContainerSearch,
  Informacao,
  Titulo,
} from "./styles"

import { SearchBar } from "./../SearchBar/index.tsx";

import { getCampanhas, getImagem, headersRequest } from "../../api/api";
import { Loading } from "../Loading";
import { Campanha } from "../../interface";
import { ButtonNeutroTransparent } from "../ButtonNeutroTransparent/index.tsx";
import { ButtonPrincipal } from "../ButtonPrincipal/index.tsx";

export const AdministradorCampanhas: React.FC = () => {
  
  const { header } = headersRequest()

  const { darkMode } = useContext(ThemeContext);
  const { paragrafoSize, megaSize } = useContext(FontSizeContext);

  const navigate = useNavigate()

  const [searchMessage, setSearchMessage] = useState<string>("");

  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [campanhasFiltradas, setCampanhasFiltradas] = useState<Campanha[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedProfileImages, setLoadedProfileImages] = useState<{ [key: number]: string }>({});

  const [visibleCount, setVisibleCount] = useState<number>(8);
  const loadMoreCount = 8;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCampanhas(header);
        const campanhasData = response.data;
        setCampanhas(campanhasData);
        setCampanhasFiltradas(campanhasData);

        const loadedImagesIds: number[] = [];
        const loadedImages: { [key: number]: string } = {};

        campanhasData.forEach((campanha: Campanha) => {
          if (!loadedProfileImages[campanha.imgPerfil]) {
            loadedImagesIds.push(campanha.imgPerfil);
          }
        });

        await Promise.all(
          loadedImagesIds.map(async (id) => {

            try {
              if (id === null) {
                loadedImages[id] = imagemPadrao;
              } else {
                const imageResponse = await getImagem(id, 'campanhas', header);
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
        console.error("Erro ao buscar informação de campanhas", error);

      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastMarcaRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && campanhasFiltradas.length > visibleCount) {
        handleLoadMore();
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  }, [campanhasFiltradas.length, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + loadMoreCount);
  };

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim().toLowerCase()

    if (trimmedQuery === "") {
      campanhasFiltradas
      setCampanhasFiltradas(campanhas);
      setSearchMessage("");
    } else {
      const filteredCampanhas = campanhas.filter((campanha) =>
        campanha.nome.toLowerCase().includes(trimmedQuery)
      )

      setCampanhasFiltradas(filteredCampanhas)

      if (filteredCampanhas.length === 0) {
        setSearchMessage(`Nenhuma campanha encontrada para: "${query}"`);
      } else {
        setSearchMessage("")
      }
    }
  }

  const handleAdicionarCampanha = () => {
    navigate("/cadastro/campanhas")
  }

  const renderCampanhas = () => {
    const visibleCampanhas = campanhasFiltradas.slice(0, visibleCount);

    return visibleCampanhas.map((campanha, index) => {
      if (index === visibleCount - 1) {
        return (
          <div key={campanha.id} ref={lastMarcaRef}>
          </div>
        );
      }

      const imgUrl = loadedProfileImages[campanha.imgPerfil] || '';

      return (

        <Cards $darkMode={darkMode} key={campanha.id}>
          <Informacao>
            <CampanhaFoto>
              <CampanhaFotoImg
                $inativo={campanha.ativo}
                src={imgUrl}
                alt={campanha.nome}
              />
            </CampanhaFoto>

            <CampanhasInfoContainer>
              <CampanhasInfo
                $darkMode={darkMode}
                $fontSizeLabel={`${paragrafoSize}rem`}
              >
                {campanha && typeof campanha.ativo === 'boolean' && !campanha.ativo && (
                  <strong style={{ color: 'red' }}>Campanha desativada</strong>
                )}<br />
                <span>
                  <strong>Nome:</strong>
                </span>{" "}
                {campanha.nome}
                <br />
                <span>
                  <strong>Nicho:</strong>
                </span>{" "}
                {campanha.nicho}
              </CampanhasInfo>

              <Link to={`/campanhas/${campanha.id}`}>
                <ButtonPrincipal >
                  Ver Detalhes
                </ButtonPrincipal>
              </Link>
            </CampanhasInfoContainer>
          </Informacao>
        </Cards>
      )
    })
  }

  return (
    <>
      {isLoading && <Loading />}
      <CampanhasContent>
        <CampanhasContainer>
          <Titulo $darkMode={darkMode} $fontSizeLabel={`${megaSize}rem`}>
            CAMPANHAS
          </Titulo>

          <ContainerSearch>
            <SearchBar onSearch={handleSearch} labelButton={"Botão para pesquisar"} labelInput={"Campo de pesquisa"} />
            <ButtonNeutroTransparent label="Adicionar nova Campanha" onToggle={handleAdicionarCampanha}>
              <Plus aria-label="Icone de adicionar nova campanha" size={55} />
            </ButtonNeutroTransparent>

          </ContainerSearch>

          {searchMessage && <div>{searchMessage}</div>}

          <CardsContainer>
            {renderCampanhas()}
          </CardsContainer>
        </CampanhasContainer>
      </CampanhasContent>
    </>
  );
};
