import React, { Component } from 'react';
import { Table, Card, Dropdown, Button, Icon, Input, Form, Collapse, notification, Select } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import axios from 'axios';
import urls from '../../../../common/urls';
import MostrarMais from './helper/mostrarMais';
import { getContratosPendentes, filtraProcesso, limpaPesquisaProcesso } from './actions/listPendentesActions';
import { atualizaProcessoPendente } from '../../../contratos/listContratos/listPendentes/helper/modalActions'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';




const { Column, ColumnGroup } = Table;
const Panel = Collapse.Panel;
const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;

class ListPendentes extends Component {

    
    constructor(props){
        super(props);
        this.limpaPesquisa = this.limpaPesquisa.bind(this);
        this.pesquisaCPF = this.pesquisaCPF.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state={ pesquisarPor: undefined, disableNome: true, disableCPF: true }
    }


    componentDidMount(){
        const token = localStorage.getItem('token');
        if(this.props.user.adm === false){
            axios.get(`${urls.API_URL}/contratos?responsavel_cpf=${this.props.user.cpf}&sort=nome`,{headers:{token:token}})
            .then(resp => {
                console.log(resp);
                
                this.props.atualizaProcessoPendente(resp.data);
            })
            .catch(err => {
                console.log(err)
            })
        }else{
            axios.get(`${urls.API_URL}/contratos?sort=nome`,{headers:{token:token}})
            .then(resp => {
                console.log(resp);
                
                this.props.atualizaProcessoPendente(resp.data);
            })
            .catch(err => {
                console.log(err)
            })
        }
        
        
    }

    enviaDados= (a) =>{
        console.log(a)
    }
    
    pesquisaCPF = () => {
        let cpf = document.getElementById('inputSearchCPF');

    }

    procuraCliente = (e) => {
        let arrayClone = this.props.reduxContratos
        e.preventDefault();
        // this.setState({contratos:undefined})
        let array = [];
        let searchInput = document.getElementById('inputSearchClient');
        console.log(searchInput.value);
        let expressaoRegular = new RegExp(searchInput.value, 'i');
        if(searchInput.value.length > 0){
            arrayClone.forEach(element => {
            
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
        document.getElementById('inputPesquisarCPF').value = '';
        document.getElementById('inputPesquisarNome').value = '';
        
        this.props.limpaPesquisaProcesso(this.props.reduxContratos);
        
    }

    handleChange(value){
        //    let arrayClone = this.props.reduxContratos
        //     console.log(`selected ${value}`);
        //     let array = [];
       
        //     if( value != 'todos'){
            
        //         arrayClone.forEach(element => {
        //             if(element.status === value){
        //                 console.log(element)
        //                 array.push(element);
        //             }
        //             console.log(element.status)
        //         });
        //         this.props.filtraProcesso(array);
        //     }
        if(value == 'Nome'){
            this.setState({disableNome: false, disableCPF: true});
        } if(value == 'CPF'){
            this.setState({disableCPF: false, disableNome: true});
        }
    }

    render(){

        

        return(
            <div>
            
                <Collapse>
                    <Panel header="Pesquisar" showArrow={false} >
                        <Select
                                id='pesquisarPor'
                                 style={{ width: 200 }}
                                placeholder="Pesquisar Por"
                                onChange={this.handleChange}
                                className='espacamento'
                            >
                                <Option value="Nome">Nome</Option>
                                <Option value="CPF">CPF</Option>
                            </Select>
                        {/* <Form onSubmit={this.procuraCliente} >
                            <Form.Item
                            label='Status do Processo'
                            >
                            <Select
                                id='selectFilter'
                                 style={{ width: 200 }}
                                placeholder="Todos Status"
                                onChange={this.handleChange}
                            >
                                <Option value="todos">Todos</Option>
                                <Option value="Processo Sob Analise">Processo Sob Analise</Option>
                                <Option value="Processo Enviado p/ Seguradora">Processo Enviado p/ Seguradora</Option>
                                <Option value="Processo Retornou p/ Seguradora">Processo Retornou p/ Seguradora</Option>
                                <Option value="Processo com Restrições">Processo com Restrições</Option>
                                <Option value="Processo Indenizado">Processo Indenizado</Option>
                                <Option value="Processo Negado/Cancelado">Processo Negado/Cancelado</Option>
                            </Select>
                            </Form.Item>

                            <FormItem label='Nome do Cliente' >
                                <Input id="inputSearchClient" type="text" placeholder="Nome do Cliente" />
                            </FormItem>

                            <FormItem>
                                <Row>
                                    <Col xs ><Button type="primary" htmlType="submit" >Pesquisar</Button></Col>
                                    <Col xs ><Button type="default" onClick={this.limpaPesquisa} >Limpar</Button></Col>
                                    
                                </Row>
                                
                                
                            </FormItem>
                            
                            
                        </Form> */}
                        
                        <Search
                        id='inputPesquisarNome'
                        
                        disabled={this.state.disableNome}
                        placeholder="Nome do Cliente"
                        onSearch={value => {
                            let arrayClone = this.props.reduxContratos
                            
                            // this.setState({contratos:undefined})
                            let array = [];
                            let expressaoRegular = new RegExp(value, 'i');
                            if(value.length > 0){
                                arrayClone.forEach(element => {
                                
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
                        }
                        enterButton
                        />
                        

                        <Search
                        id='inputPesquisarCPF'
                        
                        disabled={this.state.disableCPF}
                        placeholder="Digite o CPF"
                        onSearch={value => {
                            let arrayClone = this.props.reduxContratos
                            let array = [];
                            let expressaoRegular = new RegExp(value);
                            arrayClone.forEach( element => {
                                if(expressaoRegular.test(element.cpf)){
                                    
                                    array.push(element)
                                }
                            })
                            this.props.filtraProcesso(array);
                        }
                        }
                        enterButton
                        />
                        <Button type='default'  onClick={this.limpaPesquisa} >Restaurar</Button>
                    </Panel>
                </Collapse>
                <Table dataSource={this.props.reduxContratosClone} scroll={{x : 750}} >
                    
                    <Column
                            title=""
                            dataIndex="action"
                            key='action'
                            render={(text, record) => (
                                
                                <MostrarMais value={record} />
                            )}
                            
                        />
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
                </div>
            
        )
    }

}

const mapStateToProps = state => ({reduxContratos: state.contratos.contratosPendentes, 
    reduxContratosClone: state.contratos.contratosPendentesClone,
    user: state.user.user
})

const mapDispatchToProps = dispatch => bindActionCreators({getContratosPendentes, filtraProcesso, limpaPesquisaProcesso, atualizaProcessoPendente}, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(ListPendentes)