import { combineReducers } from 'redux';
// import { reducer as toastrReducer } from 'react-redux-toastr';

import AuthReducer from '../features/auth/authReducer';
import Contratos from '../features/contratos/reducer/reducer'
import SideMenu from '../components/reducers/sideMenu/reducer'

const rootReducer = combineReducers({
    // auth: AuthReducer,
    contratos: Contratos,
    sideMenu: SideMenu 
});

export default rootReducer;