import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Home from '../features/home';
import Test from '../features/test';
import NovoContrato from '../features/contratos/novoContrato';
import ListContratos from '../features/contratos/listContratos';

export default props => (

    <div>
    
        <Route path='/home' component={Home} />
        <Route path='/test' component={Test} />
        <Route path='/novoContrato' component={NovoContrato} />
        <Route path='/contratos' component={ListContratos} />
        <Redirect from='*' to='/home' />
    
    </div>

)