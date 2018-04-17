const INITIAL_STATE={
    dadosPerfilDependente: [],
    dadosPerfilDependenteEditar: [] 
}


export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        
        case 'SET_DADOS_PERFIL_DEPENDENTE': return { dadosPerfilDependente: action.payload }
        case 'SET_DADOS_PERFIL_DEPENDENTE_EDITAR': return { dadosPerfilDependenteEditar: action.payload }
        case 'ATUALIZA_DADOS_PERFIL_DEPENDENTE': return { dadosPerfilDependente: action.payload }
       
        default: return state;
    }
}