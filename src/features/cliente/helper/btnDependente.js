import React, { Component } from 'react';
import { Button, Dropdown, Menu } from 'antd'
import { withRouter } from 'react-router-dom'

import axios from 'axios';
import urls from '../../../common/urls';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setDadosDependentePerfil } from '../actions/btnDependenteAction';

class BtnDependente extends Component{

    constructor(props){
        super(props);
        this.handleBtn = this.handleBtn.bind(this);
        
        this.state = { dependentes : []}
    }

    handleBtn(){
        let token = localStorage.getItem('token');
        axios.get(`${urls.API_URL}/dependentes?segurado_cpf=${this.props.dados.cpf}`,{headers:{token:token}})
        .then( resp => {
            this.props.setDadosDependentePerfil(resp.data);
            this.props.history.push('/dependente');
        })
        .catch( err => {
            console.log(err);
        })

        
    }

    

    componentDidMount(){
        let token = localStorage.getItem('token');
        axios.get(`${urls.API_URL}/dependentes?segurado_cpf=${this.props.dados.cpf}`,{headers:{token:token}})
        .then( resp => {
            this.setState({dependentes:resp.data})
        })
        .catch( err => {
            console.log(err);
        })
    }

    render() {
        
             

        if(this.props.dados.natureza_processo == 'Morte'){
            
            return(
                <div>
                    

                    <Button type='dashed' className='btnDependente' onClick={this.handleBtn} disabled={this.props.user.adm} >Dependentes</Button>
                    
                </div>
            )
        }else{
            return(
                <div>
                </div>
            )
        }
    }
}
const BtnDependenteWithRouter = withRouter(BtnDependente);

const mapStateToProps = state => ({
    dados: state.dadosPerfilCliente.dadosPerfilCliente,
    user: state.user.user
})
  
  const mapDispatchToProps = dispatch => bindActionCreators({setDadosDependentePerfil}, dispatch)
  export default connect(mapStateToProps,mapDispatchToProps)(BtnDependenteWithRouter)