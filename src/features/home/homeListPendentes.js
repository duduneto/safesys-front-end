import React, { Component } from 'react';
import { List, Card, Icon, Avatar } from 'antd';
import { Row, Col } from 'react-flexbox-grid'
import axios from 'axios';
import urls from '../../common/urls';

import Card2 from './cards/card2'
import Card1 from './cards/card1'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { atualizaProcessoPendente } from '../contratos/listContratos/listPendentes/helper/modalActions'

// const { Column } = Table;

const data = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
    {
      title: 'Title 5',
    }
    
  ];

  

class HomeListPendentes extends Component {


    constructor(props){
        super(props);
        this.state = { count: null }
        this.contador = this.contador.bind(this);
    }

    componentDidMount(){
        
        const token = localStorage.getItem('token');
        axios.get(`${urls.API_URL}/contratos?confirm_processo=false&sort=nome`,{headers:{token:token}})
        .then(resp => {
            console.log(resp);
            
            this.props.atualizaProcessoPendente(resp.data);
        })
        .catch(err => {
            console.log(err)
        })
       
    }

    contador(){

        let countSobAnalise = 0;
            this.props.reduxContratosClone.forEach(element => {
                if(element.status == 'Processo Sob Analise'){
                    
                    let resultado =  countSobAnalise + 1;
                    countSobAnalise = resultado;
                    
                }
            });
        console.log(countSobAnalise)
        return countSobAnalise;
        // this.setState({count :  countSobAnalise})
        

    }

    render(){
        
        
       this.contador();
        return(


            
                
                <div>
                    <Row>
                        <Col xs >
                            
                                <Card1/>
                            
                        </Col>
                        <Col xs >
                        </Col>
                        
                    </Row>
                        <Card2 />
                    
                
                </div>
                
            
            

            // <Table dataSource={this.props.reduxContratosClone} scroll={{x : 650}} >
                    
            //         <Column
            //             title="Nome"
            //             dataIndex="nome"
            //             key="nome"
            //         />
            //         <Column
            //             title="RG"
            //             dataIndex="rg"
            //             key="rg"
            //         />
                    
            //         <Column
            //         title="CPF"
            //         dataIndex="cpf"
            //         key="cpf"
            //         />
            //         <Column
            //         title="Nascimento"
            //         dataIndex="data_nasc"
            //         key="data_nasc"
            //         />
            //         <Column
            //         title="Sexo"
            //         dataIndex="sexo"
            //         key="sexo"
            //         />
                    
            //     </Table>

        )
    }

}

const mapStateToProps = state => ({reduxContratos: state.contratos.contratosPendentes, reduxContratosClone: state.contratos.contratosPendentesClone})
const mapDispatchToProps = dispatch => bindActionCreators({atualizaProcessoPendente}, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(HomeListPendentes)