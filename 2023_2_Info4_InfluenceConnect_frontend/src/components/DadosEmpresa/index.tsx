import { ChangeEvent } from "react";

import { useFormContext } from "react-hook-form"

export const DadosMarcas = () => {

    const { formState: { errors }, register, setValue } = useFormContext()

    const handleCnpjChange = (event: ChangeEvent<HTMLInputElement>) => {
        const cnpj = event.target.value.replace(/\D/g, "");
    
        const formattedCpf = cnpj.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "$1.$2.$3/$4-$5"
        );
    
        setValue("cnpj", formattedCpf);
      };

    return (

        <>
            <div className="campo">

                <label htmlFor="nomeEmpresa" aria-label="campo para preencher nome da empresa">
                    Nome Empresa:
                </label>

                <input
                    type="text"
                    id="nomeEmpresa"
                    {...register('nomeEmpresa')}
                />

                {errors.nomeEmpresa && <span>O nome da empresa é obrigatório</span>}
            </div>

            <div className="campo">

                <label htmlFor="cnpj" aria-label="campo para preencher cnpj da empresa">
                    Cnpj:
                </label>

                <input
                     maxLength={14 }
                     type="text"
                     id="cnpj"
                     {...register('cnpj')}
                     onChange={handleCnpjChange}
                />

                {errors.cnpj && <span>O cnpj da empresa é obrigatório</span>}
            </div>

            <div className="campo" >

                <label htmlFor="segmento" aria-label="campo para preencher segmento da empresa">
                    Segmento
                </label>

                <input
                    type="text"
                    id="segmento"
                    {...register('segmento')}
                />

                {errors.segmento && <span>O segmento da empresa é obrigatório</span>}
            </div>
        </>
    )
}

export const AtualizarDadosMarcas = () => {

    const { register, setValue } = useFormContext()

    const handleCnpjChange = (event: ChangeEvent<HTMLInputElement>) => {
        const cnpj = event.target.value.replace(/\D/g, "");
    
        const formattedCpf = cnpj.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "$1.$2.$3/$4-$5"
        );
    
        setValue("cnpj", formattedCpf);
      };

    return (

        <>
            <div className="campo">

                <label htmlFor="nomeEmpresa" aria-label="campo para preencher nome da empresa">
                    Nome Empresa:
                </label>

                <input
                    type="text"
                    id="nomeEmpresa"
                    {...register('nomeEmpresa')}
                />

            </div>

            <div className="campo">

                <label htmlFor="cnpj" aria-label="campo para preencher cnpj da empresa">
                    Cnpj:
                </label>

                <input
                    maxLength={14 }
                    type="text"
                    id="cnpj"
                    {...register('cnpj')}
                    onChange={handleCnpjChange}
                />

            </div>

            <div className="campo" >

                <label htmlFor="segmento" aria-label="campo para preencher segmento da empresa">
                    Segmento
                </label>

                <input
                    type="text"
                    id="segmento"
                    {...register('segmento')}
                />

            </div>
        </>
    )
}
