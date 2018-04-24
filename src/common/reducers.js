import { combineReducers } from 'redux';


import AuthReducer from '../features/auth/authReducer';
import Contratos from '../features/contratos/reducer/reducer';
import SideMenu from '../components/reducers/sideMenu/reducer';
import Step from '../features/contratos/novoContrato/reducers/stepReducer';
import NovoContrato from '../features/contratos/novoContrato/reducers/novoContratoReducer';
import NaturezaProcesso from '../features/contratos/novoContrato/reducers/firstStepReducer';
import ModalDependente from '../features/contratos/novoContrato/reducers/modalDependenteReducer';
import DadosDependente from '../features/contratos/novoContrato/reducers/dadosDependentes';
import DadosPerfilCliente from '../features/cliente/reducers/reducer';
import DadosPerfilDependente from '../features/dependente/reducers/reducer';
import User from '../features/login/reducer/reducer';
import Responsaveis from '../features/home/reducer/reducer';
import Usuarios from '../features/user/reducers/reducer';

const rootReducer = combineReducers({
    user: User,
    contratos: Contratos,
    sideMenu: SideMenu,
    step: Step,
    dadosNovoContrato: NovoContrato,
    naturezaProcesso: NaturezaProcesso,
    modalDependente: ModalDependente,
    dadosDependente: DadosDependente,
    dadosPerfilCliente: DadosPerfilCliente,
    dadosPerfilDependente: DadosPerfilDependente,
    responsaveis: Responsaveis,
    usuarios : Usuarios
});

export default rootReducer;