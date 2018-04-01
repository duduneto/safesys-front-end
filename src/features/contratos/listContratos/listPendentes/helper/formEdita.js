import React, { Component } from 'react';
import { Form, Icon, Input, Button, DatePicker, Radio, Select, List, Collapse, Card } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import HeaderPanel from './headerPanel';
import axios from 'axios';
import urls from '../../../../../common/urls';
import { formatDate } from '../../../novoContrato/helper/dateHelper'
import { editadoSuccess, cadastroFail } from '../../../novoContrato/helper/notification';


// import { addToken } from './helper/addToken';


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
    this.formEdita = this.formEdita.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state= { cliente: [] };
    }

    formEdita =(a)=>{
        console.log(a)
    }

    componentDidMount(){
      let cliente = localStorage.getItem('dadosCliente');
      let clienteObj = JSON.parse(cliente)
      console.log(clienteObj);
      this.setState({cliente: clienteObj});

      this.props.form.validateFields();
      
      
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
            console.log(this.state.cliente._id);
  
              axios.put(`${urls.API_URL}/contratos/${this.state.cliente._id}`, values )
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
          <h1>{this.state.cliente.natureza_processo}</h1>
          <Card>
              <Form onSubmit={this.handleSubmit}>

                <Collapse bordered={false} >
                <Panel header={<HeaderPanel title='Processo:' content={this.state.cliente.natureza_processo} />} >
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
                
                <Panel header={<HeaderPanel title='Nome:' content={this.state.cliente.nome} />} >
                    <FormItem
                        
                        validateStatus={nomeError ? 'error' : ''}
                        help={nomeError || ''}>

                        {getFieldDecorator('nome')(
                        <Input placeholder="Nome Completo" />
                        )}

                    </FormItem>
                </Panel>

                <Panel header={<HeaderPanel title='RG:' content={this.state.cliente.rg} />} >
                    <FormItem
                        validateStatus={rgError ? 'error' : ''}
                        help={rgError || ''}>
        
                        {getFieldDecorator('rg')(
                            <Input type="text" placeholder="RG" />
                        )}
                    </FormItem>
                </Panel>
                
                <Panel header={<HeaderPanel title='CPF:' content={this.state.cliente.cpf} />} >
                    <FormItem
                        validateStatus={cpfError ? 'error' : ''}
                        help={cpfError || ''}>

                        {getFieldDecorator('cpf')(
                            <Input type="text" placeholder="CPF" />
                        )}
                    </FormItem>
                </Panel>

                <Panel header={<HeaderPanel title='Nasc:' content={this.state.cliente.data_nasc} />} >
                    <FormItem
                        label="Data do Nascimento"
                        >
                        {getFieldDecorator('data_nasc')(
                            <DatePicker format="DD-MM-YYYY" />
                        )}
                    </FormItem>
                </Panel>

                <Panel header={<HeaderPanel title='Telefone:' content={this.state.cliente.tel} />} >
                    <FormItem
                        label="Telefone"
                        >
                        {getFieldDecorator('tel')(
                            <Input style={{ width: '100%' }} />
                        )}
                    </FormItem>
                </Panel>

                <Panel header={<HeaderPanel title='Sinistro:' content={this.state.cliente.data_sinistro} />} >
                    <FormItem
                        label="Data do Sinistro"
                        >
                        {getFieldDecorator('data_sinistro')(
                            <DatePicker format="DD-MM-YYYY" />
                        )}
                    </FormItem>
                </Panel>

                <Panel header={<HeaderPanel title='Status:' content={this.state.cliente.status} />} >
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
                </Panel>

                <Panel header={<HeaderPanel title='Sexo:' content={this.state.cliente.sexo} />} >
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

                    <Button
                    type="primary"
                    htmlType="submit"
                    // disabled={}
                    >
                    Cadastrar
                    </Button>

                </FormItem>

              </Form>
            </Card>
          </div>
      );
    }
  }
  

  const WrappedFormEdita = Form.create()(FormEdita);
  
  export default WrappedFormEdita;