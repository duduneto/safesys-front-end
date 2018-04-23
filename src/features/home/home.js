import React, { Component } from 'react';
import { Card, List } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUser } from '../login/actions/userActions'
import { setResponsaveis } from './actions/responsaveisActions'
import axios from 'axios';
import urls from '../../common/urls';

import HomeListPendentes from './homeListPendentes.js';
import HomeListConfirmados from './homeListConfirmados.js';

import { atualizaProcessoPendente } from '../contratos/listContratos/listPendentes/helper/modalActions'
class Home extends Component{
    
    constructor(props){
        super(props);
        
        this.state = { names : [], indenizados: null, processamento: null, negado: null }
        
        // this.tamanhoTela = this.tamanhoTela.bind(this);
    }
    
    // tamanhoTela(){
    //     return window.screen.height;
    // }

    
    componentDidMount(){
        let userEmail = localStorage.getItem('emailUser');
        const token = localStorage.getItem('token');
        axios.get(`${urls.OAPI_URL}/usuario?email=${userEmail}`)
        .then(resp => {
            console.log(resp.data[0].adm);
            if(resp.data[0].adm === true){
                axios.get(`${urls.API_URL}/contratos?sort=nome`,{headers:{token:token}})
                .then(resp => {
                    console.log(resp);
                    let arrayIndenizados = [];
                    let arrayProcessamento = [];
                    let arrayNegado = [];
                    resp.data.forEach(element => {
                        if( element.status == 'Processo Indenizado'){
                            arrayIndenizados.push('e');
                        } else if( element.status == 'Processo Negado' || element.status == 'Processo Cancelado' ){
                            arrayNegado.push('e');
                        } else {
                            arrayProcessamento.push('e');
                        }
                    })
                    this.setState({ indenizados: arrayIndenizados.length, processamento: arrayProcessamento.length, negado: arrayNegado.length })
                    this.props.atualizaProcessoPendente(resp.data);

                })
                .catch(err => {
                    console.log(err)
                })
            }else{
                axios.get(`${urls.API_URL}/contratos?responsavel_cpf=${resp.data[0].cpf}`,{headers:{token:token}})
                .then(resp => {
                    console.log(resp);
                    
                    this.props.atualizaProcessoPendente(resp.data);
                })
                .catch(err => {
                    console.log(err)
                })
            }
            
            this.props.setUser(resp.data[0]);

        })
        .catch(err => {
            console.log(err);
        })

        
        // axios.get(`${urls.API_URL}/contratos?sort=nome`,{headers:{token:token}})
        // .then(resp => {
        //     console.log(resp);
            
        //     this.props.atualizaProcessoPendente(resp.data);
        // })
        // .catch(err => {
        //     console.log(err)
        // })
        let arrayUsuarios = []
        axios.get(`${urls.OAPI_URL}/usuario`)
        .then( resp => {
            console.log(resp.data)
            resp.data.forEach(element => {
                if(element.cpf !== this.props.user.cpf ){
                    let e = {
                        nome: element.name,
                        cpf: element.cpf
                    }
                    arrayUsuarios.push(e);
                }
                

            });
            
            this.props.setResponsaveis(arrayUsuarios);
        })
        .catch( err => {

        })
    }
    
    render(){

        return(
            <div style={{ padding: 24, background: '#fff', minHeight: 890 }} >

                <h2 className="AlinhaOTexto" style={{ paddingBottom: 15 }} >Dados Gerais</h2>

                <List grid={{ gutter: 16, xs: 1, sm: 1, md: 3, lg: 3, xl: 3, xxl: 3 }} >
                
                    <List.Item >
                        <div className='cardHome' >
                            <div className='titleCard titleCheck'>
                                <p >Indenizados</p>
                            </div>
                            <div className='cardHomeBody' >
                                <Row>
                                    <Col>
                                        <div className='iconBox' >
                                            <svg className='svgIcon check' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" >
                                                <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z" />
                                            </svg>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='resultBox' >
                                            <p className='numberResult number-color-check' >{this.state.indenizados}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </List.Item>

                    <List.Item>
                        <div className='cardHome' >
                            <div className='titleCard titleClock'>
                                <p >Sob Análise</p>
                            </div>
                            <div className='cardHomeBody' >
                                <Row>
                                    <Col>
                                        <div className='iconBox' >
                                            <svg className='svgIcon clock' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z" />
                                            </svg>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='resultBox' >
                                            <p className='numberResult number-color-clock' >{this.state.processamento}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </List.Item>

                    <List.Item>
                        <div className='cardHome'>
                            <div className='titleCard titleTimes'>
                                <p >Negados/Cancelados</p>
                            </div>
                            <div className='cardHomeBody' >
                                <Row>
                                    <Col>
                                        <div className='iconBox' >
                                            <svg className='svgIcon times' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z" />
                                            </svg>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='resultBox' >
                                            <p className='numberResult number-color-times' >{this.state.negado}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </List.Item>
                </List>

                <HomeListPendentes />


                {/* <h3 className="AlinhaOTexto" >Confirmados</h3> */}
                {/* <HomeListConfirmados /> */}
            </div>
        )

    }

}


  const mapStateToProps = state => ({reduxContratos: state.contratos.contratosPendentes, 
    reduxContratosClone: state.contratos.contratosPendentesClone,
    user: state.user.user
})
  const mapDispatchToProps = dispatch => bindActionCreators({atualizaProcessoPendente, setUser, setResponsaveis}, dispatch)
  export default connect(mapStateToProps,mapDispatchToProps)(Home)