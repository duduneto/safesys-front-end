const INITIAL_STATE={
    numberPage: 0,
    disableNext: true
}


export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        
        case 'ATUALIZA_CURRENT': return { numberPage: action.payload }
        case 'HABILITA_NEXT': return { disableNext: action.payload }
       
        default: return state;
    }
}