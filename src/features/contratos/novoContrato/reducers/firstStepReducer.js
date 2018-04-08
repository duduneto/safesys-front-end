const INITIAL_STATE={
    naturezaProcesso:''
}


export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        
        case 'SET_NATUREZA_PROCESSO': return { naturezaProcesso: action.payload }
       
        default: return state;
    }
}