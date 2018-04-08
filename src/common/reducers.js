import { combineReducers } from 'redux';


import AuthReducer from '../features/auth/authReducer';
import Contratos from '../features/contratos/reducer/reducer';
import SideMenu from '../components/reducers/sideMenu/reducer';
import Step from '../features/contratos/novoContrato/reducers/stepReducer';
import NovoContrato from '../features/contratos/novoContrato/reducers/novoContratoReducer';
import NaturezaProcesso from '../features/contratos/novoContrato/reducers/firstStepReducer';
import ModalDependente from '../features/contratos/novoContrato/reducers/modalDependenteReducer';
import DadosDependente from '../features/contratos/novoContrato/reducers/dadosDependentes';

const rootReducer = combineReducers({
    contratos: Contratos,
    sideMenu: SideMenu,
    step: Step,
    dadosNovoContrato: NovoContrato,
    naturezaProcesso: NaturezaProcesso,
    modalDependente: ModalDependente,
    dadosDependente: DadosDependente
});

export default rootReducer;