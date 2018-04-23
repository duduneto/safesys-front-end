import React, { Component } from 'react';
import { Button, Steps, message } from 'antd';

import { abreFechaMenu } from '../../../components/actions/sideMenuActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import axios from 'axios';
import urls from '../../../common/urls';

import WrappedHorizontalLoginForm from './novoContratoForm'
import FirstStep from './firstStep';
import ThirdStep from './thirdStep/thirdStep'
import { atualizaCurrent, habilitaNext } from './actions/stepsActions'
import { apagaDependentes } from './actions/actionNovoContrato'

const steps = [{
    title: 'Primeiro',
    content: <FirstStep/>,
  }, {
    title: 'Segundo',
    content: <WrappedHorizontalLoginForm/>,
  }, {
    title: 'Terceiro',
    content: <ThirdStep/>,
  }];

  const Step = Steps.Step;

class NovoContratoSteps extends Component{

    constructor(props){
        super(props);
        // this.state={ buttonNext: false }
        this.doneClick = this.doneClick.bind(this);
    }

    handleClick(){
        this.props.abreFechaMenu(false);
    }

    next() {
        const current = this.props.numberPage + 1;
        this.props.atualizaCurrent(current)
    }
    prev() {
        const current = this.props.numberPage - 1;
        this.props.atualizaCurrent(current);
    }
    doneClick(){
    
        let token = localStorage.getItem('token');
        let contrato = this.props.dadosNovoContrato
        contrato.token = token;
        contrato.natureza_processo = this.props.naturezaProcesso;

        let dependentes = this.props.dependentes
        contrato.numero_de_dependente = dependentes.length;
        
        axios.post(`${urls.API_URL}/contratos`,contrato)
            .then(resp => {
                console.log(resp.status)
                if(resp.status === 201){
                                                            
                    message.success('Cadastro Completo')
                }
            })
            .catch( err => {
                console.log(err);
                message.error('Cadastro Falhou')
            });
        dependentes.forEach(element => {
            axios.post(`${urls.API_URL}/dependentes`, element)
            .then( resp => {
                console.log(resp.status)
                if(resp.status === 201){
                    message.success('Cadastro de Dependentes Concluido')
                }
            }).catch (err => {
                console.log(err)
            });
        });
        
        this.props.apagaDependentes();
        this.props.atualizaCurrent(0);

    }
    
    componentDidMount(){
        
    }

    render(){
        
        // const { current } = this.props.current;
        return(
            <div>
                <Steps current={this.props.numberPage}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div className="steps-content">{steps[this.props.numberPage].content}</div>
                <div className="steps-action espacamento">
                    {
                        this.props.numberPage == 0
                        &&
                        <Button type="primary" onClick={() => this.next()} >Próximo</Button>
                    }
                    {
                        this.props.numberPage === steps.length - 1
                        &&
                        <Button type="primary" onClick={() => {this.doneClick()}}>Finalizar</Button>
                    }
                    {
                        this.props.numberPage == 2
                        &&
                        <Button style={{ marginLeft: 8 }} onClick={() => {this.prev(); this.props.apagaDependentes();}} >
                            Previous
                        </Button>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    numberPage: state.step.numberPage,
    disableNext: state.step.disableNext,
    dadosNovoContrato: state.dadosNovoContrato.dadosNovoContrato,
    dependentes: state.dadosDependente.dependentes,
    naturezaProcesso: state.naturezaProcesso.naturezaProcesso
})
  
  const mapDispatchToProps = dispatch => bindActionCreators({atualizaCurrent,habilitaNext, apagaDependentes}, dispatch)
  export default connect(mapStateToProps,mapDispatchToProps)(NovoContratoSteps)