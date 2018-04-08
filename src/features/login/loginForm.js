import React from 'react';
import { Form, Input, Button } from 'antd';
import { Card } from 'antd';
import { Row, Col } from 'react-flexbox-grid'
import axios from 'axios';
import urls from '../../common/urls';
import { connectionFail } from './helper/notification';

// import PegaFetch from './loginfetch';

// import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
      
import { login } from '../auth/authActions';

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

      
      axios.post(`${urls.OAPI_URL}/login`, {
        email : emailuser,
        password: passworduser,
      })
        .then( resp => {
          console.log(resp.data)
          localStorage.setItem('token', resp.data.token);
          window.location.href=`${urls.HOME}`;
        }).catch( err => {
          console.log(err.headers);
          connectionFail();
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

        <Row>
          <Col xs />
          <Col xs >
            <div className='position-login' >
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
            </div>
          </Col>
          <Col xs />
        </Row>
        
      );
    }
  }
  
  const LoginForm = Form.create()(Login);

  const mapStateToProps = state => ({ auth: state.auth });
  const mapDispatchToProps = dispatch => bindActionCreators( { login }, dispatch);
  export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);