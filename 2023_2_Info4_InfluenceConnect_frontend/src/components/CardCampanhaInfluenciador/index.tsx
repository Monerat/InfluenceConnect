import { useContext, useState } from "react"
import { handleMoney, handleNumero } from "../../common/Utils"
import { CampanhaInfluenciadores, RedesSociais } from "../../interface"
import { ThemeContext } from "../../context/themeContext"
import { Posts } from "./styles"
import { ArrowLeft, ArrowRight } from "lucide-react"

export interface InfoInfluencerProps {

    influencerCampanha: CampanhaInfluenciadores
    updatePosts: (newPosts: number) => void;
    updateSubtotal: (newSubtotal: number) => void;
}

export const CardCampanhaInfluenciador: React.FC<InfoInfluencerProps> = (
    { influencerCampanha, updatePosts, updateSubtotal }
) => {

    const { darkMode } = useContext(ThemeContext)

    const [posts, setPosts] = useState<number>(0)

    const influencerCampanhaId: number = influencerCampanha.id
    const redeSocial: RedesSociais | undefined = influencerCampanha.influenciador?.redesSociais.find((redeSocial) => {
        return redeSocial.id === influencerCampanha.idRedeSocial;
    });


    if (redeSocial === undefined) {
        return <div>No redeSocial found</div>;
    }

    const handleDiminuirPosts = () => {
        if (posts > 0) {
            let postNumber = posts - 1;
            setPosts(postNumber);
            updatePosts(postNumber);
            updateSubtotal(postNumber * redeSocial.custoPubli);
        }
    }

    const handleAumentarPosts = () => {

        let postNumber = posts + 1;

        setPosts(postNumber);
        updatePosts(postNumber);
        updateSubtotal(postNumber * redeSocial.custoPubli);
    }

    return (

        <div
            className="redesSociais"
            key={influencerCampanhaId}
        >
            <span>Rede Social: {redeSocial?.nomeRede} { }</span>

            <span>
                {handleNumero(redeSocial?.quantidadeSeguidores)} seguidores
            </span>

            <span>
                Custo Publicidade: {handleMoney(redeSocial?.custoPubli)}
            </span>

            <Posts $darkMode={darkMode}>
                Quantidade de Post:

                <div className="postQuantidade">

                    {
                        posts > 0 &&

                        <button onClick={handleDiminuirPosts}>
                            <ArrowLeft />
                        </button>
                    }

                    {posts}

                    <button onClick={handleAumentarPosts}>
                        <ArrowRight />
                    </button>
                </div>
            </Posts>
        </div>
    )
}