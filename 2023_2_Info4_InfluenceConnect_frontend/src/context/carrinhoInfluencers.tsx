import React, { createContext, useState } from 'react'
import { Campanha, CarrinhoInfluencersContextProps, ContextProps, CampanhaInfluenciadores} from '../interface'

export const CarrinhoInfluencersContext = createContext<CarrinhoInfluencersContextProps>({

    influencersCampanhas: [],
    setInfluencersCampanhas: () => { },
    campanha: {

        foto:'',
        campanha: '',
        id: 0,
        ativo: false,
        nome: '',
        inicioCampanha: '',
        encerramentoCampanha: '',
        orcamento: 0,
        valorGasto: 0,
        nicho: '',
        imgPerfil: 0,
        imgFeed1: 0,
        imgFeed2: 0,
        imgFeed3: 0,
        imgBackground: 0,
        campanhaInfluenciadores: []
    },
    setCampanha: () => { }
})

export const CarrinhoInfluencersProvider: React.FC<ContextProps> = ({ children }) => {

    const [influencersCampanhas, setInfluencersCampanhas] = useState<CampanhaInfluenciadores[]>([]) 
    const [campanha, setCampanha] = useState<Campanha>({

        foto:'',
        campanha: '',
        id: 0,
        ativo: false,
        nome: '',
        inicioCampanha: '',
        encerramentoCampanha: '',
        orcamento: 0,
        valorGasto: 0,
        nicho: '',
        imgPerfil: 0,
        imgFeed1: 0,
        imgFeed2: 0,
        imgFeed3: 0,
        imgBackground: 0,
        campanhaInfluenciadores: []
    }) 

    return (
        <CarrinhoInfluencersContext.Provider
            value={{
                influencersCampanhas, setInfluencersCampanhas,
                campanha, setCampanha
            }}
        >
            {children}
        </CarrinhoInfluencersContext.Provider>
    ) 
} 

