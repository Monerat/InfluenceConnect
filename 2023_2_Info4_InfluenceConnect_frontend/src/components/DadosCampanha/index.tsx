import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form"
import { api, headersRequest } from "../../api/api";

interface Empresas {

    id: number,
    nome: string
}

export const DadosCampanhas = () => {

    const { formState: { errors }, register } = useFormContext()

    const { header } = headersRequest();

    const [marcas, setMarcas] = useState<Empresas[]>([]);

    const fetchMarcas = async () => {
        try {
            const response = await api.get('empresas', { headers: header });
            setMarcas(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMarcas();
    }, []);

    return (

        <>
            <div className="campo">

                <label htmlFor="nomeCampanha" aria-label="campo para preencher nome da campanha">
                    Nome Campanha:
                </label>

                <input
                    type="text"
                    id="nomeCampanha"
                    {...register('nomeCampanha')}
                />

                {errors.nomeCampanha && <span>O nome da campanha é obrigatório</span>}
            </div>

            <div className="campo">

                <label htmlFor="nicho" aria-label="campo para preencher nicho campanha">
                    Nicho:
                </label>

                <input
                    type="text"
                    id="nicho"
                    {...register('nicho')}
                />

                {errors.nicho && <span>O nome da campanha é obrigatório</span>}
            </div>

            <div className="campo">

                <label htmlFor="inicioCampanha" aria-label="campo para preencher data de início da campanha">
                    Início Campanha:
                </label>

                <input
                    type="date"
                    id="inicioCampanha"
                    {...register('inicioCampanha')}
                />

                {errors.inicioCampanha && <span>O inicio da campanha é obrigatório e precisa ser uma data futura</span>}
            </div>

            <div className="campo" >

                <label htmlFor="encerramentoCampanha" aria-label="campo para preencher data de encerramento da campanha">
                    Encerramento Campanha:
                </label>

                <input
                    type="date"
                    id="encerramentoCampanha"
                    {...register('encerramentoCampanha')}
                />

                {errors.encerramentoCampanha && <span>O encerramento da campanha precisa ser uma data maior que o início da campanha</span>}
            </div>

            <div className="campo">

                <label htmlFor="orcamento" aria-label="campo para preencher valor do orçamento">
                    Orçamento:
                </label>

                <input
                    type="number"
                    id="orcamento"
                    {...register('orcamento')}
                />

                {errors.orcamento && <span>O orçamento é obrigatório</span>}
            </div>

            <div className="campo">
                <label htmlFor="marcaCampanha" aria-label="selecione a marca da campanha">
                    Marca da Campanha:
                </label>

                <select id="marcaCampanha" {...register("idEmpresa")}>

                    {marcas
                        .sort((a, b) => a.nome.localeCompare(b.nome))
                        .map((marca) => (
                            <option
                                key={marca.id}
                                value={marca.id}
                            >
                                {marca.nome}
                            </option>
                        ))}
                </select>

                {errors.marcaCampanha && <span>Selecione uma marca para a campanha</span>}
            </div>

        </>
    )
}

export const AtualizarDadosCampanha = () => {

    const { register } = useFormContext()
   

    return (

        <>
            <div className="campo">

                <label htmlFor="nomeCampanha" aria-label="campo para preencher nome da campanha">
                    Nome Campanha:
                </label>

                <input
                    type="text"
                    id="nomeCampanha"
                    {...register('nomeCampanha')}
                />

            </div>

            <div className="campo">

                <label htmlFor="nicho" aria-label="campo para preencher nicho campanha">
                    Nicho:
                </label>

                <input
                    type="text"
                    id="nicho"
                    {...register('nicho')}
                />

            </div>

            <div className="campo">

                <label htmlFor="inicioCampanha" aria-label="campo para preencher data de início da campanha">
                    Início Campanha:
                </label>

                <input
                    type="date"
                    id="inicioCampanha"
                    {...register('inicioCampanha')}
                />

            </div>

            <div className="campo" >

                <label htmlFor="encerramentoCampanha" aria-label="campo para preencher data de encerramento da campanha">
                    Encerramento Campanha:
                </label>

                <input
                    type="date"
                    id="encerramentoCampanha"
                    {...register('encerramentoCampanha')}
                />
            </div>

        </>
    )
}

