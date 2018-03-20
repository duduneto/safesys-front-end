import { combineReducers } from 'redux';
// import { reducer as toastrReducer } from 'react-redux-toastr';

import AuthReducer from '../features/auth/authReducer';
import Contratos from '../features/contratos/reducer/reducer'

const rootReducer = combineReducers({
    // auth: AuthReducer,
    contratos: Contratos
});

export default rootReducer;