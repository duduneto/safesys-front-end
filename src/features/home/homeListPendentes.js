import React, { Component } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import urls from '../../common/urls';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { atualizaProcessoPendente } from '../contratos/listContratos/listPendentes/helper/modalActions'

const { Column } = Table;

class HomeListPendentes extends Component {


    constructor(props){
        super(props);
        this.state = {contratos: []}
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

    render(){

        return(


            <Table dataSource={this.props.reduxContratosClone} scroll={{x : 650}} >
                    
                    <Column
                        title="Nome"
                        dataIndex="nome"
                        key="nome"
                    />
                    <Column
                        title="RG"
                        dataIndex="rg"
                        key="rg"
                    />
                    
                    <Column
                    title="CPF"
                    dataIndex="cpf"
                    key="cpf"
                    />
                    <Column
                    title="Nascimento"
                    dataIndex="data_nasc"
                    key="data_nasc"
                    />
                    <Column
                    title="Sexo"
                    dataIndex="sexo"
                    key="sexo"
                    />
                    
                </Table>

        )
    }

}

const mapStateToProps = state => ({reduxContratos: state.contratos.contratosPendentes, reduxContratosClone: state.contratos.contratosPendentesClone})
const mapDispatchToProps = dispatch => bindActionCreators({atualizaProcessoPendente}, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(HomeListPendentes)