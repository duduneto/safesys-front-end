import React,{ Component } from 'react';
import { Modal, Button, Switch, Form, Icon, List, Collapse } from 'antd';
import { Row, Col } from 'react-flexbox-grid'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { processoSuccess } from '../../../novoContrato/helper/notification'
// import ModalEdita from './modalEdita';
import HeaderPanel from './headerPanel';
import axios from 'axios';
import urls from '../../../../../common/urls';

import { atualizaProcessoPendente, abreModal, fechaModal } from './modalActions';
import { atualizaProcessoConfirmado } from '../../listConfirmados/helper/modalActions'
import { setDadosClientePerfil } from '../../../../cliente/actions/action'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const FormItem = Form.Item;
const Panel = Collapse.Panel;

class BotaoMostrarMais extends Component {
  showModal = () => {
    this.setState({visible:true})
  }
  constructor(props){
    super(props);
    this.handleExcluir = this.handleExcluir.bind(this);
    this.confirmarProcesso = this.confirmarProcesso.bind(this);
    this.handleEditar = this.handleEditar.bind(this);
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

  handleEditar(e){
    e.preventDefault();
    console.log(this.props.value)
    this.props.setDadosClientePerfil(this.props.value)
    this.props.history.push('/cliente')
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
    this.props.setDadosClientePerfil(this.props.value)
    return (
      <div>
        <Button type='default' onClick={this.handleEditar} >Mais</Button>
        
      </div>
    );
  }
}
const BotaoMostrarMaisWithRouter = withRouter(BotaoMostrarMais)

const mapStateToProps = state => ({reduxContratos: state.contratos.contratos,
  reduxContratosClone: state.contratos.contratosClone,
  modalVisible: state.contratos.modalVisible
})

const mapDispatchToProps = dispatch => bindActionCreators({atualizaProcessoPendente,atualizaProcessoConfirmado, abreModal, fechaModal, setDadosClientePerfil}, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(BotaoMostrarMaisWithRouter)