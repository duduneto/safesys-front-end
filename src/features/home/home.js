import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import axios from 'axios';
import urls from '../../common/urls';

import HomeListPendentes from './homeListPendentes.js';
import HomeListConfirmados from './homeListConfirmados.js';

import { atualizaProcessoPendente } from '../contratos/listContratos/listPendentes/helper/modalActions'
class Home extends Component{
    
    constructor(props){
        super(props);
        
        this.state = { names : [] }
        
        // this.tamanhoTela = this.tamanhoTela.bind(this);
    }
    
    // tamanhoTela(){
    //     return window.screen.height;
    // }

    
    componentDidMount(){
        const token = localStorage.getItem('token');
        axios.get(`${urls.API_URL}/contratos?sort=nome`,{headers:{token:token}})
        .then(resp => {
            console.log(resp);
            
            this.props.atualizaProcessoPendente(resp.data);
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    render(){

        return(
            <div style={{ padding: 24 ,background: '#fff', minHeight:890 }} >
                <h2 className="AlinhaOTexto" style={{paddingBottom: 15}} >Dados Gerais</h2>
                
                <HomeListPendentes />
                
                {/* <h3 className="AlinhaOTexto" >Confirmados</h3> */}
                {/* <HomeListConfirmados /> */}
            </div>
        )

    }

}


  const mapStateToProps = state => ({reduxContratos: state.contratos.contratosPendentes, reduxContratosClone: state.contratos.contratosPendentesClone})
  const mapDispatchToProps = dispatch => bindActionCreators({atualizaProcessoPendente}, dispatch)
  export default connect(mapStateToProps,mapDispatchToProps)(Home)