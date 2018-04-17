const INITIAL_STATE={
    responsaveis: []
}
export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case 'SET_RESPONSAVEIS': return { responsaveis: action.payload }
    
        default: return state;
    }
}