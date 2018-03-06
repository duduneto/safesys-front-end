import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';


const { Header, Content } = Layout;

export default class HeaderBar extends Component{

    render(){
        return (
        
            <Header style={{ background: '#fff', padding: 0 }} >
                
                <h1 className="AlinhaOTexto" >Header</h1>
            </Header>
        
        )
    }

}