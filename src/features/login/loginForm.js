import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Card } from 'antd';
import fetch from 'node-fetch';
import PegaFetch from './loginfetch';
      


const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  
  class Login extends React.Component {
    // componentDidMount() {
    //   // To disabled submit button at the beginning.
    //   this.props.form.validateFields();
    // }
    
    constructor(props){
      super(props);
      this.state = { email: [], password: []};
    }

    // e.preventDefault();
    // var a = fetch('https://br.lipsum.com/', {
    //   mode: 'no-cors', 
    //   body: JSON.stringify()
    //   })
    //   .then(response => response.text())
    //   .then(result => console.log(result));
    //   // console.log(a);

    handleSubmit(e){
      
      e.preventDefault();
        PegaFetch();
    }

    

    render() {
      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
      // Only show error after a field is touched.
      const userNameError = isFieldTouched('userName') && getFieldError('userName');
      const passwordError = isFieldTouched('password') && getFieldError('password');
      return (
        <Card style={{ width: 300 }}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem
            validateStatus={userNameError ? 'error' : ''}
            help={userNameError || ''}
          >
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <h3>{this.state.email}</h3>
          <FormItem
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Log in
            </Button>
          </FormItem>
        </Form>
        </Card>
      );
    }
  }
  
  const LoginForm = Form.create()(Login);

  export default LoginForm;