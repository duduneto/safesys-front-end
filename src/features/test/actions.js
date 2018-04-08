export function atualizaCurrent(estado){
    console.log('ENTROU NA ACTION')
    return{
        type:'ATUALIZA_CURRENT',
        payload: estado
    }
}

