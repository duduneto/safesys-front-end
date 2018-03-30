import axios from 'axios';
import urls from '../../../../../common/urls';

export const atualizaProcessoConfirmado = (estado) => {
    // console.log("Entrou no dispatch")
    //     const token = localStorage.getItem('token');
    //     return axios.get(`${urls.API_URL}/contratos?confirm_processo=true&sort=nome`,{headers:{token:token}})
    //     .then( resp => {
    //         console.log('Entrou no Reducer')
            return {type: 'GET_INITIAL_PROCESSO_CONFIRMADOS', payload: estado }        
        // })
        

        // console.log(request)
        // return {type: 'GET_INITIAL_CONTRATOS', payload: ''}
        console.log('saiu do dispatch')
    
}