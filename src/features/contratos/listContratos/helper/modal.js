import React,{ Component } from 'react';
import { Modal, Button, Switch, Form } from 'antd';
import axios from 'axios';
import urls from '../../../../common/urls';


const FormItem = Form.Item;

export default class MostraModal extends Component {
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  constructor(props){
    super(props);
    this.handleExcluir = this.handleExcluir.bind(this);
    this.state = { visible: false, checado: undefined };
  }

  handleExcluir(e){
       
    const token = localStorage.getItem('token');
    e.preventDefault();
    console.log(this.props.value._id)
    axios.delete(`${urls.API_URL}/contratos/${this.props.value._id}`,{headers:{token:token}})
    .then(resp => {
      console.log(resp)
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>{this.props.title}</Button>
        <Modal
          title="Ações"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleExcluir} >
            <FormItem>
              <Button htmlType="submit" >Excluir</Button>
            </FormItem>
            {/* <FormItem>
              <Switch id="switchConfirmado" checked={this.state.checado} />
            </FormItem> */}
          </Form>
        </Modal>
      </div>
    );
  }
}