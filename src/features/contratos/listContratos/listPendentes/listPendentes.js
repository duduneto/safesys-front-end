import React, { Component } from 'react';
import { Table, Card, Dropdown, Button, Icon, Input, Form, Collapse, notification } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import axios from 'axios';
import urls from '../../../../common/urls';
import MostraModal from '../helper/modal';
import { getContratos } from './actions/listPendentesActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import Search from '../helper/search';


const { Column, ColumnGroup } = Table;
const Panel = Collapse.Panel;
const FormItem = Form.Item;


class ListPendentes extends Component {

    
    constructor(props){
        super(props);
        this.state = {contratos: [], contratosClonados: []}
        
        this.limpaPesquisa = this.limpaPesquisa.bind(this);
        
        
    }


    componentDidMount(){
        const token = localStorage.getItem('token');
        axios.get(`${urls.API_URL}/contratos`,{headers:{token:token}})
      .then( resp => {
          // console.log(resp.data);
          resp.data.map( processo => {
              if(processo.confirm_processo === false){
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
        // this.setState({contratos:undefined})
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
                <Table dataSource={this.state.contratos} scroll={{x : 700}} >
                    
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

function mapStateToProps(state){
    return{
        reduxContratos: state.contratos
    }
}
function mapDispatchToProps(dispatch){bindActionCreators({getContratos}, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ListPendentes)