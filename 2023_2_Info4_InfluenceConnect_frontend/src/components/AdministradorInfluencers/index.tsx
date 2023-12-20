import React, { useContext, useEffect, useState } from "react"
import { SearchBar } from "./../SearchBar/index.tsx"
import imagemPadrao from "./../../assets/img/Logo/INFLUENCE_CONNECT_SÍMBOLO_PRETO.png"

import {
  Cards,
  CardsContainer,
  ContainerSearch,
  InfluenciadorDetalhesButton,
  InfluenciadorFoto,
  InfluenciadorFotoImg,
  InfluenciadorNome,
  InfluenciadoresContainer,
  InfluenciadoresContent,
  Informacoes,
  ButtonsContainer,
  InfluenciadorNicho,
  Negritos
} from "./styles.ts"

import { Plus, Filter, FilterX } from "lucide-react"

import { ThemeContext } from "../../context/themeContext"
import { FontSizeContext } from "../../context/fontSizeContext"

import { Title } from "../Title/index.tsx"

import { Link, useNavigate } from "react-router-dom"

import { getAllInfluencers, getImagem, headersRequest } from "../../api/api.ts";
import { Influenciador } from "../../interface/index.tsx";
import { Loading } from "../Loading/index.tsx";

import { Filter as FilterInfluencers } from "../Filter/index.tsx"
import { ButtonNeutro } from "../ButtonNeutro/index.tsx"

export const AdministradorInfluencers: React.FC = () => {

  const { darkMode } = useContext(ThemeContext)
  const { paragrafoSize } = useContext(FontSizeContext)

  const [influenciadores, setInfluenciadores] = useState<Influenciador[]>([])
  const [searchMessage, setSearchMessage] = useState<string>("")
  const [isFilterOpen, setIsfilterOpen] = useState<boolean>(false)
  const [faixaEtariaSelecionada, setFaixaEtariaSelecionada] = useState("")
  const [influenciadoresFiltrados, setInfluenciadoresFiltrados] = useState<
    Influenciador[]
  >([])
  const [nichoSelecionado, setNichoSelecionado] = useState("")
  const [regiaoSelecionada, setRegiaoSelecionada] = useState("")
  const [redeSocialSelecionada, setRedeSocialSelecionada] = useState("")
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { header } = headersRequest()

  const navigate = useNavigate()

  const [loadedProfileImages, setLoadedProfileImages] = useState<{ [key: number]: string }>({});

  const [visibleCount, setVisibleCount] = useState<number>(9);
  const loadMoreCount = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllInfluencers(header);
        const influenciadoresData = response.data;
        setInfluenciadores(influenciadoresData);
        setInfluenciadoresFiltrados(influenciadoresData);

        const loadedImagesIds: number[] = [];
        const loadedImages: { [key: number]: string } = {}

        influenciadoresData.forEach((influenciador: Influenciador) => {
          if (!loadedProfileImages[influenciador.imgPerfil]) {
            loadedImagesIds.push(influenciador.imgPerfil)
          }
        });

        await Promise.all(
          loadedImagesIds.map(async (id) => {
            try {
              if (id === null) {
                loadedImages[id] = imagemPadrao;
              } else {
                const imageResponse = await getImagem(id, 'influenciadores', header);
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
        console.error("Erro ao buscar informação de Influenciadores", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + loadMoreCount);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        handleLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleLoadMore]);

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim().toLowerCase()

    if (trimmedQuery === "") {
      setInfluenciadoresFiltrados(influenciadores)
      setSearchMessage("")
    } else {
      const filteredInfluenciadores = influenciadores.filter((influenciador) =>
        influenciador.nomeFantasia.toLowerCase().includes(trimmedQuery)
      )

      setInfluenciadoresFiltrados(filteredInfluenciadores)

      if (filteredInfluenciadores.length === 0) {
        setSearchMessage(`Nenhum influenciador encontrado para: "${query}"`)
      } else {
        setSearchMessage("")
      }
    }
  }

  const aplicarFiltro = (
    tipoFiltro: string,
    valorFiltro: string | number,
    influenciadoresOriginais: Influenciador[]
  ) => {
    switch (tipoFiltro) {
      case "nicho":
        return influenciadoresOriginais.filter(
          (influenciador) => influenciador.nicho.nome === valorFiltro
        )
      case "regiao":
        return influenciadoresOriginais.filter((influenciador) =>
          influenciador.redesSociais.some(
            (rede) => rede.regiaoAtuacao === valorFiltro
          )
        )
      case "faixaEtaria":
        return influenciadoresOriginais.filter(
          (influenciador) => influenciador.nicho.faixaEtaria === valorFiltro
        )
      case "redeSocial":
        return influenciadoresOriginais.filter((influenciador) =>
          influenciador.redesSociais.some(
            (redeSocial) => redeSocial.nomeRede === valorFiltro
          )
        )
      default:
        return influenciadoresOriginais
    }
  }

  const handleAdicionarInfluencer = () => {
    navigate("/cadastro/influencers")
  }

  const listaDeNichos = Array.from(
    new Set(influenciadores.map((influenciador) => influenciador.nicho.nome))
  )

  useEffect(() => {
    setInfluenciadoresFiltrados(influenciadores)
  }, [influenciadores])

  const handleNichoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedNicho = event.target.value

    if (selectedNicho === "Todos") {
      setInfluenciadoresFiltrados(influenciadores)
      setNichoSelecionado("")
    } else {

      const filteredInfluenciadores = aplicarFiltro(
        "nicho",
        selectedNicho,
        influenciadores
      )
      setInfluenciadoresFiltrados(filteredInfluenciadores)
      setNichoSelecionado(selectedNicho)
    }
  }

  const renderFiltroNicho = () => (
    <div className="campos">
      <label htmlFor="nichoDropdown">Selecione um Nicho:</label>

      <select
        id="nichoDropdown"
        value={nichoSelecionado}
        onChange={handleNichoChange}
      >
        <option value="Todos">Todos</option>

        {listaDeNichos.map((nicho, index) => (
          <option key={index} value={nicho}>
            {nicho}
          </option>
        ))}
      </select>
    </div>
  )


  const listaDeRegioes = Array.from(
    new Set(
      influenciadores.flatMap((influenciador) =>
        influenciador.redesSociais.map((rede) => rede.regiaoAtuacao)
      )
    )
  )

  const handleRegiaoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRegiao = event.target.value

    if (selectedRegiao === "Todos") {
      setInfluenciadoresFiltrados(influenciadores)
      setRegiaoSelecionada("")
    } else {
      const filteredInfluenciadores = influenciadores.filter((influenciador) =>

        influenciador.redesSociais.some(
          (rede) => rede.regiaoAtuacao === selectedRegiao
        )
      )
      setInfluenciadoresFiltrados(filteredInfluenciadores)
      setRegiaoSelecionada(selectedRegiao)
    }
  }

  const renderFiltroRegiao = () => (
    <div className="campos">
      <label htmlFor="regiaoDropdown">Selecione uma Região:</label>
      <select
        id="regiaoDropdown"
        value={regiaoSelecionada}
        onChange={handleRegiaoChange}
      >
        <option value="Todos">Todos</option>

        {listaDeRegioes.map((regiao, index) => (
          <option key={index} value={regiao}>
            {regiao}
          </option>
        ))}
      </select>
    </div>
  )

  //FIM FILTRO REGIÃO ATUAÇÃO

  //FILTRO FAIXA ETÁRIA
  const listaDeFaixasEtarias = Array.from(
    new Set(
      influenciadores.map((influenciador) => influenciador.nicho.faixaEtaria)
    )
  )

  const handleFaixaEtariaChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedFaixaEtaria = event.target.value

    if (selectedFaixaEtaria === "Todas") {
      setInfluenciadoresFiltrados(influenciadores)
      setFaixaEtariaSelecionada("")
    } else {
      const filteredInfluenciadores = influenciadores.filter(
        (influenciador) =>
          influenciador.nicho.faixaEtaria === selectedFaixaEtaria
      )
      setInfluenciadoresFiltrados(filteredInfluenciadores)
      setFaixaEtariaSelecionada(selectedFaixaEtaria)
    }
  }

  const renderFiltroFaixaEtaria = () => (
    <div className="campos">
      <label htmlFor="faixaEtariaDropdown">Selecione uma Faixa Etária:</label>

      <select
        id="faixaEtariaDropdown"
        value={faixaEtariaSelecionada}
        onChange={handleFaixaEtariaChange}
      >
        <option value="Todas">Todas</option>
        {listaDeFaixasEtarias.map((faixaEtaria, index) => (
          <option key={index} value={faixaEtaria}>
            {faixaEtaria}
          </option>
        ))}
      </select>
    </div>
  )

  //FIM FILTRO FAIXA ETÁRIA

  //FILTRO REDES SOCIAIS
  const listaDeRedesSociais = Array.from(
    new Set(
      influenciadores.flatMap((influenciador) =>
        influenciador.redesSociais.map((redeSocial) => redeSocial.nomeRede)
      )
    )
  )

  const handleRedeSocialChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedRedeSocial = event.target.value

    if (selectedRedeSocial === "Todas") {
      setInfluenciadoresFiltrados(influenciadores)
      setRedeSocialSelecionada("")
    } else {
      const filteredInfluenciadores = aplicarFiltro(
        "redeSocial",
        selectedRedeSocial,
        influenciadores
      )
      setInfluenciadoresFiltrados(filteredInfluenciadores)
      setRedeSocialSelecionada(selectedRedeSocial)
    }
  }

  const renderFiltroRedeSocial = () => (
    <div className="campos">
      <label htmlFor="redeSocialDropdown">Selecione uma Rede Social:</label>

      <select
        id="redeSocialDropdown"
        value={redeSocialSelecionada}
        onChange={handleRedeSocialChange}
      >
        <option value="Todas">Todas</option>
        {listaDeRedesSociais.map((redeSocial, index) => (
          <option key={index} value={redeSocial}>
            {redeSocial}
          </option>
        ))}
      </select>
    </div>
  )

  //FIM FILTRO REDES SOCIAIS

  const renderInfluenciadores = () => {
    let arrayFiltrado = influenciadoresFiltrados;

    if (nichoSelecionado !== "") {
      arrayFiltrado = arrayFiltrado.filter(
        (influenciador) => influenciador.nicho.nome === nichoSelecionado
      )
    }

    if (regiaoSelecionada !== "") {
      arrayFiltrado = arrayFiltrado.filter((influenciador) =>
        influenciador.redesSociais.some(
          (rede) => rede.regiaoAtuacao === regiaoSelecionada
        )
      )
    }

    if (faixaEtariaSelecionada !== "") {
      arrayFiltrado = arrayFiltrado.filter(
        (influenciador) =>
          influenciador.nicho.faixaEtaria === faixaEtariaSelecionada
      )
    }

    if (redeSocialSelecionada !== "") {
      arrayFiltrado = arrayFiltrado.filter((influenciador) =>
        influenciador.redesSociais.some(
          (redeSocial) => redeSocial.nomeRede === redeSocialSelecionada
        )
      )
    }

    const visibleInfluenciadores = arrayFiltrado.slice(0, visibleCount);

    return visibleInfluenciadores.map((influenciador) => {
      const imgUrl = loadedProfileImages[influenciador.imgPerfil] || '';

      return (
        <Cards key={influenciador.id} $darkMode={darkMode}>
          <Link to={`/influencers/${influenciador.id}`}>
            <InfluenciadorFoto>
              <InfluenciadorFotoImg
                $inativo={influenciador.ativo}
                src={imgUrl}
                alt={influenciador.nomeFantasia}
              />
            </InfluenciadorFoto>

            <Informacoes>

              {
                influenciador.ativo === false &&
                <h2>Inativo</h2>
              }

              <InfluenciadorNome
                $darkMode={darkMode}
                $fontSizeLabel={`${paragrafoSize}rem`}
              >
                <Negritos>Influencer: </Negritos>
                {influenciador.nomeFantasia}
              </InfluenciadorNome>

              <InfluenciadorNicho
                $darkMode={darkMode}
                $fontSizeLabel={`${paragrafoSize}rem`}
              >
                <Negritos>Nicho: </Negritos>
                {influenciador.nicho.nome}
              </InfluenciadorNicho>

              <InfluenciadorDetalhesButton
                $darkMode={darkMode}
                $fontSizeLabel={`${paragrafoSize}rem`}
              >
                Ver Detalhes
              </InfluenciadorDetalhesButton>
            </Informacoes>
          </Link>
        </Cards>
      )
    })
  }

  return (
    <>
      {isLoading && <Loading />}
      <InfluenciadoresContent>
        <InfluenciadoresContainer>
          <Title>Influenciador</Title>

          <ContainerSearch>
            <SearchBar onSearch={handleSearch} labelButton={"Botão para pesquisar"} labelInput={"Campo para inserir a pesquisa"} />
            <ButtonsContainer>
              <ButtonNeutro label="Botão para adicionar um novo influencer"
                onToggle={handleAdicionarInfluencer}
              >
                <Plus aria-label="Icone Adicionar" size={24} />
              </ButtonNeutro>

              <ButtonNeutro label="Botão para abrir as opções de filtro"
                onToggle={() => setIsfilterOpen(!isFilterOpen)}>

                {isFilterOpen ? <FilterX aria-label="Icone Filtro" size={24} /> : <Filter aria-label="Icone Filtro" size={24} />}
              </ButtonNeutro>
            </ButtonsContainer>
          </ContainerSearch>

          {isFilterOpen &&

            <FilterInfluencers>
              {renderFiltroNicho()}
              {renderFiltroRegiao()}
              {renderFiltroFaixaEtaria()}
              {renderFiltroRedeSocial()}
            </FilterInfluencers>
          }

          {searchMessage && <div>{searchMessage}</div>}

          <CardsContainer>{renderInfluenciadores()}</CardsContainer>
        </InfluenciadoresContainer>
      </InfluenciadoresContent>
    </>
  )
}