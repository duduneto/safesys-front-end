const INITIAL_STATE={
    user: []
}
export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case 'SET_USER': return { user: action.payload }
    
        default: return state;
    }
}