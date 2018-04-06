import React, { Component } from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

export default class FooterBar extends Component{

    render(){
        return (
            <Layout>
                <Footer style={{ textAlign: 'center' }}>
                    SafeSys version: α-1.0.3
                </Footer>
            </Layout>
        )
    }

}