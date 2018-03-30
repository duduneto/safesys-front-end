import React, { Component } from 'react';
import { Table, Card, Dropdown, Button, Menu, Icon, Input, Form, Collapse, notification, Divider } from 'antd';
import MostraModalConfirmados from './helper/modal';
import { Row, Col } from 'react-flexbox-grid';
import axios from 'axios';
import urls from '../../../../common/urls';

import { getContratosConfirmados, filtraProcesso, limpaPesquisaProcesso } from './actions/listConfirmadosActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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

    

    // componentDidMount(){
    //     this.props.getContratosConfirmados();
    // }

    procuraCliente = (e) => {
        e.preventDefault();
        // this.setState({contratos:undefined})
        let array = [];
        let searchInput = document.getElementById('inputSearchClient');
        console.log(searchInput.value);
        let expressaoRegular = new RegExp(searchInput.value, 'i');
        if(searchInput.value.length > 0){
            this.props.reduxContratosClone.forEach(element => {
            
                if(expressaoRegular.test(element.nome)){
                    console.log(element)
                    array.push(element)
                }
            });
            console.log(array)
            this.props.filtraProcesso(array);
            
            
        }else{
            this.props.limpaPesquisaProcesso(this.props.reduxContratos);
        }
        
    }

    limpaPesquisa(){
        document.getElementById('inputSearchClient').value = '';
        this.props.limpaPesquisaProcesso(this.props.reduxContratos);
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
                <Table dataSource={this.props.reduxContratosClone} scroll={{x : 650}} >
                        
                        <Column
                            title="Ação"
                            dataIndex="action"
                            key='action'
                            render={(text, record) => (
                                
                                <MostraModalConfirmados value={record} title="Ação" />
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


const mapStateToProps = state => ({reduxContratos: state.contratos.contratosConfirmados, reduxContratosClone: state.contratos.contratosConfirmadosClone})

const mapDispatchToProps = dispatch => bindActionCreators({getContratosConfirmados, filtraProcesso, limpaPesquisaProcesso}, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(ListConfirmados)