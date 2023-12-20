import { useContext, useState } from 'react'

import { InfluencersHome } from '../../components/InfluencersHome'
import { MarcasHome } from '../../components/MarcasHome'
import { AdministradorHome } from '../../components/AdministradorHome'

import { UsuarioContext } from '../../context/UsuarioContext'
import { Loading } from '../../components/Loading'

export const Home = () => {

    const { usuario: { pessoa: { role } } } = useContext(UsuarioContext)

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const roles: string[] = ['INFLUENCIADOR', 'MARCA', 'ADMIN']

    setTimeout(() => {

        setIsLoading(false)
    }, 2000);

    if (isLoading) {

        return <Loading />
    }

    if (role === roles[0]) {

        return <InfluencersHome />

    } else if (role === roles[1]) {

        return <MarcasHome />

    } else if (role === roles[2]) {

        return <AdministradorHome />
    }

}
