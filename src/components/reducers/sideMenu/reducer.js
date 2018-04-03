const INITIAL_STATE={
    collapse:undefined
}
export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case 'ABRE_FECHA_MENU_LATERAL': return { collapse: action.payload }
    
        default: return state;
    }
}