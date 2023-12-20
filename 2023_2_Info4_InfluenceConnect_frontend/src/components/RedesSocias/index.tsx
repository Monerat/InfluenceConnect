import { useFormContext, useFieldArray } from "react-hook-form"

export const RedesSocias = () => {

    const { control, register } = useFormContext()


    const { fields, append, remove } = useFieldArray({

        control,
        name: 'redesSociais'
    })

    const redesSociasLista: string[] = [

        'INSTAGRAM', 'YOUTUBE', 'FACEBOOK', 'TWITCH', 'TIKTOK', 'LINKEDIN', 'KWAI', 'PINTEREST', 'TWITTER'
    ]

    const regioesBrasil: string[] = [

        'NORTE', 'NORDESTE', 'CENTRO-OESTE', 'SUDESTE', 'SUL'
    ]

    return (

        <>
            <legend>Redes Socias</legend>

            {fields.map((field, index) => (

                <div className="redesSociais" key={field.id}>

                    <label
                        htmlFor="RedeSocial"
                        aria-label="campo para preencher nome da rede social do influencer"
                    >
                        Rede Social {index + 1}
                    </label>

                    <div className="campo">

                        <select
                            {...register(`redesSociais[${index}].nomeRede`)}
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
                            {...register(`redesSociais[${index}].arroba`)}
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
                            {...register(`redesSociais[${index}].link`)}
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
                            {...register(`redesSociais[${index}].custoPubli`)}
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
                            {...register(`redesSociais[${index}].quantidadeSeguidores`)}
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
                            {...register(`redesSociais[${index}].taxaEngajamento`)}
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
                            {...register(`redesSociais[${index}].regiaoAtuacao`)}
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

                    <button
                        className="buttonRemover"
                        type="button"
                        onClick={() => remove(index)
                        }>
                        Remover Rede Social
                    </button>

                </div>
            ))}

            <button
                className="buttonAdicionar"
                type="button"
                onClick={() => append({})}
            >
                Adicionar Rede Social
            </button>
        </>
    )
}