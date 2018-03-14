import toastr from 'react-redux-toastr';
import axios from 'axios';
import urls from '../../common/urls';


export function login(credentials){
    return submit(credentials, `${urls.OAPI_URL}/login`);
}

export function signup(value){
    return submit(value, `${urls.API_URL}/signup`);
}

function submit(credentials, url){
    return dispatch => {
        axios.post(url, credentials)
            .then(resp => {
                console.log(resp.data);
                dispatch([
                    {type: 'USER_FETCHED', payload: resp.data}
                ]);
            })
            .catch(error => {
                error.response.data.errors.forEach(err => {
                    toastr.error('Erro', err)
                });
            });
    }
}

export function logout(){
    return { type: 'TOKEN_VALIDATED', payload: false }
}

export function validateToken(token){
    return dispatch => {
        if(token) {
            axios.post(`${urls.OAPI_URL}/validateToken`, { token })
                .then(resp => {
                    dispatch( {type: 'TOKEN_VALIDATED', payload: resp.data.valid })
                })
                .catch(err => dispatch({ type: 'TOKEN_VALIDATED', payload:false }))
        }else{
            dispatch({ type: 'TOKEN_VALIDATED', payload:false })
        }
    }
}