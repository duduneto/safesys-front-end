import React, { Component } from 'react';
import { Table, Card, Dropdown, Button, Menu, Icon, Input, Form, Collapse, notification, Divider } from 'antd';
import MostraModal from '../helper/modal';
import { Row, Col } from 'react-flexbox-grid';
import axios from 'axios';
import urls from '../../../../common/urls';

// import Search from '../helper/search';


const { Column } = Table;
const Panel = Collapse.Panel;
const FormItem = Form.Item;


function test(id) {
    console.log(id)
}

class ListConfirmados extends Component {

    
    constructor(props){
        super(props);
        this.state = {contratos: [], contratosClonados: []}
        this.procuraCliente = this.procuraCliente.bind(this);
        this.limpaPesquisa = this.limpaPesquisa.bind(this);
                
    }

    

    componentDidMount(){
        const token = localStorage.getItem('token');
        axios.get(`${urls.API_URL}/contratos`,{headers:{token:token}})
      .then( resp => {
          // console.log(resp.data);
          resp.data.map( processo => {
              if(processo.confirm_processo === true){
                this.setState({
                    contratos: [...this.state.contratos, processo],
                    contratosClonados: [...this.state.contratosClonados, processo]
                })
                                
            }
        })
        }).catch(err => {
          console.log(err);
      });
    }

    procuraCliente = (e) => {
        e.preventDefault();
        let array = [];
        let searchInput = document.getElementById('inputSearchClient');
        console.log(searchInput.value);
        let expressaoRegular = new RegExp(searchInput.value, 'i');
        if(searchInput.value.length > 0){
            this.state.contratos.forEach(element => {
            
                if(expressaoRegular.test(element.nome)){
                    console.log(element)
                    array.push(element)
                    console.log(array);
                }
            });
            console.log(array)
            this.setState({contratos: undefined})
            this.setState({contratos: array})
            
        }else{
            // this.setState({contratos: undefined})
            this.setState({contratos: this.state.contratosClonados})
        }
        
    }

    limpaPesquisa(){
        this.setState({contratos: this.state.contratosClonados});
        document.getElementById('inputSearchClient').value = '';
    }

    render(){

        

        return(

            <Card>
                <Collapse>
                    <Panel header="Pesquisar" showArrow={false} >
                        <Form onSubmit={this.procuraCliente} >

                            <FormItem>
                                <Input id="inputSearchClient" type="text" placeholder="Nome do Cliente" />
                            </FormItem>

                            <FormItem>
                                <Row>
                                    <Col xs ><Button type="primary" htmlType="submit" >Pesquisar</Button></Col>
                                    <Col xs ><Button type="default" onClick={this.limpaPesquisa} >Limpar</Button></Col>
                                    
                                </Row>
                            </FormItem>
                            
                        </Form>
                    </Panel>
                </Collapse>
                <Table dataSource={this.state.contratos} scroll={{x : 650}} >
                        
                        <Column
                            title="Ação"
                            dataIndex="action"
                            key='action'
                            render={(text, record) => (
                                
                                <MostraModal value={record} title="Ação" />
                            )}
                            
                        />
                        <Column
                            title="Nome"
                            dataIndex="nome"
                            key='nome'
                            
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
