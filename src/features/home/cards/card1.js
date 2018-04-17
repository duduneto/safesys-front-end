import React, { Component } from 'react';
import { Card, Table } from 'antd';
import { Row, Col } from 'react-flexbox-grid'
// import { setCountSobAnalise } from './helper/contadores'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';



class Card1 extends Component{

    constructor(props){
        super(props);
        this.contadorSobAnaliseCorretor = this.contadorSobAnaliseCorretor.bind(this);
        this.contadorSobAnalise = this.contadorSobAnalise.bind(this);
        this.contadorEnviadoSeguradora = this.contadorEnviadoSeguradora.bind(this);
        this.contadorRetornouSeguradora = this.contadorRetornouSeguradora.bind(this);
        this.contadorComRestricoes = this.contadorComRestricoes.bind(this);
        this.contadorIndenizado = this.contadorIndenizado.bind(this);
        this.contadorNegado = this.contadorNegado.bind(this);
        this.contadorEstornouPgto = this.contadorEstornouPgto.bind(this);
        this.contadorCancelado = this.contadorCancelado.bind(this);
        this.contadorReaberto = this.contadorReaberto.bind(this);
        this.contadorReanalise = this.contadorReanalise.bind(this);
        this.contadorSuspenso = this.contadorSuspenso.bind(this);
        this.contadorTransferido = this.contadorTransferido.bind(this);
        this.contadorDevolvido = this.contadorDevolvido.bind(this);
        this.contadorEmitidoPgto = this.contadorEmitidoPgto.bind(this);
        
        

        this.state={
            data:[{status: 'Sob Analise', total: 5}]
            
        }
    }

    contadorSobAnaliseCorretor(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Sob Analise Corretor'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        // console.log(this.state.data)
        return counter;
    }

    contadorSobAnalise(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Sob Analise'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        // console.log(this.state.data)
        return counter;
    }

    contadorEnviadoSeguradora(){
        let counter = 0;
        this.props.reduxContratos.forEach(element => {
            if(element.status == 'Processo Enviado p/ Seguradora'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        return counter;
    }

    contadorRetornouSeguradora(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Retornou p/ Seguradora'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        return counter;
    }
    
    contadorComRestricoes(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo com Restrições'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        return counter;
    }
    
    contadorIndenizado(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Indenizado'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        return counter;
    }
    
    contadorNegado(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Negado'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        return counter;
    }

    contadorEstornouPgto(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Estornou Pgto'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        return counter;
    }
    contadorCancelado(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Cancelado'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        return counter;
    }
    contadorReaberto(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Reaberto'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        return counter;
    }
    contadorReanalise(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Reanalise Mantida'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        return counter;
    }
    contadorSuspenso(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Suspenso'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        return counter;
    }
    contadorTransferido(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Transferido'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        return counter;
    }
    contadorDevolvido(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Devolvido'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        return counter;
    }
    contadorEmitidoPgto(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Emitido Pgto'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        
        return counter;
    }
    
      
      
    render() {
        
        const data =[
            {status: 'Analise Corretor' ,total: this.contadorSobAnaliseCorretor() },
            {status: 'Sob Analise', total:this.contadorSobAnalise()},
            {status: 'Enviado p/ Seguradora' ,total: this.contadorEnviadoSeguradora() },
            {status: 'Retornou da Seguradora' ,total: this.contadorRetornouSeguradora() },
            {status: 'Com Restrições' ,total: this.contadorComRestricoes() },
            {status: 'Indenizado' ,total: this.contadorIndenizado() },
            {status: 'Negado' ,total: this.contadorNegado() },
            {status: 'Estornou Pgto' ,total: this.contadorEstornouPgto() },
            {status: 'Cancelado' ,total: this.contadorCancelado() },
            {status: 'Reaberto' ,total: this.contadorReaberto() },
            {status: 'Reanalise Mantida' ,total: this.contadorReanalise() },
            {status: 'Suspenso' ,total: this.contadorSuspenso() },
            {status: 'Transferido' ,total: this.contadorTransferido() },
            {status: 'Devolvido' ,total: this.contadorDevolvido() },
            {status: 'Emitido Pgto' ,total: this.contadorEmitidoPgto() }
        ]
        
          const columns = [{
            title: 'Status',
            dataIndex: 'status',
            key: 'status'
          }, {
            title: 'Total',
            dataIndex: 'total',
            key: 'toal',
          }]

          console.log(this.state.countA)
        return(
            <div className='card' >
                

                    <Table scroll={{x : 250}} columns={columns} dataSource={data} pagination={false} />

                    
                    
                                
            
            
            </div>
        )
    }
}

const mapStateToProps = state => ({reduxContratos: state.contratos.contratosPendentes, reduxContratosClone: state.contratos.contratosPendentesClone})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Card1)