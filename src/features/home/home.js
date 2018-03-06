import React, { Component } from 'react';
import { Card, Button, Table, Icon, Divider } from 'antd';
import axios from 'axios';

import HomeListPendentes from './homeListPendentes.js';
import HomeListConfirmados from './homeListConfirmados.js';

function handleClick(){
    // e. preventDefault();
    console.log("Clicado");
}


export default class Home extends Component{

   constructor(props){
       super(props);

        this.state = { names : []}

        this.handleClick = this.handleClick.bind(this);
   }

handleClick(){
    axios.get('http://localhost:3030/api/contratos')
            .then(response => response.data)
            .then(result => result.map( valor => {
                this.setState = { names : valor.name };
            }));
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