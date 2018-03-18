import { combineReducers } from 'redux';
// import { reducer as toastrReducer } from 'react-redux-toastr';

import AuthReducer from '../features/auth/authReducer';
import ContratosPendentes from '../features/contratos/listContratos/listPendentes/reducer'

const rootReducer = combineReducers({
    home: () => ({summary: {value:50}}),
    auth: AuthReducer,
    contratosPendentes: ContratosPendentes
});

export default rootReducer;