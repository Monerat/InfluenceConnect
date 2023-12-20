import React, { useContext } from 'react'

import { Arroba, CardContainer, Header, Informacoes, Link } from './styles'
import { FontSizeContext } from '../../context/fontSizeContext'
import { ThemeContext } from '../../context/themeContext'
import { ButtonPrincipal } from '../ButtonPrincipal'
import { Instagram, Facebook, Twitter, Youtube, Linkedin, Twitch, Video } from "lucide-react"
import { FaTiktok, FaPinterestP } from "react-icons/fa"
import { CampanhaInfluenciadores, CardRedeSocialProps } from "../../interface/index.tsx"
import { handleMoney, handleNumero, handlePercentage } from '../../common/Utils/index.tsx'
import { CarrinhoInfluencersContext } from '../../context/carrinhoInfluencers.tsx'
import { useNavigate } from 'react-router-dom'
import { UsuarioContext } from '../../context/UsuarioContext.tsx'

export const CardRedeSocial: React.FC<CardRedeSocialProps> = ({

    id, nomeRede, arroba, link, custoPubli, quantidadeSeguidores, taxaEngajamento, regiaoAtuacao, influencerCampanha
}) => {

    const { paragrafoSize } = useContext(FontSizeContext)
    const { darkMode } = useContext(ThemeContext)
    const { setInfluencersCampanhas } = useContext(CarrinhoInfluencersContext)
    const { usuario: { pessoa: { role } } } = useContext(UsuarioContext)

    const navigate = useNavigate()

    const socialIcons = {
        INSTAGRAM: Instagram,
        FACEBOOK: Facebook,
        TWITTER: Twitter,
        YOUTUBE: Youtube,
        LINKEDIN: Linkedin,
        TWITCH: Twitch,
        TIKTOK: FaTiktok,
        PINTEREST: FaPinterestP,
        KAWAI: Video,
    }

    const renderSocialIcons = () => {

        const socialKeyName = nomeRede.toUpperCase()
        const IconComponent = socialIcons[socialKeyName as keyof typeof socialIcons]

        if (IconComponent) {

            return (

                <div key={id}>
                    <Link aria-label={`Link referente a Rede Social ${nomeRede}`} href={link} $darkMode={darkMode} target="_blank">
                        <IconComponent aria-label={`Icone da Rede Social ${nomeRede}`} size={40} />
                    </Link>
                </div>
            )
        }
    }

    const handleAdicionarRedeSocial = (

        influencerCampanha: CampanhaInfluenciadores | undefined
    ) => {

        if (influencerCampanha !== undefined) {

            setInfluencersCampanhas(oldState => [...oldState, influencerCampanha])
            navigate('/finalizar-campanha')
        }
    }

    return (
        <CardContainer key={id} $fontSizeButton={paragrafoSize} $darkMode={darkMode}>
            <Header>
                <strong>{nomeRede}</strong>
                {renderSocialIcons()}
            </Header>

            <Informacoes>
                <Arroba>{arroba}</Arroba>

                <p><strong>Quantidade de Seguidores: </strong>{handleNumero(quantidadeSeguidores)}</p>
                <p><strong>Custo por Publicação: </strong> {handleMoney(custoPubli)}</p>
                <p><strong>Taxa de engajamento: </strong> {handlePercentage(taxaEngajamento)}</p>
                <p><strong>Maior impacto no publico da Região: </strong>{regiaoAtuacao}</p><br />
            </Informacoes>

            {
                influencerCampanha?.influenciador?.ativo === true &&
                role === "ADMIN" &&
                <ButtonPrincipal
                    onClick={() => handleAdicionarRedeSocial(influencerCampanha)}
                >
                    Adicionar à Campanha
                </ButtonPrincipal>
            }
        </CardContainer>
    )
}
