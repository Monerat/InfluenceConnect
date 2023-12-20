import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { getInfluenciador } from "../../api/api"
import { headersRequest } from "../../api/api"
import { RedesSociaisProps, RedesSociaisResponse } from "../../interface"

export const RedeSocial: React.FC<RedesSociaisProps> = ({ id }) => {

    const { register } = useFormContext()
    const { header } = headersRequest()

    const [redesSociais, setRedesSocias] = useState<RedesSociaisResponse[]>()

    useEffect(() => {

        getRedesSocias()
    }, [])

    const getRedesSocias = () => {

        getInfluenciador(id, header)
            .then(response => {
                
                setRedesSocias(response.data.redesSociais)
            })
            .catch(error => console.log(error))
    }

    const redesSociasLista: string[] = [

        'INSTAGRAM', 'YOUTUBE', 'FACEBOOK', 'TWITCH', 'TIKTOK', 'LINKEDIN', 'KWAI', 'PINTEREST', 'TWITTER'
    ]

    const regioesBrasil: string[] = [

        'NORTE', 'NORDESTE', 'CENTRO-OESTE', 'SUDESTE', 'SUL'
    ]

    return (

        <>
            <legend>Rede Social</legend>

            <div className="redesSociais">

                <div className="campo">
                    <label
                        htmlFor="RedeSocial"
                        aria-label="campo para preencher nome da rede social do influencer"
                    >
                        Escolha a rede social que deseja atualizar
                    </label>

                    <select
                        id="RedeSocial"
                        {...register(`redeSocial.idRedeAtualizar`)}
                    >
                        {
                            redesSociais?.map(redeSocial =>
                                <option
                                    key={redeSocial.id}
                                    value={redeSocial.id}
                                >
                                    {redeSocial.nomeRede}
                                </option>
                            )
                        }
                    </select>
                </div>

                <div className="campo">

                    <label
                        htmlFor="RedeSocialNova"
                        aria-label="campo para preencher nome da rede social do influencer"
                    >
                        Rede Social Nova
                    </label>

                    <select
                        id="RedeSocialNova"
                        {...register(`redeSocial.nomeRedeNova`)}
                    >
                        {
                            redesSociasLista.map(redeSocial =>
                                <option
                                    key={redeSocial}
                                    value={redeSocial}
                                >
                                    {redeSocial}
                                </option>
                            )
                        }
                    </select>

                </div>
                <div className="campo">
                    <label
                        htmlFor="arroba"
                        aria-label="campo para preencher arroba da rede social do influencer"
                    >
                        Arroba
                    </label>
                    <input
                        type="text"
                        id="arroba"
                        {...register(`redeSocial.arroba`)}
                    />

                </div>
                <div className="campo"
                >
                    <label
                        htmlFor="link"
                        aria-label="campo para preencher link da rede social do influencer"
                    >
                        Link
                    </label>
                    <input
                        type="text"
                        id="link"
                        {...register(`redeSocial.link`)}
                    />

                </div>
                <div className="campo">
                    <label
                        htmlFor="custoPublicidade"
                        aria-label="campo para preencher custo da publicidade do influencer"
                    >
                        Custo da Publicidade
                    </label>
                    <input
                        type="number"
                        id="custoPublicidade"
                        {...register(`redeSocial.custoPubli`)}
                    />

                </div>
                <div className="campo">
                    <label
                        htmlFor="quantidadeSeguidores"
                        aria-label="campo para preencher quantidade de seguidores do influencer"
                    >
                        Quantidade de Seguidores
                    </label>
                    <input
                        type="number"
                        id="quantidadeSeguidores"
                        {...register(`redeSocial.quantidadeSeguidores`)}
                    />

                </div>
                <div className="campo">
                    <label
                        htmlFor="taxaEngajamento"
                        aria-label="campo para preencher taxa de engajamento do influencer"
                    >
                        Taxa de Engajamento
                    </label>
                    <input
                        type="text"
                        id="taxaEngajamento"
                        {...register(`redeSocial.taxaEngajamento`)}
                    />
                </div>

                <div className="campo">
                    <label
                        htmlFor="regiaoAtuacao"
                        aria-label="campo para preencher regiao de atuação do influencer"
                    >
                        Região de Atuação
                    </label>

                    <select
                        {...register(`redeSocial.regiaoAtuacao`)}
                    >
                        {
                            regioesBrasil.map(regiao =>
                                <option
                                    key={regiao}
                                    value={regiao}
                                >
                                    {regiao}
                                </option>
                            )
                        }
                    </select>
                </div>
            </div>
        </>
    )
}