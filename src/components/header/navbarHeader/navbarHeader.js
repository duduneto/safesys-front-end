import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../../features/auth/authActions';

import { Menu, Dropdown } from 'antd';
import { Layout, Avatar, Badge, Button } from 'antd';
import {  Row, Col } from 'react-flexbox-grid';


function btnClicked() {
    console.log("Quero Deslogar");

    localStorage.removeItem('token');
    window.location.href="http://localhost:3000/";

}

const menu = (
    <Menu>
      <Menu.Item key="0">
        {/* <Card style={{ width: "100%" }}> */}
            <Button type="danger" onClick={btnClicked} >Logout</Button>
        {/* </Card> */}
      </Menu.Item>
    </Menu>
      
);



const { Header } = Layout;

class NavbarHeader extends Component{
   

    render(){

    // const { name, email } = this.props.user;
      
    return (
        
        <Header style={{ background: '#fff', padding: 0 }} >
                
                {/* <h1 className="AlinhaOTexto" >Header</h1> */}

                <div>
                    <div>
                        <Row around="xs" >
                            <Col xsOffset={9} xs={3} >
                                <Dropdown overlay={menu} trigger={['click']} >
                                    <Badge>
                                        <Avatar size="large" icon="user" />
                                    </Badge>
                                </Dropdown>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Header>

      )

    }

}

const mapStateToProps = state => ({user: state.auth.user });
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(NavbarHeader);