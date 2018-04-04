import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export function contadorSobAnalise(){
    let countSobAnalise = 0;
    this.props.reduxContratosClone.forEach(element => {
        if(element.status == 'Processo Sob Analise'){
            
            let resultado =  countSobAnalise + 1;
            countSobAnalise = resultado;
            
        }
    });
    console.log(countSobAnalise)
    return countSobAnalise;
}

export function contadorEnviadoSeguradora(){
    let countSobAnalise = 0;
    this.props.reduxContratosClone.forEach(element => {
        if(element.status == 'Processo Enviado p/ Seguradora'){
            
            let resultado =  countSobAnalise + 1;
            countSobAnalise = resultado;
            
        }
    });
    console.log(countSobAnalise)
    return countSobAnalise;
}

export function contadorRetornouSeguradora(){
    let countSobAnalise = 0;
    this.props.reduxContratosClone.forEach(element => {
        if(element.status == 'Processo Retornou p/ Seguradora'){
            
            let resultado =  countSobAnalise + 1;
            countSobAnalise = resultado;
            
        }
    });
    console.log(countSobAnalise)
    return countSobAnalise;
}

export function contadorComRestricoes(){
    let countSobAnalise = 0;
    this.props.reduxContratosClone.forEach(element => {
        if(element.status == 'Processo com Restrições'){
            
            let resultado =  countSobAnalise + 1;
            countSobAnalise = resultado;
            
        }
    });
    console.log(countSobAnalise)
    return countSobAnalise;
}

export function contadorIndenizado(){
    let countSobAnalise = 0;
    this.props.reduxContratosClone.forEach(element => {
        if(element.status == 'Processo Indenizado'){
            
            let resultado =  countSobAnalise + 1;
            countSobAnalise = resultado;
            
        }
    });
    console.log(countSobAnalise)
    return countSobAnalise;
}

export function contadorNegadoCancelado(){
    let countSobAnalise = 0;
    this.props.reduxContratosClone.forEach(element => {
        if(element.status == 'Processo Negado/Cancelado'){
            
            let resultado =  countSobAnalise + 1;
            countSobAnalise = resultado;
            
        }
    });
    console.log(countSobAnalise)
    return countSobAnalise;
}

const mapStateToProps = state => ({reduxContratos: state.contratos.contratosPendentes, reduxContratosClone: state.contratos.contratosPendentesClone})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)