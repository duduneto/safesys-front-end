import React, { Component } from 'react';
import { Card } from 'antd';
import { Row, Col } from 'react-flexbox-grid'
// import { contadorSobAnalise, contadorEnviadoSeguradora, contadorRetornouSeguradora, contadorComRestricoes, contadorIndenizado, contadorNegadoCancelado } from './helper/contadores'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';



class Card1 extends Component{

    constructor(props){
        super(props);
        this.contadorSobAnalise = this.contadorSobAnalise.bind(this);
        this.contadorEnviadoSeguradora = this.contadorSobAnalise.bind(this);
        this.contadorRetornouSeguradora = this.contadorRetornouSeguradora.bind(this);
        this.contadorComRestricoes = this.contadorComRestricoes.bind(this);
        this.contadorIndenizado = this.contadorIndenizado.bind(this);
        this.contadorNegadoCancelado = this.contadorNegadoCancelado.bind(this);
    }

    contadorSobAnalise(){
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

    contadorEnviadoSeguradora(){
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

    contadorRetornouSeguradora(){
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
    
    contadorComRestricoes(){
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
    
    contadorIndenizado(){
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
    
    contadorNegadoCancelado(){
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
    

    render() {
        console.log(this.props.reduxContratosClone)
        return(
            <div>
                 
                    <Row>
                        <Col><strong className='itemCard1' >Sob Análise :</strong></Col><Col></Col><Col><strong className='resultadoItemCard1' > {this.contadorSobAnalise()} </strong></Col>
                    </Row>
                    <Row>
                        <Col><strong className='itemCard1' >Enviado p/ Seguradora</strong></Col><Col></Col><Col><strong className='resultadoItemCard1' > {this.contadorEnviadoSeguradora()} </strong></Col>
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
                    </Row>

                    
                    
                                
                
            </div>
        )
    }
}

const mapStateToProps = state => ({reduxContratos: state.contratos.contratosPendentes, reduxContratosClone: state.contratos.contratosPendentesClone})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Card1)