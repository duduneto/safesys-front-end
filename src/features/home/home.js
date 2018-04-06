import React, { Component } from 'react';


// import axios from 'axios';

import HomeListPendentes from './homeListPendentes.js';
import HomeListConfirmados from './homeListConfirmados.js';



export default class Home extends Component{
    
    constructor(props){
        super(props);
        
        this.state = { names : []}
        
        // this.tamanhoTela = this.tamanhoTela.bind(this);
    }
    
    // tamanhoTela(){
    //     return window.screen.height;
    // }

    
    
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