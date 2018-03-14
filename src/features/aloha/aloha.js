import React, { Component } from 'react';
import { Card } from 'antd';
// import axios from 'axios';

export default class Aloha extends Component{

    constructor(props){
        super(props);

        this.state = { lista : [] }
        // this.pegaName = this.pegaName.bind(this);
    }

    // pegaName(){
        
                
    // }



    render(){
        return(
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                  <div style={{ background: '#ECECEC', padding: '30px' }}>
                    <Card title="Clique Aqui" bordered={false} style={{ width: 300 }}>
                        <div>
                            { this.state.lista.map( item => {
                                <p> {item.cpf} </p>
                            }) }
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}