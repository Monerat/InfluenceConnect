import { useContext } from 'react'

import { AdministradorMarcas } from '../../components/AdministradorMarcas'
import { InfluencersMarcas } from '../../components/InfluencersMarcas'

import { UsuarioContext } from '../../context/UsuarioContext'

export const Marcas = () => {

    const { usuario: { pessoa: { role }}} = useContext(UsuarioContext)
    
    const roles: string[] = ['INFLUENCIADOR', 'MARCA', 'ADMIN']

    if (role === roles[0]) {

        return <InfluencersMarcas />

    } else if (role === roles[2]) {

        return <AdministradorMarcas />
    }
}
