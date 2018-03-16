import React, { Component } from 'react';
import { Form, Icon, Input, Button, DatePicker, Radio } from 'antd';
import axios from 'axios';
import urls from '../../../common/urls';
import { formatDate } from './helper/dateHelper'
import { cadastroSuccess, cadastroFail } from './helper/notification';
// import { addToken } from './helper/addToken';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends Component {


    componentDidMount() {
      // To disabled submit button at the beginning.
      this.props.form.validateFields();
    }


    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {

            const token = localStorage.getItem('token');
            console.log(values.data_nasc._d);
            const data = formatDate(values.data_nasc._d);
            values.data_nasc = data;
            console.log(values);
            values.token = token;
            console.log(values);


            axios.post(`${urls.API_URL}/contratos`,values)
            .then(resp => {
                console.log(resp.status)
                if(resp.status === 201){
                    console.log("Cadastro Criado");
                    this.props.form.resetFields();
                    
                    cadastroSuccess();
                }
            })
            .catch( err => {
                console.log(err);
                cadastroFail();
            })
        
        
        }
      });
    }


    render() {

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    

        // Only show error after a field is touched.
        const nomeError = isFieldTouched('nome') && getFieldError('nome');
        const rgError = isFieldTouched('rg') && getFieldError('rg');
        const cpfError = isFieldTouched('cpf') && getFieldError('cpf');
        const config = {
            rules: [{ type: 'object', required: true, message: 'Selecione a Data' }],
        };
        const sexoError = isFieldTouched('sexo') && getFieldError('sexo');

      return (

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
                label="Ano de Nascimento"
                >
                {getFieldDecorator('data_nasc', config)(
                    <DatePicker format="DD-MM-YYYY" />
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
      );
    }
  }

  const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm);
  
  export default WrappedHorizontalLoginForm;