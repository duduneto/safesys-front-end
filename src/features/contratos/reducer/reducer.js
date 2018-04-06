const INITIAL_STATE = {
    contratosConfirmados: [],
    contratosConfirmadosClone: [],
    contratosPendentes: [],
    contratosPendentesClone: [],
    dadosProcessoEditar:[],
    modalVisible:false
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case 'GET_INITIAL_PROCESSO_PENDENTES': return { ...state , contratosPendentes: action.payload, contratosPendentesClone: action.payload }
        case 'FILTRA_PROCESSO_PENDENTES': return { ...state, contratosPendentesClone: action.payload }
        case 'LIMPA_PESQUISA_PENDENTES': return { ...state, contratosPendentesClone: action.payload }
        case 'REMOVE_PROCESSO_PENDENTES': return { ...state, contratosPendentesClone: action.payload }

        case 'GET_INITIAL_PROCESSO_CONFIRMADOS': return { ...state , contratosConfirmados: action.payload, contratosConfirmadosClone: action.payload }
        case 'FILTRA_PROCESSO_CONFIRMADOS': return { ...state, contratosConfirmadosClone: action.payload }
        case 'LIMPA_PESQUISA_CONFIRMADOS': return { ...state, contratosConfirmadosClone: action.payload }
        case 'REMOVE_PROCESSO_CONFIRMADOS': return { ...state, contratosConfirmadosClone: action.payload }

        case 'MODAL_VISIBLE': return {modalVisible: action.payload}
        case 'MODAL_UNVISIBLE': return {modalVisible: action.payload}

        
        default: return state;
    }
}