import axios from 'axios';
import urls from '../../../../../common/urls';

export const getContratosConfirmados = async () => {
    
        console.log("Entrou no dispatch")
        const token = localStorage.getItem('token');
        return axios.get(`${urls.API_URL}/contratos?confirm_processo=true&sort=nome`,{headers:{token:token}})
        .then( resp => {
            return {type: 'GET_INITIAL_PROCESSO_CONFIRMADOS', payload: resp.data }        
        })
        

        // console.log(request)
        // return {type: 'GET_INITIAL_CONTRATOS', payload: ''}
        console.log('saiu do dispatch')
    
        
}

export const filtraProcesso = (array) => {
    return {
        type: 'FILTRA_PROCESSO_CONFIRMADOS',
        payload: array
    }
}

export const limpaPesquisaProcesso = (estadoOriginal) => {
    return {
        type: 'LIMPA_PESQUISA_CONFIRMADOS',
        payload: estadoOriginal
    }
}