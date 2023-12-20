import { useContext } from 'react'
import { UsuarioContext } from '../../context/UsuarioContext'
import { AdministradorCampanhas } from '../../components/AdministradorCampanhas'
import { InfluencersCampanhas } from '../../components/InfluencersCampanhas'
import { MarcasCampanhas } from '../../components/MarcasCampanhas'
import { Page404 } from '../Page404'

export const Campanhas = () => {

    const { usuario: { pessoa : { role }}} = useContext(UsuarioContext)

    const roles: string[] = ['INFLUENCIADOR', 'MARCA', 'ADMIN']

    if (role === roles[0]) {

        return <InfluencersCampanhas/>

    } else if (role === roles[1]) {

        return <MarcasCampanhas/>

    } else if (role === roles[2]) {

        return <AdministradorCampanhas/>
    } else {

        return <Page404 />
    }
}
