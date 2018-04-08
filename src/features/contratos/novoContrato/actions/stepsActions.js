export function atualizaCurrent(estado){
    
    return{
        type:'ATUALIZA_CURRENT',
        payload: estado
    }
}

export function setNaturezaProcesso(estado){
    
    return{
        type:'SET_NATUREZA_PROCESSO',
        payload: estado
    }
}

export function openModal(){
    
    return{
        type:'OPEN_MODAL',
        payload: true
    }
}
export function closeModal(){
    
    return{
        type:'CLOSE_MODAL',
        payload: false
    }
}

export function habilitaNext(){
    
    return{
        type:'CLOSE_MODAL',
        payload: false
    }
}