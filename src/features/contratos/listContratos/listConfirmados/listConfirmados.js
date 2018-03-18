import React, { Component } from 'react';
import { Table, Card, Dropdown, Button, Menu, Icon, Input, Form, Collapse, notification } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import axios from 'axios';
import urls from '../../../../common/urls';

// import Search from '../helper/search';


const { Column } = Table;
const Panel = Collapse.Panel;
const FormItem = Form.Item;


class ListConfirmados extends Component {

    
    constructor(props){
        super(props);
        this.state = {contratos: []}
        this.handleSubmit = this.handleSubmit.bind(this);
        
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

    handleSubmit = (e) => {
        const token = localStorage.getItem('token');
        e.preventDefault();
        const inputSearch = document.getElementById('inputSearchClient');
        
        console.log(typeof(inputSearch.value))
        axios.get(`${urls.API_URL}/contratos/?nome__regex=/${inputSearch.value}/gi`,{headers:{token:token}})
        .then(resp => {
            if(JSON.stringify(resp.data) == '[]'){
                
                notification.config({
                placement: 'bottomRight',
                bottom: 50,
                duration: 3,
              });
        
                notification.open({
                className:'NotificationFail',
                message: 'Ninguém foi Encontrado',
                duration: 2.25
            });
            }else{
                console.log(resp.data);
                resp.data.map( result => {
                if(!inputSearch.value == ''){
                    this.setState({contratos: [result]})
                }else{
                    if(result.confirm_processo === true){
                        this.setState({contratos: [...this.state.contratos, result]})
                    }
                    
                }
            })
            }
            
        })
        .catch(err => {
            console.log(err);
        })
    }

    render(){

        

        return(

            <Card>
                <Collapse>
                    <Panel header="Pesquisar" showArrow={false} >
                        <Form onSubmit={this.handleSubmit} >

                            <FormItem>
                                <Input id="inputSearchClient" type="text" placeholder="Nome do Cliente" />
                            </FormItem>

                            <FormItem>
                                <Row>
                                    <Col xs ><Button type="primary" htmlType="submit" >Pesquisar</Button></Col>
                                    <Col xs ><Button type="default" >Limpar</Button></Col>
                                    
                                </Row>
                            </FormItem>
                            
                        </Form>
                    </Panel>
                </Collapse>
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
                </Card>
        )
    }

}

export default ListConfirmados;
