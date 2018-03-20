const INITIAL_STATE = {
    contratos: [],
    contratosClone: []
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case 'GET_INITIAL_CONTRATOS': return { contratos: action.payload, contratosClone: action.payload }
        default: return state;
    }
}