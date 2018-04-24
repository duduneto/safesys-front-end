export function setUsuarios(user){
    return{
        type:'SET_USUARIOS',
        payload: user
    }
}

export const filtraUsuarios = (array) => {
    return {
        type: 'FILTRA_PROCESSO_USUARIOS',
        payload: array
    }
}

export function limpaPesquisaUsuarios(estadoOriginal){
    return {
        type: 'LIMPA_PESQUISA_USUARIOS',
        payload: estadoOriginal
    }
}

export function setUsuarioMais(user){
    return {
        type: 'USUARIO_MAIS',
        payload: user
    }
}