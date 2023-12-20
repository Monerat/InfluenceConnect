import { useFormContext } from "react-hook-form"

export const Imagens = () => {

    const { register } = useFormContext()

    return (

        <>

            <legend>Imagens</legend>

            <div className="campo">
                <label
                    htmlFor="imgPerfil"
                    aria-label="campo para colocar imagem de perfil do influencer"
                >
                    Imagem de perfil
                </label>
                <input
                    className="inputImagem"
                    accept="image/*"
                    type="file"
                    id="imgPerfil"
                    {...register('imagens.perfil')}
                />

            </div>

            <div className="campo">
                <label
                    htmlFor="imgFeed1"
                    aria-label="campo para colocar imagem do feed do influencer"
                >
                    Imagem Feed 1
                </label>
                <input
                    className="inputImagem"
                    accept="image/*"
                    type="file"
                    id="imgFeed1"
                    {...register('imagens.feed1')}
                />
            </div>

            <div className="campo">
                <label
                    htmlFor="imgFeed2"
                    aria-label="campo para colocar imagem do feed do influencer"
                >
                    Imagem Feed 2
                </label>
                <input
                    className="inputImagem"
                    accept="image/*"
                    type="file"
                    id="imgFeed2"
                    {...register('imagens.feed2')}
                />
            </div>

            <div className="campo">
                <label
                    htmlFor="imgFeed3"
                    aria-label="campo para colocar imagem do feed do influencer"
                >
                    Imagem Feed 3
                </label>
                <input
                    className="inputImagem"
                    accept="image/*"
                    type="file"
                    id="imgFeed3"
                    {...register('imagens.feed3')}
                />
            </div>

            <div className="campo">
                <label
                    htmlFor="background"
                    aria-label="campo para colocar imagem de fundo do perfil do influencer"
                >
                    Background
                </label>
                <input
                    className="inputImagem"
                    accept="image/*"
                    type="file"
                    id="background"
                    {...register('imagens.background')}
                />
            </div>

        </>
    )
}