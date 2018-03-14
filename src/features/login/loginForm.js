import React from 'react';
import { Form, Input, Button } from 'antd';
import { Card } from 'antd';
import axios from 'axios';

// import PegaFetch from './loginfetch';

import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
      
import { login, signup } from '../auth/authActions';

const FormItem = Form.Item;
  
  class Login extends React.Component {

    
    constructor(props){
      super(props);
      
      this.handleOnSubmit = this.handleOnSubmit.bind(this);
      // this.logaUsuario = this.logaUsuario.bind(this);

      this.state = {
        logado: false,
        email: undefined,
        password: undefined
      }
    }


    logaUsuario(emailuser, passworduser){

      
      axios.post('http://localhost:3030/oapi/login', {
        email : emailuser,
        password: passworduser,
      })
        .then( resp => {
          console.log(resp.data)
          localStorage.setItem('token', resp.data.token);
          window.location.href="http://localhost:3000/home";
        }).catch( err => {
          console.log(err.headers);
        })
    }



    handleOnSubmit(event){
      event.preventDefault();
      console.log("CLICADO");

      
      let emailuser = document.getElementById('userEmail').value;
      let passworduser = document.getElementById('password').value;

      this.logaUsuario(emailuser, passworduser);

      console.log(emailuser,passworduser);
      
      return this;        
    }

    

    render() {
 
      const { getFieldDecorator } = this.props.form;     
      
      const userNameDecorator = getFieldDecorator('userEmail');
      const passwordDecorator = getFieldDecorator('password');
      
      return (
        <Card style={{ width: 300 }}>
          <Form id='formLogin' onSubmit={this.handleOnSubmit} >

            <FormItem>
              {userNameDecorator(
                <Input 
                id="userEmail"
                type="email"
                placeholder="Digite seu e-mail"
                />
              )}
              
            </FormItem>

            <FormItem>
              {passwordDecorator(
                <Input
                id="password"
                type="password"
                placeholder="Digite sua Senha" />
              )}
            </FormItem>

            <Button type="primary" htmlType="submit">
              Entrar
            </Button>

          </Form>
          <h1>{}</h1>
        </Card>
      );
    }
  }
  
  const LoginForm = Form.create()(Login);

  const mapStateToProps = state => ({ auth: state.auth });
  const mapDispatchToProps = dispatch => bindActionCreators( { login }, dispatch);
  export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);