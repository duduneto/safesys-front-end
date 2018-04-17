import React, { Component } from 'react';
import Modal, { Form, Input, Button, DatePicker, Radio, Select, Card } from 'antd';
import { formatDate } from '../../contratos/novoContrato/helper/dateHelper'

import axios from 'axios';
import urls from '../../../common/urls';
import { atualizaDadosDependentePerfil } from '../../cliente/actions/btnDependenteAction';
import { closeModal } from '../../contratos/novoContrato/actions/stepsActions'

import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ModalAddDependente extends Component{

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
  
              const token = localStorage.getItem('token');
              console.log(values.data_nasc._d);
              const data = formatDate(values.data_nasc._d);
              values.data_nasc = data;
        //       console.log(values);
              
              values.segurado_nome = this.props.dadosCliente.nome;
              values.segurado_cpf = this.props.dadosCliente.cpf;
  
            
            axios.post(`${urls.API_URL}/dependentes`, values, {headers:{token:token}})
            .then( resp => {
                
                console.log(resp.data)
                this.props.atualizaDadosDependentePerfil(this.props.dados, resp.data);
                this.props.history.push('/dependente')
            })
            .catch( err => {
                console.log(err)
            });
                     
          
          }
        });
        this.props.closeModal();
      }

    render(){

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    

        // Only show error after a field is touched.
        const nomeError = isFieldTouched('nome') && getFieldError('nome');
        const rgError = isFieldTouched('rg') && getFieldError('rg');
        const cpfError = isFieldTouched('cpf') && getFieldError('cpf');
        const statusError = isFieldTouched('status') && getFieldError('status');
        const telError = isFieldTouched('tel') && getFieldError('tel');
        const config = {
            rules: [{ type: 'object', required: true, message: 'Selecione a Data' }],
        };
        const sexoError = isFieldTouched('sexo') && getFieldError('sexo');

        return(
            <div>
                <Form onSubmit={this.handleSubmit}>



                    <FormItem
                        validateStatus={nomeError ? 'error' : ''}
                        help={nomeError || ''}>

                        {getFieldDecorator('nome', {
                            rules: [{ required: true, message: 'Digite o Nome Completo' }],
                        })(
                            <Input placeholder="Nome Completo" />
                        )}

                    </FormItem>


                    <FormItem
                        validateStatus={rgError ? 'error' : ''}
                        help={rgError || ''}>

                        {getFieldDecorator('rg', {
                            rules: [{ required: true, message: 'RG Obrigatório' }],
                        })(
                            <Input type="text" placeholder="RG" />
                        )}

                    </FormItem>

                    <FormItem
                        validateStatus={cpfError ? 'error' : ''}
                        help={cpfError || ''}>

                        {getFieldDecorator('cpf', {
                            rules: [{ required: true, message: 'CPF Obrigatório' }],
                        })(
                            <Input type="text" placeholder="CPF" />
                        )}

                    </FormItem>


                    <FormItem
                        label="Data do Nascimento"
                    >
                        {getFieldDecorator('data_nasc', config)(
                            <DatePicker format="DD-MM-YYYY" />
                        )}
                    </FormItem>


                    <FormItem
                        label="Telefone"
                    >
                        {getFieldDecorator('tel', {
                            rules: [{ required: true, message: 'Insira o número do Telefone' }],
                        })(
                            <Input style={{ width: '100%' }} />
                        )}
                    </FormItem>


                    <FormItem

                        label="Tipo de Dependente"
                        hasFeedback
                    >
                        {getFieldDecorator('tipo_dependente', {
                            rules: [
                                { required: true, message: 'Selecione o tipo Dependente' },
                            ],
                        })(
                            <Select placeholder="Selecione uma Opção" >
                                <Option value="Companheiro(a)" >Companheiro(a)</Option>
                                <Option value="Conjuge" >Cônjuge</Option>
                                <Option value="Filho(a)">Filho(a)</Option>
                                <Option value="Genitor(a)">Genitor(a)</Option>
                                
                            </Select>
                        )}
                    </FormItem>


                    <FormItem
                        label="Sexo"
                    >
                        {getFieldDecorator('sexo', {
                            rules: [{ required: true, message: 'Escolha um sexo' }],
                        })(
                            <RadioGroup>
                                <Radio value="FEMININO">Feminino</Radio>
                                <Radio value="MASCULINO">Masculino</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>


                    <FormItem>

                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={hasErrors(getFieldsError())}

                        >
                            Cadastrar
                        </Button>

                        

                    </FormItem>


                </Form>
            </div>
        )
    }
}
const ModalAddDependenteForm = Form.create()(ModalAddDependente);
const ModalAddDependenteFormWithRouter = withRouter(ModalAddDependenteForm)

const mapStateToProps = state => ({
    
    dadosCliente : state.dadosPerfilCliente.dadosPerfilCliente,
    dados: state.dadosPerfilDependente.dadosPerfilDependente
  })
  
  const mapDispatchToProps = dispatch => bindActionCreators({closeModal, atualizaDadosDependentePerfil}, dispatch)
  export default connect(mapStateToProps,mapDispatchToProps)(ModalAddDependenteFormWithRouter)
 