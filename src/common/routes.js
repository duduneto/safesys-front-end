import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Home from '../features/home';
import Test from '../features/test';
import NovoContrato from '../features/contratos/novoContrato';
import ListContratos from '../features/contratos/listContratos';
import FormEdita from '../features/contratos/listContratos/listPendentes/helper/formEdita';
import Cliente from '../features/cliente'
import Dependente from '../features/dependente'
import EditaDependente from '../features/dependente/editaDependente';
import CreateUser from '../features/user/createUser';
import Users from '../features/user/users';


export default props => (

    <div>
    
        <Route path='/home' component={Home} />
        <Route path='/test' component={Test} />
        <Route path='/novoContrato' component={NovoContrato} />
        <Route path='/contratos' component={ListContratos} />
        <Route path='/editaProcesso' component={FormEdita} />
        <Route path='/cliente' component={Cliente} />
        <Route path='/dependente' component={Dependente} />
        <Route path='/editaDependente' component={EditaDependente} />
        <Route path='/newUser' component={CreateUser} />
        <Route path='/users' component={Users} />
        <Redirect from='*' to='/home' />
    
    </div>

)