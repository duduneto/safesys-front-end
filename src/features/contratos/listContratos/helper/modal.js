import React,{ Component } from 'react';
import { Modal, Button, Switch, Form } from 'antd';
import axios from 'axios';
import urls from '../../../../common/urls';

import { removeProcesso } from './modalActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const FormItem = Form.Item;

class MostraModalPendentes extends Component {
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
      this.props.removeProcesso()
      
    })
    .catch(err => {
      console.log(err)
    })
    this.setState({
      visible: false,
    });
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
          id='modalExcluir'
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

const mapStateToProps = state => ({reduxContratos: state.contratos.contratos, reduxContratosClone: state.contratos.contratosClone})

const mapDispatchToProps = dispatch => bindActionCreators({removeProcesso}, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(MostraModalPendentes)