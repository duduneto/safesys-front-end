import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';


const { Sider } = Layout;

export default class SideMenu extends Component{

    render(){
        return (
            
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
            >
                {/* O Logo está indexado AQUI */}
                <div className="logo">
                    <h1 className="nav-text AlinhaOTexto Texto-logo" > LOGO </h1>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Icon type="user" />
                        <span className="nav-text">Home</span>
                        <Link to='/home' />
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="video-camera" />
                        <span className="nav-text">Options</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="solution" />
                        <span className="nav-text">Aloha</span>
                        <Link to='/aloha' />
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="user" />
                        <span className="nav-text">Teste</span>
                        <Link to='/test' />
                    </Menu.Item>
                </Menu>
            </Sider>
            
        )
    }
}