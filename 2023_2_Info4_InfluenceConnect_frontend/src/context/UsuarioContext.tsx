import React, { createContext, useEffect, useState } from 'react'
import { ContextProps, Usuario, UsuarioContextProps } from '../interface';

export const UsuarioContext = createContext<UsuarioContextProps>({

    usuario: {

        token: '',
        pessoa: {

            id: 0,
            nome: '',
            cpf: '',
            role: '',
            email: '',
            senha: '',
            enderecos: [

                {
                    id: 0,
                    tipoEndereco: '',
                    cep: '',
                    tipoLogradouro: '',
                    logradouro: '',
                    numero: '',
                    complemento: '',
                    bairro: '',
                    cidade: '',
                    estado: '',
                }

            ],
            influenciadores: [],
            empresas: []
        }
    },
    setUsuario: () => { },
    token: '',
    setToken: () => { }
})

export const UsuarioProvider: React.FC<ContextProps> = ({ children }) => {

    const [token, setToken] = useState<string>('')
    const [usuario, setUsuario] = useState<Usuario>({

        token: '',
        pessoa: {

            id: 0,
            nome: '',
            cpf: '',
            role: '',
            email: '',
            senha: '',
            enderecos: [

                {
                    id: 0,
                    tipoEndereco: '',
                    cep: '',
                    tipoLogradouro: '',
                    logradouro: '',
                    numero: '',
                    complemento: '',
                    bairro: '',
                    cidade: '',
                    estado: '',
                }

            ],
            influenciadores: [],
            empresas: []
        }
    })

    useEffect(() => {

        verificarToken()
    },[])

    const verificarToken = () => {

        const tokenStorage = localStorage.getItem('token')

        if (tokenStorage) {

            setToken(tokenStorage)
        }
    }

    return (

        <UsuarioContext.Provider
            value={{ usuario, setUsuario, token, setToken }}
        >
            {children}
        </UsuarioContext.Provider>
    )
}