import React, { Component } from 'react';
import { Form, Icon, Input, Button, DatePicker, Radio, Select, Card } from 'antd';
import axios from 'axios';
import urls from '../../../common/urls';
import { formatDate } from './helper/dateHelper'
import { cadastroSuccess, cadastroFail } from './helper/notification';
// import { addToken } from './helper/addToken';

import { setDadosCadastro } from './actions/actionNovoContrato';
import { atualizaCurrent } from './actions/stepsActions'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class HorizontalLoginForm extends Component {

    constructor(props){
        super(props);
        this.handleResposavelSelected = this.handleResposavelSelected.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleDateSinistro = this.handleDateSinistro.bind(this);
        this.state ={ responsavel_cpf: undefined}
    }

    handleResposavelSelected(value) {
        this.setState({responsavel_cpf:value})
    }

    handleChange = (e) => {
        if( e == 'Morte'){
            console.log('Morte Escolhida')
        }
    }

    handleDate(e){
        let v = e.target.value;
        console.log(e.target.value.length, v);
        let array = v.split('');

        if(array.length > 10){
            console.log('Atingiu o Limite');
            array.splice(10, Number.MAX_VALUE);
        }else if( array.length < 3 ){
            console.log('Deixa como está')
        } else if( array.length >=3 && (array[3] === undefined) && !(array[2] == '/') ){
            array.splice(2,0,'/');
        } else if(( array.length >=6 ) && (array[6] === undefined) && !(array[5] == '/')) {
            array.splice(5,0,'/')
        }

        // array.splice(2,1);
        // if(array.length >=2 && array.length <5){
        //     array.splice(2,0,'/')
        // } else if( array.length >=5){
        //     array.splice(2,0,'/');
        //     array.splice(5,0,'/');
        // }
        let value = array.join('');
        console.log(v, array, value);
        e.target.value = value;
    }

    handleDateSinistro(el){
        let v = el.target.value;
        console.log(el.target.value.length, v);
        let array = v.split('');

        if(array.length > 10){
            console.log('Atingiu o Limite');
            array.splice(10, Number.MAX_VALUE);
        }else if( array.length < 3 ){
            console.log('Deixa como está')
        } else if( array.length >=3 && (array[3] === undefined) && !(array[2] == '/') ){
            array.splice(2,0,'/');
        } else if(( array.length >=6 ) && (array[6] === undefined) && !(array[5] == '/')) {
            array.splice(5,0,'/')
        }

        // array.splice(2,1);
        // if(array.length >=2 && array.length <5){
        //     array.splice(2,0,'/')
        // } else if( array.length >=5){
        //     array.splice(2,0,'/');
        //     array.splice(5,0,'/');
        // }
        let value = array.join('');
        console.log(v, array, value);
        el.target.value = value;
    }

    next() {
        const current = this.props.numberPage + 1;
        this.props.atualizaCurrent(current)
    }
    prev() {
        const current = this.props.numberPage - 1;
        this.props.atualizaCurrent(current);
    }


    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {

            const token = localStorage.getItem('token');
            // console.log(values.data_nasc._d);
            // const data = formatDate(values.data_nasc._d);
            // let data_sinistro = formatDate(values.data_sinistro._d)
            // values.data_sinistro = data_sinistro;
            // values.data_nasc = data;
            values.responsavel_cpf = this.state.responsavel_cpf;
            console.log(values);
            // values.token = token;
            // console.log(values);

            this.next();
                        
            this.props.setDadosCadastro(values)
            
            // axios.post(`${urls.API_URL}/contratos`,values)
            // .then(resp => {
            //     console.log(resp.status)
            //     if(resp.status === 201){
            //         console.log("Cadastro Criado");
            //         this.props.form.resetFields();
                    
            //         cadastroSuccess();
            //     }
            // })
            // .catch( err => {
            //     console.log(err);
            //     cadastroFail();
            // })
        
        
        }
      });
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        
        
      }

    render() {

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    

        // Only show error after a field is touched.
        const nomeError = isFieldTouched('nome') && getFieldError('nome');
        const rgError = isFieldTouched('rg') && getFieldError('rg');
        const cpfError = isFieldTouched('cpf') && getFieldError('cpf');
        const statusError = isFieldTouched('status') && getFieldError('status');
        const telError = isFieldTouched('tel') && getFieldError('tel');
        const dataNascError = isFieldTouched('data_nasc') && getFieldError('data_nasc')
        const config = {
            rules: [{ type: 'object', required: true, message: 'Selecione a Data' }],
        };
        const sexoError = isFieldTouched('sexo') && getFieldError('sexo');


      return (
          <div className='espacamento' >
        
        <Form onSubmit={this.handleSubmit}>


        
            <FormItem
                
                label='Nome Cliente'
                >

                {getFieldDecorator('nome', {
                    rules: [{ required: true, message: 'Digite o Nome Completo' }],
                })(
                <Input placeholder="Nome Completo" />
                )}

            </FormItem>


            <FormItem
                
                label='RG'>

                {getFieldDecorator('rg', {
                    rules: [{ required: true, message: 'RG Obrigatório' }],
                })(
                <Input type="text" placeholder="RG" />
                )}

            </FormItem>

            <FormItem
                
                label='CPF'
                >

                {getFieldDecorator('cpf', {
                    rules: [{ required: true, message: 'CPF Obrigatório' }],
                })(
                <Input type="text" placeholder="CPF" />
                )}

            </FormItem>


            <FormItem
                
                
                label='Data Nascimento'
                >

                {getFieldDecorator('data_nasc', {
                    rules: [{ required: true, message: 'Data Nascimento' }],
                })(
                    <Input id='inputData' onChange={this.handleDate} />
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
                label="Data do Sinistro"
                >
                
                {getFieldDecorator('data_sinistro', {
                    rules: [{ required: true, message: 'Data Sinistro' }],
                })(
                    <Input id='inputDataSinistro' onChange={this.handleDateSinistro} />
                )}
            </FormItem>


            <FormItem
                
                label="Status"
                hasFeedback
                >
                {getFieldDecorator('status', {
                    rules: [
                    { required: true, message: 'Selecione o Status' },
                    ],
                })(
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

            <FormItem
                label="Responsavel pelo Processo"
                >
                {getFieldDecorator('responsavel_cpf', {
                    rules: [{ required: true, message: 'Escolha um Responsavel' }],
                })(
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
                        <Option key={this.props.user.cpf} value={this.props.user.cpf} >Eu</Option>
                        {this.props.responsaveis.map( e => <Option value={e.cpf} key={`chave${e.cpf}`} >{e.nome}</Option>)}
                    </Select>
                )}
            </FormItem>
            

            <FormItem>

                <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
                
                >
                Próximo
                </Button>
                
                <Button
                onClick={() => this.prev()}
                >Voltar</Button>

            </FormItem>


        </Form>
        
        </div>
      );
    }
  }

  const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm);
  

  const mapStateToProps = state => ({
    dadosCadastro: state.contratos.dadosCadastroProcesso,
    numberPage: state.step.numberPage,
    responsaveis: state.responsaveis.responsaveis,
    user: state.user.user
  })
  
  const mapDispatchToProps = dispatch => bindActionCreators({setDadosCadastro, atualizaCurrent}, dispatch)
  export default connect(mapStateToProps,mapDispatchToProps)(WrappedHorizontalLoginForm)
 