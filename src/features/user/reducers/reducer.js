const INITIAL_STATE={
    usuarios: [],
    usuariosClone: [],
    usuarioMais:[]
}


export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        
        case 'SET_USUARIOS': return { usuarios: action.payload, usuariosClone: action.payload }
        case 'FILTRA_PROCESSO_USUARIOS': return { ...state, usuariosClone: action.payload }
        case 'LIMPA_PESQUISA_USUARIOS': return { ...state, usuariosClone: action.payload }
        case 'USUARIO_MAIS': return { usuarioMais: action.payload }
       
        default: return state;
    }
}