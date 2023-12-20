import axios, { AxiosResponse } from "axios";

export const api = axios.create({

    baseURL: 'http://35.184.203.56:8010/api/'
})

export const headersRequest = () => {

    const token = localStorage.getItem('token')

    const headersImg = {

        "Content-Type": "multipart/form-data",
        Authorization: token,
    } 

    const header = {

        Authorization: token,
    } 

    return { header, headersImg } 
} 

export function getMarca(id?: string, parHeader?: { 'Authorization': string | null }): Promise<AxiosResponse> {
    const url = `empresas/${id}` 
    return api.get(url, {
        headers: parHeader,
    })
}

export function getMyMarcas(parHeader?: { 'Authorization': string | null }): Promise<AxiosResponse> {

    const url = `influenciadores/campanhas-marcas`

    return api.get(url, {

        headers: parHeader
    })
}

export function getAllMarcas(

    parHeader?: { Authorization: string | null }
): Promise<AxiosResponse> {

    const url = "empresas"

    return api.get(url, {
        headers : parHeader
    })
}

export function getImagem(id?: number, entidade?: string, parHeader?: { 'Authorization': string | null }): Promise<AxiosResponse> {
    const url = `${entidade}/imagem/${id}` 
    return api.get(url, {
        headers: parHeader,
        responseType: 'blob'
    })
}
export function getInfluenciador(
    id?: string,
    parHeader?: { Authorization: string | null }
): Promise<AxiosResponse> {

    const url = `influenciadores/${id}` 

    return api.get(url, {
        headers: parHeader,
    }) 
}

export function getPessoaPorIdMarca(id?: number,
    parHeader?: { Authorization: string | null }
): Promise<AxiosResponse> {
    const url = `empresas/pessoa/${id}` 
    return api.get(url, {
        headers: parHeader,
    }) 
}

export function getCampanhas(parHeader?: { 'Authorization': string | null }): Promise<AxiosResponse> {
    const url = `campanhas`
    
    return api.get(url, {
        headers: parHeader
    })
}
export function getCampanhaPorId(id?: string,parHeader?: { 'Authorization': string | null }): Promise<AxiosResponse> {
    const url = `campanhas/${id}`
    
    return api.get(url, {
        headers: parHeader
    })
}

export function getAllInfluencers(

    parHeader?: { Authorization: string | null }
): Promise<AxiosResponse> {

    const url = "influenciadores"

    return api.get(url, {
        headers : parHeader
    })
}

export function getEmpresasPorToken(

    parHeader?: { Authorization: string | null }
): Promise<AxiosResponse> {

    const url = "empresas/campanhas"

    return api.get(url, {
        headers : parHeader
    })
}

export function getAllPessoas(

    parHeader: { Authorization: string | null } 
): Promise<AxiosResponse> {

    const url = "pessoas"

    return api.get(url, {
        headers : parHeader
    })
}

export function putEntidade(

    url: string,
    entidade: any,
    parHeader?: { Authorization: string | null }

): Promise<AxiosResponse> {

    return api.put(url, entidade, {
        headers: parHeader
    })
}

export function postEntidade(

    url: string,
    entidade: any,
    parHeader?: { Authorization: string | null }

): Promise<AxiosResponse> {

    return api.post(url, entidade, {
        headers: parHeader
    })
}

export function getInfluencers (parHeader?: { 'Authorization': string | null }) : Promise<AxiosResponse>  {

    const url = 'influenciadores'

    return api
        .get(url, {
            headers : parHeader
        });

};

