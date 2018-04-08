import React, { Component } from 'react';
import { Progress, Card } from 'antd'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Card2 extends Component{

    constructor(props){
        super(props);
        this.percentSobAnalise = this.percentSobAnalise.bind(this);
        this.percentEnviadoSeguradora = this.percentEnviadoSeguradora.bind(this);
        this.percentRetornouSeguradora = this.percentRetornouSeguradora.bind(this);
        this.percentComRestricoes = this.percentComRestricoes.bind(this);
        this.percentIndenizado = this.percentIndenizado.bind(this);
        this.percentNegadoCancelado = this.percentNegadoCancelado.bind(this);
    }

    percentSobAnalise(){
        
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Sob Analise'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        
        let percent = (counter/this.props.reduxContratosClone.length);
        
        return (percent*100).toFixed(2);
    }

    percentEnviadoSeguradora(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Enviado p/ Seguradora'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        let percent = (counter/this.props.reduxContratosClone.length);
        return (percent*100).toFixed(2);
    }

    percentRetornouSeguradora(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Retornou p/ Seguradora'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        let percent = (counter/this.props.reduxContratosClone.length);
        return (percent*100).toFixed(2);
    }
    
    percentComRestricoes(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo com Restrições'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        let percent = (counter/this.props.reduxContratosClone.length);
        return (percent*100).toFixed(2);
    }
    
    percentIndenizado(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Indenizado'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        let percent = (counter/this.props.reduxContratosClone.length);
        return (percent*100).toFixed(2);
    }
    
    percentNegadoCancelado(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Negado/Cancelado'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        let percent = (counter/this.props.reduxContratosClone.length);
        return (percent*100).toFixed(2);
    }

    render() {
        return(
            
            <div className='card' >
                
                <span>Sob Analise</span><Progress percent={this.percentSobAnalise()} className='percent'/>
                <span>Enviado p/ Seguradora</span><Progress percent={this.percentEnviadoSeguradora()} className='percent' />
                <span>Retornou p/ Seguradora</span><Progress percent={this.percentRetornouSeguradora()} className='percent'/>
                <span>Com Restrições</span><Progress percent={this.percentComRestricoes()} className='percent'/>
                <span>Indenizado</span><Progress percent={this.percentIndenizado()} className='percent'/>
                <span>Negado/Cancelado</span><Progress percent={this.percentNegadoCancelado()} className='percent'/>
                 
                
                
            </div>
        )
    }
}

const mapStateToProps = state => ({reduxContratos: state.contratos.contratosPendentes, reduxContratosClone: state.contratos.contratosPendentesClone})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Card2)