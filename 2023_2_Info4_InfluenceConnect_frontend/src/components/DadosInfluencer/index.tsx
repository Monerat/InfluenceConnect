import { useFormContext } from "react-hook-form"

export const Nicho = () => {

    const { register } = useFormContext()

    const faixaEtariaLista: string[] = [

        'CRIANCA', 'PRÉ_ADOLESCENTE', 'ADOLESCENTE', 'JOVEM_ADULTO', 'ADULTO', 'ADULTO_MADURO', 'ADULTO_SÉNIOR', 'SUPERSÊNIOR'
    ]

    return (

        <>

            <legend>Nicho</legend>

            <div className="campo">
                <label
                    htmlFor="nomeNicho"
                    aria-label="campo para preencher nome do nicho do influencer"
                >
                    Nicho
                </label>
                <input
                    type="text"
                    id="nomeNicho"
                    {...register('nicho.nomeNicho')}
                />

            </div>
            <div className="campo">
                <label
                    htmlFor="descricao"
                    aria-label="campo para preencher descricao do nicho"
                >
                    Descrição
                </label>
                <input
                    type="text"
                    id="descricao"
                    {...register('nicho.descricao')}
                />

            </div>
            <div className="campo">
                <label
                    htmlFor="faixaEtaria"
                    aria-label="campo para preencher Faixa etária do influencer"
                >
                    Faixa etária
                </label>

                <select
                    id="faixaEtaria"
                    {...register('nicho.faixaEtaria')}
                >
                    {
                        faixaEtariaLista.map(faixaEtaria =>
                            <option
                                key={faixaEtaria}
                                value={faixaEtaria}
                            >
                                {faixaEtaria}
                            </option>
                        )
                    }
                </select>

            </div>
            <div className="campo">
                <label
                    htmlFor="genero"
                    aria-label="campo para preencher gênero do público do influencer"
                >
                    Gênero
                </label>

                <select
                    id="genero"
                    {...register('nicho.genero')}
                >

                    <option value="MASCULINO">
                        Masculino
                    </option>

                    <option value="FEMININO">
                        Feminino
                    </option>

                    <option value="OUTROS">
                        Outros
                    </option>

                </select>
            </div>
        </>
    )
}