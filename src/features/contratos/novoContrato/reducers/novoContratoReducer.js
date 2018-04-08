const INITIAL_STATE={
    dadosNovoContrato:[]
}


export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        
        case 'SET_DADOS_CADASTRO': return { ...state, dadosNovoContrato: action.payload }
       
        default: return state;
    }
}