import React, { Component } from 'react';
import { Form, Icon, Input, Button, DatePicker, Radio, Select, List, Collapse, Card, Modal } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import HeaderPanel from './headerPanel';
import axios from 'axios';
import urls from '../../../../../common/urls';
import { formatDate } from '../../../novoContrato/helper/dateHelper'
import { editadoSuccess, cadastroFail } from '../../../novoContrato/helper/notification';
import { withRouter } from 'react-router-dom';
// import ModalExcluir from './modalExcluir';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { addToken } from './helper/addToken';

const confirm = Modal.confirm;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option
const Panel = Collapse.Panel;


function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class FormEdita extends Component {

    constructor(props){
        super(props);
    // this.formEdita = this.formEdita.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleExcluir = this.handleExcluir.bind(this);
    
    // this.onOk = this.onOk.bind(this);
    
    this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
    this.state= { cliente: []};
    }

    // formEdita =(a)=>{
    //     console.log(a)
    // }
    

    componentDidMount(){
      let cliente = localStorage.getItem('dadosCliente');
      let clienteObj = JSON.parse(cliente)
      console.log(clienteObj);
      this.setState({cliente: clienteObj});

      this.props.form.validateFields();
      
      
    }

    handleExcluir(){
       
        const token = localStorage.getItem('token');
        // e.preventDefault();
        console.log(this.props.dados._id)
        axios.delete(`${urls.API_URL}/contratos/${this.props.dados._id}`,{headers:{token:token}})
        .then(resp => {
        //   axios.get(`${urls.API_URL}/contratos?confirm_processo=false&sort=nome`,{headers:{token:token}})
        //     .then( resp => {
        //       this.props.atualizaProcessoPendente(resp.data);      
        //     })
        this.props.history.push('/contratos')
          
          
        })
        .catch(err => {
          console.log(err)
        })
        this.setState({
          visible: false,
        });
      }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            for( var propName in values){
                if(values[propName] === null || values[propName] === undefined ){
                    delete values[propName];
                }
            }
            console.log(values);
            let propsName = Object.getOwnPropertyNames(values);
            for (let index = 0; index < propsName.length; index++) {
                if(propsName[index] == 'data_nasc'){
                    const data_nasc = formatDate(values.data_nasc._d)
                    values.data_nasc = data_nasc;
                    
                } if(propsName[index] == 'data_sinistro'){
                    const data_sinistro = formatDate(values.data_sinistro._d)
                    values.data_sinistro = data_sinistro;
                    
                }
                
            }
            
              const token = localStorage.getItem('token');
            //   const dataNasc = formatDate(values.data_nasc._d);
            //   const dataSinistro = formatDate(values.data_sinistro._d)
            //   values.data_nasc = data;
            //   console.log(values);
              values.token = token;
            //   console.log(values);
            console.log(this.props.dados._id);
  
              axios.put(`${urls.API_URL}/contratos/${this.props.dados._id}`, values )
              .then(resp => {
                  console.log(resp.status)
                  if(resp.status === 200){
                      console.log("Cadastro Criado");
                      this.props.form.resetFields();
                      
                      localStorage.setItem('idEditado',true)
                      editadoSuccess();
                    this.props.history.push('/contratos')
                  }
              })
              .catch( err => {
                  console.log(err);
                  cadastroFail();
              })
          
          
          }
        });
      }

        showDeleteConfirm = (history, id) => {
            confirm({
              title: 'Tem Certeza que Deseja Deletar esse Processo?',
              
              okText: 'Sim',
              okType: 'danger',
              cancelText: 'Não',
              onOk() {
                const token = localStorage.getItem('token');
                axios.delete(`${urls.API_URL}/contratos/${id}`,{headers:{token:token}})
                    .then(resp => {
                        history.push('/contratos')
                    })
                    .catch( err => {
                        console.log(err)
                    })
                
              },
              onCancel() {
                console.log('Cancel');
              },
            });
          }
      
  

    render(){
                
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        const nomeError = isFieldTouched('nome') && getFieldError('nome');
        const rgError = isFieldTouched('rg') && getFieldError('rg');
        const cpfError = isFieldTouched('cpf') && getFieldError('cpf');
        const statusError = isFieldTouched('status') && getFieldError('status');
        const telError = isFieldTouched('tel') && getFieldError('tel');
        const config = {
            rules: [{ type: 'object', required: true, message: 'Selecione a Data' }],
        };
        const sexoError = isFieldTouched('sexo') && getFieldError('sexo');

      return (

        <div>
          {/* <Button type='default' onClick >Voltar</Button> */}
          <Card>
              <h2 className='AlinhaOTexto' >Editar Informações do Processo</h2>
              <Form onSubmit={this.handleSubmit}>

                <Collapse bordered={false} defaultActiveKey={['0']} >
                <Panel header={<HeaderPanel title='Processo:' content={this.props.dados.natureza_processo} />}  >
                    <FormItem
                        label="Natureza do Processo"
                        >
                        {getFieldDecorator('natureza_processo')(
                            <Select style={{ width: 120 }}>
                                <Option value="D.A.M.S">D.A.M.S</Option>
                                <Option value="Invalidez">Invalidez</Option>
                                <Option value="Morte">Morte</Option>
                            </Select>
                        )}
                        
                    </FormItem>
                </Panel>
                
                <Panel header={<HeaderPanel title='Nome:' content={this.props.dados.nome} />} >
                    <FormItem
                        
                        validateStatus={nomeError ? 'error' : ''}
                        help={nomeError || ''}>

                        {getFieldDecorator('nome')(
                        <Input placeholder="Nome Completo" />
                        )}

                    </FormItem>
                </Panel>

                <Panel header={<HeaderPanel title='RG:' content={this.props.dados.rg} />} >
                    <FormItem
                        validateStatus={rgError ? 'error' : ''}
                        help={rgError || ''}>
        
                        {getFieldDecorator('rg')(
                            <Input type="text" placeholder="RG" />
                        )}
                    </FormItem>
                </Panel>
                
                <Panel header={<HeaderPanel title='CPF:' content={this.props.dados.cpf} />} >
                    <FormItem
                        validateStatus={cpfError ? 'error' : ''}
                        help={cpfError || ''}>

                        {getFieldDecorator('cpf')(
                            <Input type="text" placeholder="CPF" />
                        )}
                    </FormItem>
                </Panel>

                <Panel header={<HeaderPanel title='Nasc:' content={this.props.dados.data_nasc} />} >
                    <FormItem
                        label="Data do Nascimento"
                        >
                        {getFieldDecorator('data_nasc')(
                            <DatePicker format="DD-MM-YYYY" />
                        )}
                    </FormItem>
                </Panel>

                <Panel header={<HeaderPanel title='Telefone:' content={this.props.dados.tel} />} >
                    <FormItem
                        label="Telefone"
                        >
                        {getFieldDecorator('tel')(
                            <Input style={{ width: '100%' }} />
                        )}
                    </FormItem>
                </Panel>

                <Panel header={<HeaderPanel title='Sinistro:' content={this.props.dados.data_sinistro} />} >
                    <FormItem
                        label="Data do Sinistro"
                        >
                        {getFieldDecorator('data_sinistro')(
                            <DatePicker format="DD-MM-YYYY" />
                        )}
                    </FormItem>
                </Panel>

                <Panel header={<HeaderPanel title='Status:' content={this.props.dados.status} />} >
                    <FormItem
                        label="Status"
                        hasFeedback
                        >
                        {getFieldDecorator('status')(
                            <Select placeholder="Selecione O Status" >
                                <Option value="Processo Sob Analise Corretor" >Processo Sob Análise Corretor</Option>
                                <Option value="Processo Sob Analise" >Processo Sob Análise</Option>
                                <Option value="Processo Enviado p/ Seguradora">Processo Enviado p/ Seguradora</Option>
                                <Option value="Processo Retornou p/ Seguradora">Processo Retornou p/ Seguradora</Option>
                                <Option value="Processo com Restrições">Processo com Restrições</Option>
                                <Option value="Processo Indenizado">Processo Indenizado</Option>
                                <Option value="Processo Negado">Processo Negado</Option>
                                <Option value="Processo Estornou Pgto">Processo Estornou Pgto</Option>
                                <Option value="Processo Cancelado">Processo Cancelado</Option>
                                <Option value="Processo Reaberto">Processo Reaberto</Option>
                                <Option value="Reanalise Mantida">Reanalise Mantida</Option>
                                <Option value="Processo Suspenso">Processo Suspenso</Option>
                                <Option value="Processo Transferido">Processo Transferido</Option>
                                <Option value="Processo Devolvido">Processo Devolvido</Option>
                                <Option value="Processo Emitido Pgto">Processo Emitido Pgto</Option>
                            </Select>
                        )}
                    </FormItem>
                </Panel>

                <Panel header={<HeaderPanel title='Sexo:' content={this.props.dados.sexo} />} >
                    <FormItem
                        label="Sexo"
                        >
                        {getFieldDecorator('sexo')(
                            <RadioGroup>
                                <Radio value="FEMININO">Feminino</Radio>
                                <Radio value="MASCULINO">Masculino</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                </Panel>

                <Panel header={<HeaderPanel title='Responsavel:' content={this.props.dados.responsavel_cpf} />} >
                    <FormItem
                        label="Responsavel pelo Processo"
                        >
                        {getFieldDecorator('responsavel_cpf')(
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Responsevel"
                                optionFilterProp="children"
                                onChange={this.handleResposavelSelected}
                                // onFocus={handleFocus}
                                // onBlur={handleBlur}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >   
                                <Option key={this.props.dados.cpf} value={this.props.dados.cpf} >Eu</Option>
                                {this.props.responsaveis.map( e => <Option value={e.cpf} key={`chave${e.cpf}`} >{e.nome}</Option>)}
                            </Select>
                        )}
                    </FormItem>
                </Panel>
                </Collapse>


                <FormItem>

                    <Row between='xs' >
                        <Col xs={2} >
                            {/* <Button type='danger' key="back" onClick={this.handleExcluir}>Excluir</Button> */}
                            
                            <Button onClick={() => this.showDeleteConfirm(this.props.history, this.props.dados._id)} type="danger" className='btnDelete' >
                            Delete 
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                type="primary"
                                htmlType="submit"
                                // disabled={}
                                >
                                Alterar
                            </Button>
                        </Col>
                    </Row>
                    
                </FormItem>

              </Form>
              
            </Card>
        </div>
      );
    }
  }
  

  const WrappedFormEdita = Form.create()(FormEdita);
  const WrappedFormEditaWithRouter = withRouter(WrappedFormEdita)
  
  const mapStateToProps = state => ({
    dados: state.dadosPerfilCliente.dadosPerfilCliente,
    responsaveis: state.responsaveis.responsaveis
})
  
  const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
  export default connect(mapStateToProps,mapDispatchToProps)(WrappedFormEditaWithRouter)

  