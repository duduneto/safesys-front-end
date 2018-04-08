const INITIAL_STATE={
    dependentes: [],
    render:false
}


export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        
        case 'ADD_DADOS_DEPENDENTE': return { ...state, dependentes: action.payload, render: true }
        case 'APAGA_DEPENDENTES': return { dependentes: action.payload }
        case 'FALSE_RENDER': return { ...state, render: false }
       
        default: return state;
    }
}