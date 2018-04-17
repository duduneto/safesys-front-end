import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUser } from '../login/actions/userActions'
import { setResponsaveis } from './actions/responsaveisActions'
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
        let userEmail = localStorage.getItem('emailUser');
        const token = localStorage.getItem('token');
        axios.get(`${urls.OAPI_URL}/usuario?email=${userEmail}`)
        .then(resp => {
            console.log(resp.data[0].adm);
            if(resp.data[0].adm === true){
                axios.get(`${urls.API_URL}/contratos?sort=nome`,{headers:{token:token}})
                .then(resp => {
                    console.log(resp);
                    
                    this.props.atualizaProcessoPendente(resp.data);
                })
                .catch(err => {
                    console.log(err)
                })
            }else{
                axios.get(`${urls.API_URL}/contratos?responsavel_cpf=${resp.data[0].cpf}`,{headers:{token:token}})
                .then(resp => {
                    console.log(resp);
                    
                    this.props.atualizaProcessoPendente(resp.data);
                })
                .catch(err => {
                    console.log(err)
                })
            }
            
            this.props.setUser(resp.data[0]);

        })
        .catch(err => {
            console.log(err);
        })

        
        axios.get(`${urls.API_URL}/contratos?sort=nome`,{headers:{token:token}})
        .then(resp => {
            console.log(resp);
            
            this.props.atualizaProcessoPendente(resp.data);
        })
        .catch(err => {
            console.log(err)
        })
        let arrayUsuarios = []
        axios.get(`${urls.OAPI_URL}/usuario`)
        .then( resp => {
            console.log(resp.data)
            resp.data.forEach(element => {
                if(element.cpf !== this.props.user.cpf ){
                    let e = {
                        nome: element.name,
                        cpf: element.cpf
                    }
                    arrayUsuarios.push(e);
                }
                

            });
            
            this.props.setResponsaveis(arrayUsuarios);
        })
        .catch( err => {

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


  const mapStateToProps = state => ({reduxContratos: state.contratos.contratosPendentes, 
    reduxContratosClone: state.contratos.contratosPendentesClone,
    user: state.user.user
})
  const mapDispatchToProps = dispatch => bindActionCreators({atualizaProcessoPendente, setUser, setResponsaveis}, dispatch)
  export default connect(mapStateToProps,mapDispatchToProps)(Home)