export function setDadosDependentePerfil(estado){
        
    return{

        type:'SET_DADOS_PERFIL_DEPENDENTE',
        payload: estado
    }
}

export function atualizaDadosDependentePerfil(initialState,estado){
    
    const array = initialState;
    array.push(estado);
    
    return{

        type:'ATUALIZA_DADOS_PERFIL_DEPENDENTE',
        payload: array
    }
}

