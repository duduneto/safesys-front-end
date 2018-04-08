const INITIAL_STATE={
    visible:false
}


export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        
        case 'OPEN_MODAL': return { visible: action.payload }
        case 'CLOSE_MODAL': return { visible: action.payload }
       
        default: return state;
    }
}