import React,{ Component } from 'react';
import { Modal, Button, Switch, Form, Icon } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import { processoSuccess } from '../../../novoContrato/helper/notification'
import axios from 'axios';
import urls from '../../../../../common/urls';

import { atualizaProcessoConfirmado } from './modalActions';
import { atualizaProcessoPendente } from '../../listPendentes/helper/modalActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const FormItem = Form.Item;

class MostraModalConfirmados extends Component {
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  constructor(props){
    super(props);
    this.handleExcluir = this.handleExcluir.bind(this);
    this.suspenderProcesso = this.suspenderProcesso.bind(this)
    this.state = { visible: false, checado: undefined };
  }

  handleExcluir(e){
       
    const token = localStorage.getItem('token');
    e.preventDefault();
    console.log(this.props.value._id)
    axios.delete(`${urls.API_URL}/contratos/${this.props.value._id}`,{headers:{token:token}})
    .then(respose => {
        axios.get(`${urls.API_URL}/contratos?confirm_processo=true&sort=nome`,{headers:{token:token}})
        .then( resp => {
            console.log('Entrou no Reducer')
            this.props.atualizaProcessoConfirmado(resp.data)
        })
      
    })
    .catch(err => {
      console.log(err)
    })
    this.setState({
      visible: false,
    });
  }

  suspenderProcesso = () => {
    let id = this.props.value._id;
    const token = localStorage.getItem('token');
        axios.put(`${urls.API_URL}/contratos/${id}`, {
          confirm_processo: 'false',
          token:token
        })
        .then( resp => {
            console.log(resp)
            processoSuccess('Processo Suspendido', 'Seu processo foi atualizado como Pendente')
            axios.get(`${urls.API_URL}/contratos?confirm_processo=true&sort=nome`,{headers:{token:token}})
            .then(resp => {
                console.log(resp);
                this.props.atualizaProcessoConfirmado(resp.data);
                axios.get(`${urls.API_URL}/contratos?confirm_processo=false&sort=nome`,{headers:{token:token}})
                .then(resp => {
                  console.log(resp);
                  this.props.atualizaProcessoPendente(resp.data)
                })
            })
            
            
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
        <a><Icon type="ellipsis" style={{fontSize: 25}} onClick={this.showModal}></Icon></a>
        <Modal
          id='modalExcluir'
          title="Opções"
          visible={this.state.visible}
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
            
            

            // ]}
            
        >
          <Form onSubmit={this.handleExcluir} >
            <FormItem>
              <Row between='xs' >
                <Col xs={2} >
                    <Button type='danger' key="back" onClick={this.handleExcluir}>Excluir</Button>
                </Col>
                <Col>
                    <Button id='buttonConfirma' type='primary' onClick={this.suspenderProcesso}>Suspender</Button>
                </Col>
              </Row>
            </FormItem>
            {/* <FormItem>
              <Switch id="switchConfirmado" checked={this.props.value.confirm_processo} />
            </FormItem> */}
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({reduxContratos: state.contratos.contratos, reduxContratosClone: state.contratos.contratosClone})

const mapDispatchToProps = dispatch => bindActionCreators({atualizaProcessoConfirmado, atualizaProcessoPendente}, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(MostraModalConfirmados)