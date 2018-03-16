import React, { Component } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import urls from '../../common/urls';


const { Column } = Table;

class HomeListPendentes extends Component {


    constructor(props){
        super(props);
        this.state = {contratos: []}
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        axios.get(`${urls.API_URL}/contratos`,{headers:{token:token}})
      .then( resp => {
          // console.log(resp.data);
          resp.data.map( processo => {
              if(processo.confirm_processo === false){
                this.setState({
                    contratos: [...this.state.contratos, processo]
                })              
            }
        })
        }).catch(err => {
          console.log(err);
      });
    }

    render(){

        return(


            <Table dataSource={this.state.contratos} scroll={{x : 650}} >
                    
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

export default HomeListPendentes;