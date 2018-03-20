import axios from 'axios';
import urls from '../../../../../common/urls';

export function getContratos(token){
    return dispatch => {
        axios.get(`${urls.API_URL}/contratos`, {headers:{token:token}})
        .then(resp =>{
            dispatch({type:'GET_INITIAL_CONTRATOS', payload:[ resp.data]})
        })
        .catch( error => {console.log(error)})
    }
}