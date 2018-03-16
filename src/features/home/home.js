import React, { Component } from 'react';

// import axios from 'axios';

import HomeListPendentes from './homeListPendentes.js';
import HomeListConfirmados from './homeListConfirmados.js';



export default class Home extends Component{
    
    constructor(props){
        super(props);
        
        this.state = { names : []}
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(){
        
    }

    
    
    render(){

        return(
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <h3 className="AlinhaOTexto" >Pendentes</h3>
                <HomeListPendentes />
                <h3 className="AlinhaOTexto" >Confirmados</h3>
                <HomeListConfirmados />
            </div>
        )

    }

}