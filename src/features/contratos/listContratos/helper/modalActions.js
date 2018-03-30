import axios from 'axios';
import urls from '../../../../common/urls';

export function removeProcesso(){
    console.log("Entrou no dispatch")
        const token = localStorage.getItem('token');
        return axios.get(`${urls.API_URL}/contratos?confirm_processo=false&sort=nome`,{headers:{token:token}})
        .then( resp => {
            return {type: 'GET_INITIAL_CONTRATOS', payload: resp.data }        
        })
        

        // console.log(request)
        // return {type: 'GET_INITIAL_CONTRATOS', payload: ''}
        console.log('saiu do dispatch')
    
}