

export function setDadosCadastro(estado){
    return{
        type: 'SET_DADOS_CADASTRO',
        payload: estado
    }
}


export function addDadosDependente(initialState,estado){
    
    const array = initialState;
    array.push(estado);
    console.log(array)

    return{
        type: 'ADD_DADOS_DEPENDENTE',
        payload: array
    }
}

export function falseRender(){
    return{
        type: 'FALSE_RENDER'
    }
}

export function apagaDependentes(){
    return{
        type:'APAGA_DEPENDENTES',
        payload:[]
    }
}