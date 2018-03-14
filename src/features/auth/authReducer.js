const userKey = '_safesys_key';

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem(userKey)),
    validToken: false
}

export default (state = INITIAL_STATE, action) =>{
    if(!action) return state;
    switch (action.type){
        case 'TOKEN_VALIDATED':
            if(action.payload) {
                const error = null;
                return { ...state, validToken: true, error };
            } else {
                localStorage.removeItem(userKey);
                return {...state, validToken: false};
            }


        case 'USER_FETCHED':
            localStorage.setItem(userKey, action.payload);
            return {...state, user: action.payload, validToken: true }
            default:
                return state;
    }
}