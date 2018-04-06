import React, { Component } from 'react';
import { Card, Table } from 'antd';
import { Row, Col } from 'react-flexbox-grid'
// import { setCountSobAnalise } from './helper/contadores'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';



class Card1 extends Component{

    constructor(props){
        super(props);
        this.contadorSobAnalise = this.contadorSobAnalise.bind(this);
        this.contadorEnviadoSeguradora = this.contadorEnviadoSeguradora.bind(this);
        this.contadorRetornouSeguradora = this.contadorRetornouSeguradora.bind(this);
        this.contadorComRestricoes = this.contadorComRestricoes.bind(this);
        this.contadorIndenizado = this.contadorIndenizado.bind(this);
        this.contadorNegadoCancelado = this.contadorNegadoCancelado.bind(this);
        

        this.state={
            data:[{status: 'Sob Analise', total: 5}]
            
        }
    }

    contadorSobAnalise(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Sob Analise'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        console.log(counter)
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
        console.log(counter)
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
        console.log(counter)
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
        console.log(counter)
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
        console.log(counter)
        return counter;
    }
    
    contadorNegadoCancelado(){
        let counter = 0;
        this.props.reduxContratosClone.forEach(element => {
            if(element.status == 'Processo Negado/Cancelado'){
                
                let resultado =  counter + 1;
                counter = resultado;
                
            }
        });
        console.log(counter)
        return counter;
    }
    

    
      
      
    render() {
        
        const data =[
            {status: 'Sob Analise', total:this.contadorSobAnalise()},
            {status: 'Enviado p/ Seguradora' ,total: this.contadorEnviadoSeguradora() },
            {status: 'Retornou da Seguradora' ,total: this.contadorRetornouSeguradora() },
            {status: 'Com Restrições' ,total: this.contadorComRestricoes() },
            {status: 'Indenizado' ,total: this.contadorIndenizado() },
            {status: 'Negado/Cancelado' ,total: this.contadorNegadoCancelado() }
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
                
                    {/* <Row>
                        <Col><strong className='itemCard1' >Sob Análise:</strong></Col><Col></Col><Col><strong className='resultadoItemCard1' > {this.contadorSobAnalise()} </strong></Col>
                    </Row>
                    <Row>
                        <Col><strong className='itemCard1' >Enviado p/ Seguradora:</strong></Col><Col></Col><Col><strong className='resultadoItemCard1' > {this.contadorEnviadoSeguradora()} </strong></Col>
                    </Row>
                    <Row>
                        <Col><strong className='itemCard1' >Retornou da Seguradora : </strong></Col><Col></Col><Col><strong className='resultadoItemCard1' > {this.contadorRetornouSeguradora()} </strong></Col>
                    </Row>
                    <Row>
                        <Col><strong className='itemCard1' >Com Restrições : </strong></Col><Col></Col><Col><strong className='resultadoItemCard1' > {this.contadorComRestricoes()} </strong></Col>
                    </Row>
                    <Row>
                        <Col><strong className='itemCard1' >Indenizado : </strong></Col><Col></Col><Col><strong className='resultadoItemCard1' > {this.contadorIndenizado()} </strong></Col>
                    </Row>
                    <Row>
                        <Col><strong className='itemCard1' >Negado/Cancelado : </strong></Col><Col></Col><Col><strong className='resultadoItemCard1' > {this.contadorNegadoCancelado()} </strong></Col>
                    </Row>
                    <Row>
                        <Col><strong className='itemCard1' >Total: </strong></Col><Col></Col><Col><strong className='resultadoItemCard6' > {this.props.reduxContratosClone.length} </strong></Col>
                    </Row> */}

                    <Table scroll={{x : 250}} columns={columns} dataSource={data} pagination={false} />

                    
                    
                                
            
            
            </div>
        )
    }
}

const mapStateToProps = state => ({reduxContratos: state.contratos.contratosPendentes, reduxContratosClone: state.contratos.contratosPendentesClone})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Card1)