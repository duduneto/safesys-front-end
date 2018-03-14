import React, { Component } from 'react';

import SideMenu from '../components/sideMenu';
import Header from '../components/header';
import FooterBar from '../components/footer';
import { Layout } from 'antd';
import './DefaultPage.css';
import Routes from '../common/routes.js';
import Content from '../common/content.js'

// const { Content } = Layout;

class DefaultPage extends Component {

    render(){

      const { component: Component, location, ...rest } = this.props; // eslint-disable-line
      // const contentStyle = {
      //   padding: 24,
      //   background: '#fff',
      //   minHeight: 360,
      // };

      return (
        
          <Layout style={{ height: '' }} >
            <SideMenu />
            <Layout>
              <Header />
                <Content>
                      <Routes />
                </Content>
              <FooterBar />
            </Layout>
          </Layout>
        
    
      );
    }
}



export default DefaultPage;
