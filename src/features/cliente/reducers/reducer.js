const INITIAL_STATE={
    dadosPerfilCliente: []
}


export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        
        case 'SET_DADOS_PERFIL': return { dadosPerfilCliente: action.payload }
       
        default: return state;
    }
}