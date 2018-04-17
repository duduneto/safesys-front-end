import React, { Component } from 'react';
import { Progress, Card } from 'antd'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Card2 extends Component{

    constructor(props){
        super(props);
        this.percentAnaliseCorretor = this.percentSobAnalise.bind(this);
        this.percentSobAnalise = this.percentSobAnalise.bind(this);
        this.percentEnviadoSeguradora = this.percentEnviadoSeguradora.bind(this);
        this.percentRetornouSeguradora = this.percentRetornouSeguradora.bind(this);
        this.percentComRestricoes = this.percentComRestricoes.bind(this);
        this.percentIndenizado = this.percentIndenizado.bind(this);
        this.percentNegado = this.percentNegado.bind(this);
        this.percentEstornouPgto = this.percentEstornouPgto.bind(this);
        this.percentCancelado = this.percentCancelado.bind(this);
        this.percentReaberto = this.percentReaberto.bind(this);
        this.percentReanalise = this.percentReanalise.bind(this);
        this.percentSuspenso = this.percentSuspenso.bind(this);
        this.percentTransferido = this.percentTransferido.bind(this);
        this.percentDevolvido = this.percentDevolvido.bind(this);
        this.percentEmitidoPgto = this.percentEmitidoPgto.bind(this);
    }

    percentAnaliseCorretor(){
        
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Sob Analise Corretor'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        
        let percent = (counter/this.props.reduxContratosClone.length);
        
        return (percent*100).toFixed(2);
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
    
    percentNegado(){
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

    percentEstornouPgto(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Estornou Pgto'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        let percent = (counter/this.props.reduxContratosClone.length);
        return (percent*100).toFixed(2);
    }

    percentCancelado(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Cancelado'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        let percent = (counter/this.props.reduxContratosClone.length);
        return (percent*100).toFixed(2);
    }

    percentReaberto(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Reaberto'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        let percent = (counter/this.props.reduxContratosClone.length);
        return (percent*100).toFixed(2);
    }

    percentReanalise(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Reanalise Mantida'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        let percent = (counter/this.props.reduxContratosClone.length);
        return (percent*100).toFixed(2);
    }

    percentSuspenso(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Suspenso'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        let percent = (counter/this.props.reduxContratosClone.length);
        return (percent*100).toFixed(2);
    }

    percentTransferido(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Transferido'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        let percent = (counter/this.props.reduxContratosClone.length);
        return (percent*100).toFixed(2);
    }

    percentDevolvido(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Devolvido'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        let percent = (counter/this.props.reduxContratosClone.length);
        return (percent*100).toFixed(2);
    }

    percentEmitidoPgto(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Emitido Pgto'){
                
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
                <span>Analise Corretor</span><Progress percent={this.percentAnaliseCorretor()} className='percent'/>
                <span>Sob Analise</span><Progress percent={this.percentSobAnalise()} className='percent'/>
                <span>Enviado p/ Seguradora</span><Progress percent={this.percentEnviadoSeguradora()} className='percent' />
                <span>Retornou p/ Seguradora</span><Progress percent={this.percentRetornouSeguradora()} className='percent'/>
                <span>Com Restrições</span><Progress percent={this.percentComRestricoes()} className='percent'/>
                <span>Indenizado</span><Progress percent={this.percentIndenizado()} className='percent'/>
                <span>Negado</span><Progress percent={this.percentNegado()} className='percent'/>
                <span>Estornou Pgto</span><Progress percent={this.percentEstornouPgto()} className='percent'/>
                <span>Cancelado</span><Progress percent={this.percentCancelado()} className='percent'/>
                <span>Reaberto</span><Progress percent={this.percentReaberto()} className='percent'/>
                <span>Reanalise Mantida</span><Progress percent={this.percentReanalise()} className='percent'/>
                <span>Suspenso</span><Progress percent={this.percentSuspenso()} className='percent'/>
                <span>Transferido</span><Progress percent={this.percentTransferido()} className='percent'/>
                <span>Devolvido</span><Progress percent={this.percentDevolvido()} className='percent'/>
                <span>Emitido Pgto</span><Progress percent={this.percentEmitidoPgto()} className='percent'/>
                
            </div>
        )
    }
}

const mapStateToProps = state => ({reduxContratos: state.contratos.contratosPendentes, reduxContratosClone: state.contratos.contratosPendentesClone})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Card2)