import { combineReducers } from 'redux';
// import { reducer as toastrReducer } from 'react-redux-toastr';

import AuthReducer from '../features/auth/authReducer';

const rootReducer = combineReducers({
    home: () => ({summary: {value:50}}),
    auth: AuthReducer
});

export default rootReducer;