import React,{ Component } from 'react';
import { Modal, Button, Switch, Form, Icon, List, Collapse } from 'antd';
import { Row, Col } from 'react-flexbox-grid'
import { Link } from 'react-router-dom';
import { processoSuccess } from '../../../novoContrato/helper/notification'
import ModalEdita from './modalEdita';
import axios from 'axios';
import urls from '../../../../../common/urls';

import { atualizaProcessoPendente, abreModal, fechaModal } from './modalActions';
import { atualizaProcessoConfirmado } from '../../listConfirmados/helper/modalActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const FormItem = Form.Item;
const Panel = Collapse.Panel;

class MostraModalPendentes extends Component {
  showModal = () => {
    this.setState({visible:true})
  }
  constructor(props){
    super(props);
    this.handleExcluir = this.handleExcluir.bind(this);
    this.confirmarProcesso = this.confirmarProcesso.bind(this);
    this.teste = this.teste.bind(this);
    this.state = { visible: false, checado: undefined };
  }


  handleExcluir(e){
       
    const token = localStorage.getItem('token');
    e.preventDefault();
    console.log(this.props.value._id)
    axios.delete(`${urls.API_URL}/contratos/${this.props.value._id}`,{headers:{token:token}})
    .then(resp => {
      axios.get(`${urls.API_URL}/contratos?confirm_processo=false&sort=nome`,{headers:{token:token}})
        .then( resp => {
          this.props.atualizaProcessoPendente(resp.data);      
        })
      
      
    })
    .catch(err => {
      console.log(err)
    })
    this.setState({
      visible: false,
    });
  }

  confirmarProcesso = () => {
    let id = this.props.value._id;
    const token = localStorage.getItem('token');
        axios.put(`${urls.API_URL}/contratos/${id}`, {
          confirm_processo: 'true',
          token:token
        })
        .then( resp => {
            console.log(resp)
            processoSuccess('Processo Confirmado', 'Seu processo foi atualizado como Confimado')
            axios.get(`${urls.API_URL}/contratos?confirm_processo=false&sort=nome`,{headers:{token:token}})
            .then(resp => {
                console.log(resp);
                this.props.atualizaProcessoPendente(resp.data);
                axios.get(`${urls.API_URL}/contratos?confirm_processo=true&sort=nome`,{headers:{token:token}})
                .then(resp => {
                  console.log(resp);
                  this.props.atualizaProcessoConfirmado(resp.data)
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

  teste = (text) => {
    console.log(text)
  }

  componentDidMount(){
         console.log(localStorage.getItem('idEditado'))
    if(localStorage.getItem('idEditado') === true){
      console.log('Vou Mostrar um Modal')
      // this.props.value = JSON.parse(localStorage.getItem('dadosCliente'));
      // this.setState({visible:true})
      // localStorage.getItem('idEditado',false);
    }
    
  }
  
  render() {
    localStorage.setItem('dadosCliente', JSON.stringify(this.props.value))
    return (
      <div>
        <a><Icon type="ellipsis" style={{fontSize: 25}} onClick={this.showModal}></Icon></a>
        <Modal
          id='modalExcluir'
          title="Opções"
          visible={this.state.visible}
          // onOk={this.handleOk}
          onCancel={this.handleCancel}  
          footer={<Button onClick={this.handleOk} type='primary' >OK</Button>}       
         >
          <Form onSubmit={this.handleExcluir} >

          <FormItem>
            <div>
              <h3 style={{ marginBottom: 16 }}>Informações do Processo</h3>
              <List bordered >
                <List.Item><List.Item.Meta title={<strong>Processo:</strong>} /> {this.props.value.natureza_processo}</List.Item>
                <List.Item  ><List.Item.Meta title={<strong>Nome:</strong>} /> {this.props.value.nome}</List.Item>
                <List.Item><List.Item.Meta title={<strong>CPF:</strong>} /> {this.props.value.cpf}</List.Item>
                <List.Item><List.Item.Meta title={<strong>RG:</strong>} /> {this.props.value.rg}</List.Item>
                <List.Item><List.Item.Meta title={<strong>Data Nasc:</strong>} /> {this.props.value.data_nasc}</List.Item>
                <List.Item><List.Item.Meta title={<strong>Sinistro:</strong>} /> {this.props.value.data_sinistro}</List.Item>
                <List.Item><List.Item.Meta title={<strong>Status:</strong>} /> {this.props.value.status}</List.Item>
                <List.Item><List.Item.Meta title={<strong>Telefone:</strong>} /> {this.props.value.tel}</List.Item>
                <List.Item><List.Item.Meta title={<strong>Sexo:</strong>} /> {this.props.value.sexo}</List.Item>
              </List>
            </div>
          </FormItem>
            <FormItem>
              <Row between='xs' >
                <Col xs={2} >
                    <Button type='danger' key="back" onClick={this.handleExcluir}>Excluir</Button>
                    
                </Col>
                <Col>
                    <Link to={{pathname:`/editaProcesso/${this.props.value._id}`, state:{dados:this.props.value.nome} }} ><Button type='default' >Edita</Button></Link>
                    {/* <Button id='buttonConfirma' type='primary' onClick={this.confirmarProcesso}>Confirmar</Button> */}
                </Col>
              </Row>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({reduxContratos: state.contratos.contratos,
  reduxContratosClone: state.contratos.contratosClone,
  modalVisible: state.contratos.modalVisible
})

const mapDispatchToProps = dispatch => bindActionCreators({atualizaProcessoPendente,atualizaProcessoConfirmado, abreModal, fechaModal}, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(MostraModalPendentes)