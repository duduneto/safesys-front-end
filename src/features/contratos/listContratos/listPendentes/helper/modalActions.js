import axios from 'axios';
import urls from '../../../../../common/urls';

export function atualizaProcessoPendente(estado){
    console.log("Entrou no dispatch")
        // const token = localStorage.getItem('token');
        // return axios.get(`${urls.API_URL}/contratos?confirm_processo=false&sort=nome`,{headers:{token:token}})
        // .then( resp => {
            return {type: 'GET_INITIAL_PROCESSO_PENDENTES', payload: estado }        
        // })
        

        // console.log(request)
        // return {type: 'GET_INITIAL_CONTRATOS', payload: ''}
        console.log('saiu do dispatch')
    
}

export function abreModal(){
    console.log('abrir Modal')
    return {
        type: 'MODAL_VISIBLE',
        payload: true
    }
}

export function fechaModal(){
    console.log('Fechar Modal')
    return {
        type: 'MODAL_UNVISIBLE',
        payload: false
    }
}
