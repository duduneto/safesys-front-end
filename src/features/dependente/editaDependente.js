import React, { Component } from 'react';
import { Form, Icon, Input, Button, DatePicker, Radio, Select, List, Collapse, Card, Modal } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import HeaderPanel from '../contratos/listContratos/listPendentes/helper/headerPanel';
import axios from 'axios';
import urls from '../../common/urls';
import { formatDate } from '../contratos/novoContrato/helper/dateHelper'
import { editadoSuccess, cadastroFail } from '../contratos/novoContrato/helper/notification';
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

class FormEditaDependente extends Component {

    constructor(props){
        super(props);
    // this.formEditaDependente = this.formEditaDependente.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleExcluir = this.handleExcluir.bind(this);
    
    // this.onOk = this.onOk.bind(this);
    
    this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
    this.state= { cliente: []};
    }

    // formEditaDependente =(a)=>{
    //     console.log(a)
    // }
    

    componentDidMount(){
            
      
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
  
              axios.put(`${urls.API_URL}/dependentes/${this.props.dados._id}`, values )
              .then(resp => {
                  console.log(resp.status)
                  if(resp.status === 200){
                      console.log("Cadastro Criado");
                      this.props.form.resetFields();
                      
                      
                      editadoSuccess();
                    this.props.history.push('/cliente')
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
                axios.delete(`${urls.API_URL}/dependentes/${id}`,{headers:{token:token}})
                    .then(resp => {
                        history.push('/cliente')
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
          {/* <Button type='default' >Voltar</Button>
          <Button type='default' >Add Dependente</Button> */}
          <Card>
              <h2 className='AlinhaOTexto' >Editar Informações do Processo</h2>
              <Form onSubmit={this.handleSubmit}>

                <Collapse bordered={false} defaultActiveKey={['0']} >
                {/* <Panel header={<HeaderPanel title='Processo:' content={this.props.dados.natureza_processo} />}  >
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
                </Panel> */}
                
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

                {/* <Panel header={<HeaderPanel title='Sinistro:' content={this.props.dados.data_sinistro} />} >
                    <FormItem
                        label="Data do Sinistro"
                        >
                        {getFieldDecorator('data_sinistro')(
                            <DatePicker format="DD-MM-YYYY" />
                        )}
                    </FormItem>
                </Panel> */}

                {/* <Panel header={<HeaderPanel title='Status:' content={this.props.dados.status} />} >
                    <FormItem
                        label="Status"
                        hasFeedback
                        >
                        {getFieldDecorator('status')(
                            <Select placeholder="Selecione O Status" >
                                <Option value="Processo Sob Analise" >Processo Sob Análise</Option>
                                <Option value="Processo Enviado p/ Seguradora">Processo Enviado p/ Seguradora</Option>
                                <Option value="Processo Retornou p/ Seguradora">Processo Retornou p/ Seguradora</Option>
                                <Option value="Processo com Restrições">Processo com Restrições</Option>
                                <Option value="Processo Indenizado">Processo Indenizado</Option>
                                <Option value="Processo Negado/Cancelado">Processo Negado/Cancelado</Option>
                            </Select>
                        )}
                    </FormItem>
                </Panel> */}


                <Panel header={<HeaderPanel title='Tipo de Dependente:' content={this.props.dados.tipo_dependente} />} >
                    <FormItem

                        label="Tipo de Dependente"
                        hasFeedback
                        >
                        {getFieldDecorator('tipo_dependente')(
                            <Select placeholder="Selecione uma Opção" >
                                <Option value="Companheiro(a)" >Companheiro(a)</Option>
                                <Option value="Conjuge" >Cônjuge</Option>
                                <Option value="Filho(a)">Filho(a)</Option>
                                <Option value="Genitor(a)">Genitor(a)</Option>
                                
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
  

  const WrappedFormEditaDependente = Form.create()(FormEditaDependente);
  const WrappedFormEditaDependenteWithRouter = withRouter(WrappedFormEditaDependente)
  
  const mapStateToProps = state => ({
    
    dados: state.dadosPerfilDependente.dadosPerfilDependenteEditar
})
  
  const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
  export default connect(mapStateToProps,mapDispatchToProps)(WrappedFormEditaDependenteWithRouter)
