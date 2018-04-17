import React, { Component } from 'react';
import { Form, Icon, Input, Button, DatePicker, Radio, Select, Card, Switch, Checkbox } from 'antd';
import axios from 'axios';
import urls from '../../common/urls';
import { formatDate } from '../contratos/novoContrato/helper/dateHelper'
import { cadastroSuccess, cadastroFail } from '../contratos/novoContrato/helper/notification';
// import { addToken } from './helper/addToken';

// import { setDadosCadastro } from './actions/actionNovoContrato';
// import { atualizaCurrent } from './actions/stepsActions'



const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class CreateUser extends Component {

    constructor(props){
        super(props);
        this.state = { disableCheckBoxAdm: true, adm: false}
        this.onChange = this.onChange.bind(this);
        this.onChecked = this.onChecked.bind(this);
    }

    onChange(checked){
        console.log(`switch to ${checked}`);
        this.setState({disableCheckBoxAdm:!this.state.disableCheckBoxAdm})
        if( checked === false ){
            this.setState({adm:false})
        }
    }

    onChecked(){
        this.setState({adm: true});
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
            
            const data = formatDate(values.data_nasc._d);
            values.data_nasc = data;
            values.adm = this.state.adm;
            
            // values.token = token;
            console.log(values.adm);

            axios.post(`${urls.OAPI_URL}/signup`, values)
            .then(resp => {
                console.log(resp)
                console.log('Deu Certo')
            })
            .catch(err =>{
                console.log(err)
                console.log('Deu Errado')
            })
            
            
        
        
        }
      });
    }

    

    render() {

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    

        // Only show error after a field is touched.
        const nameError = isFieldTouched('name') && getFieldError('name');
        // const rgError = isFieldTouched('rg') && getFieldError('rg');
        const cpfError = isFieldTouched('cpf') && getFieldError('cpf');
        // const statusError = isFieldTouched('status') && getFieldError('status');
        const telError = isFieldTouched('tel') && getFieldError('tel');
        const config = {
            rules: [{ type: 'object', required: true, message: 'Selecione a Data' }],
        };
        // const sexoError = isFieldTouched('sexo') && getFieldError('sexo');
        const emailError = isFieldTouched('email') && getFieldError('email');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        const confirmPasswordError = isFieldTouched('password') && getFieldError('password');


      return (
        <div className='espacamento' >
        
            <Form onSubmit={this.handleSubmit}>


        
                <FormItem
                    validateStatus={nameError ? 'error' : ''}
                    help={nameError || ''}>

                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Digite o Nome Completo' }],
                    })(
                    <Input placeholder="Nome Completo" />
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
                    validateStatus={emailError ? 'error' : ''}
                    help={emailError || ''}>

                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Digite o email' }],
                    })(
                    <Input placeholder="email@email.com" />
                    )}

                </FormItem>

                <FormItem
                    validateStatus={passwordError ? 'error' : ''}
                    help={passwordError || ''}>

                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Digite a Senha' }],
                    })(
                    <Input type='password' placeholder="Senha" />
                    )}

                </FormItem>

                <FormItem
                    validateStatus={confirmPasswordError ? 'error' : ''}
                    help={confirmPasswordError || ''}>

                    {getFieldDecorator('confirmPassword', {
                        rules: [{ required: true, message: 'Confirme sua Senha' }],
                    })(
                    <Input type='password' placeholder="Digite Novamente a Senha" />
                    )}


                </FormItem>

                <FormItem>       
                    <Switch onChange={this.onChange} />
                </FormItem>

                <FormItem >
                    
                        <Checkbox onChange={this.onChecked} disabled={this.state.disableCheckBoxAdm}
                        checked={this.state.adm}
                        >Privilégio de ADM</Checkbox>
                
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
      );
    }
  }

  const WrappedCreateUser = Form.create()(CreateUser);
  

  export default WrappedCreateUser