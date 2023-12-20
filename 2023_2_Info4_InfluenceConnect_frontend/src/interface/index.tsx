import { z } from "zod"
import { atualizarCampanhaSchema, atualizarInfluencerSchema, atualizarMarcaSchema, createCampanhaSchema, createInfluencerSchema, createLoginSchema, createMarcaSchema } from "../schemas"
import { ButtonHTMLAttributes, Dispatch, SetStateAction } from "react"

export type CreateLoginData = z.infer<typeof createLoginSchema>

export type CreateInfluencerData = z.infer<typeof createInfluencerSchema>

export type AtualizarInfluencerData = z.infer<typeof atualizarInfluencerSchema>

export type AtualizarMarcasData = z.infer<typeof atualizarMarcaSchema>

export type AtualizarCampanhaData = z.infer<typeof atualizarCampanhaSchema>

export type CreateMarcasData = z.infer<typeof createMarcaSchema>

export type CreateCampanhasData = z.infer<typeof createCampanhaSchema>

export interface ContextProps {

  children: React.ReactNode
}

export interface FontSizeContextProps {

  megaSize: number
  setMegaSize: Dispatch<SetStateAction<number>>

  titleSize: number
  setTitleSize: Dispatch<SetStateAction<number>>

  subTitleSize: number
  setSubTitleSize: Dispatch<SetStateAction<number>>

  paragrafoSize: number
  setParagrafoSize: Dispatch<SetStateAction<number>>
}

export interface ThemeContextProps {

  darkMode: boolean
  isDarkMode: Dispatch<SetStateAction<boolean>>
}

export interface UsuarioContextProps {
  usuario: Usuario
  setUsuario: Dispatch<SetStateAction<Usuario>>
  token: string
  setToken: Dispatch<SetStateAction<string>>
}

export interface MenuHamburgerProps {

  handleDiminuirFonte: () => void
  handleAumentarFonte: () => void
  handleAutoContraste: () => void
}

export interface PerfilProps {

  handleFinalizarCampanha: () => void
  handleLogout: () => void
}

export interface MessageConfirmProps {

  influenciador: Influenciador 
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
  isMenuOpen: boolean
}

export interface MessageConfirmMarcaProps {

  marca: Marca
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
  isMenuOpen: boolean
}

export interface FormularioAtualizarProps {

  id: number
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
  isMenuOpen: boolean
}

export interface Usuario {

  token: string
  pessoa: {
    id: number
    nome: string
    cpf: string
    role: string
    email: string
    senha: string
    enderecos: [
      {
        id: number
        tipoEndereco: string
        cep: string
        tipoLogradouro: string
        logradouro: string
        numero: string
        complemento: string
        bairro: string
        cidade: string
        estado: string
      }
    ]
    influenciadores: []
    empresas: []
  }
}

export interface InfluencerCadastro {
  ativo: boolean
  nomeFantasia: string
  pessoa: {
    nome: string
    cpf: string
    role: number
    email: string
    senha: string
    enderecos: [
      {
        tipoLogradouro: string
        tipoEndereco: number
        numero: string
        cep: string
        logradouro: string
        complemento: string
        bairro: string
        cidade: string
        estado: string
      }
    ]
  }
  nicho: {
    nome: string
    descricao: string
    faixaEtaria: string
    genero: string
  }
  redesSociais: {
    nomeRede: string
    arroba: string
    link: string
    custoPubli: string
    taxaEngajamento: string
    quantidadeSeguidores: string
    regiaoAtuacao: string
  }
}

export interface Cep {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

export interface Pessoa {
  nome: string
  cpf: string
  role: number
  email: string
  senha: string
  enderecos: [
    {
      tipoLogradouro: string
      tipoEndereco: number
      numero: string
      cep: string
      logradouro: string
      complemento: string
      bairro: string
      cidade: string
      estado: string
    }
  ]
  influenciadores: []
  empresas: []
}

export interface Influencer {

  id: number;
  nomeFantasia: string;
  imgPerfil: number;
  nicho: {
    id: number
    nome: string
    descricao: string
    faixaEtaria: string
  }
  redesSociais: [
    {
      id: number
      nomeRede: string
      regiaoAtuacao: string
    }
  ]
}

export interface Marca {
  id: number
  nome: string
  ativo: boolean
  cnpj: string
  segmento: string
  imgPerfil: number
  imgFeed1: number
  imgFeed2: number
  imgFeed3: number
  imgBackground: number
  campanhas: Campanha[]
}

export interface Campanha {
  foto: string | undefined
  campanha: string | undefined
  id: number,
  ativo: boolean,
  nome: string,
  inicioCampanha: string,
  encerramentoCampanha: string,
  orcamento: number,
  valorGasto: number,
  nicho: string,
  imgPerfil: number,
  imgFeed1: number,
  imgFeed2: number,
  imgFeed3: number,
  imgBackground: number,
  campanhaInfluenciadores: CampanhaInfluenciadores[]
}

export interface CampanhaInfluenciadores {

  id: number,
  quantidade: number,
  idRedeSocial: number,
  valorGasto: number,
  influenciador: Influenciador | undefined
}

export interface Influenciador {

  id: number,
  ativo: boolean,
  nomeFantasia: string,
  imgPerfil: number,
  imgFeed1: number,
  imgFeed2: number,
  imgFeed3: number,
  imgBackground: number,
  nicho: Nicho
  redesSociais: RedesSociais[]
}

export interface CardRedeSocialProps {

  id: number,
  nomeRede: string,
  arroba: string,
  link: string,
  custoPubli: number,
  quantidadeSeguidores: number,
  taxaEngajamento: number,
  regiaoAtuacao: string,
  influencerCampanha: CampanhaInfluenciadores | undefined,
}

export interface RedesSociais {
  id: number,
  nomeRede: string,
  arroba: string,
  link: string,
  custoPubli: number,
  quantidadeSeguidores: number,
  taxaEngajamento: number,
  regiaoAtuacao: string,
}
export interface Nicho {
  id: number,
  nome: string,
  descricao: string,
  faixaEtaria: string,
  genero: string,
}

export interface RedeSocial {

  link: string
  nomeRede: string
  quantidadeSeguidores: number
  regiaoAtuacao: string
}

export interface RedeSocialResponse {

  id: number
  link: string
  nomeRede: string
  quantidadeSeguidores: number
  regiaoAtuacao: string
}

export interface NichoNome {
  nome: string
}

export interface ImageProps {
  id: number,
  url: string
}

export interface MyMarcasData {

  id: number,
  nome: string,
  ativo: boolean,
  cnpj: string,
  segmento: string,
  imgPerfil: number,
  imgFeed1: number,
  imgFeed2: number,
  imgFeed3: number,
  imgBackground: number,
  campanhas: [
    {
      id: number,
      nome: string,
      ativo: true,
      inicioCampanha: string,
      encerramentoCampanha: string,
      orcamento: number,
      nicho: string,
      valorGasto: number,
      imgPerfil: number,
      imgFeed1: number,
      imgFeed2: number,
      imgFeed3: number,
      imgBackground: number,
      campanhaInfluenciadores: [
        {
          id: number,
          valorGasto: number,
          quantidade: number,
          idRedeSocial: number,
          influenciador: {
            id: number,
            ativo: true,
            nomeFantasia: string,
            imgPerfil: number,
            imgFeed1: number,
            imgFeed2: number,
            imgFeed3: number,
            imgBackground: number,
            nicho: {
              id: number,
              nome: string,
              descricao: string,
              faixaEtaria: string,
              genero: string,
            },
            redesSociais: [
              {
                id: number,
                nomeRede: string,
                arroba: string,
                link: string,
                custoPubli: number,
                quantidadeSeguidores: number,
                taxaEngajamento: number,
                regiaoAtuacao: string,
              },
              {
                id: number,
                nomeRede: string,
                arroba: string,
                link: string,
                custoPubli: number,
                quantidadeSeguidores: number,
                taxaEngajamento: number,
                regiaoAtuacao: string,
              }
            ]
          }
        }
      ]
    }
  ]
}

export interface PessoaResponse {

  id: number
  nome: string
  cpf: string
  role: string
  email: string
  senha: string
  enderecos: [

    {
      id: number
    }
  ],
  influenciadores: [],
  empresas: []
}

export interface RedesSociaisProps {

  id: string
}

export interface RedesSociaisResponse {

  id: number
  nomeRede: string
  arroba: string
  link: string
  custoPubli: number
  quantidadeSeguidores: number
  taxaEngajamento: number
  regiaoAtuacao: string
}

export interface CarrinhoInfluencersContextProps {

  influencersCampanhas: CampanhaInfluenciadores[]
  setInfluencersCampanhas: Dispatch<SetStateAction<CampanhaInfluenciadores[]>>
  campanha: Campanha
  setCampanha: Dispatch<SetStateAction<Campanha>>
}
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

  children: React.ReactNode
}

export interface subTotalProps {

  id: number
  valor: number
}

export interface quantidadePostsProps {
  id: number
  quantidade: number
}
export interface CampanhaResponse {

  id: number
  nome: string
  nicho: string
  inicioCampanha: Date
  encerramentoCampanha: Date
  orcamento: number
}