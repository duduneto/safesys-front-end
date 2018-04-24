import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import axios from 'axios';
import urls from '../../common/urls';

import { abreFechaMenu } from '../actions/sideMenuActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const { Sider } = Layout;
const { SubMenu } = Menu;

class SideMenu extends Component{

    constructor(props){
        super(props);

        this.state = {resposive:false, disableAddUser: true}

        this.fechaMenu = this.fechaMenu.bind(this);
        this.onCollapse = this.onCollapse.bind(this);
    }

    fechaMenu = () => {
        if( window.screen.width < 992 ){
            this.props.abreFechaMenu(true);
            
        }
        
        // if( this.state.resposive === true){
            
            
        // }
            
        
    }

    onCollapse = (collapsed) => {
    //     console.log(collapsed);
        // this.setState({ collapsed });
    }

    // componentDidMount(){
    //     this.setState({collapsed: undefined})
    // }

    componentDidMount(){
        let emailUser = localStorage.getItem('emailUser');
        axios.get(`${urls.OAPI_URL}/usuario?email=${emailUser}`)
        .then( resp => {
            
            if(resp.data[0].adm == true){
                this.setState({disableAddUser: false})
            }
        })
        .catch( err => {
            console.log(err)
        });
    }

    render(){
        return (
            // Ao mudar o breakpoint, lembrar de mudar o valor de condição do if dentro do onCollapse
            <Sider
                id="sideMenu"
                breakpoint="lg"
                collapsedWidth="0"
                // defaultCollapsed={this.state.resposive}
                collapsed={this.props.collapse}
                onCollapse={(collapsed ) => {
                    
                    this.props.abreFechaMenu(collapsed);
                    
                    
                }}
                // collapsed={this.state.collapsed}
                
                
                
            >
                {/* O Logo está indexado AQUI */}
                <div className="logo">
                    <h1 className="nav-text AlinhaOTexto Texto-logo" > SafeSys </h1>
                </div>
                
                <Menu theme="dark" mode="inline"     onSelect={this.fechaMenu} >
                    
                    <Menu.Item key="1" >
                                
                                <Icon type="home" />
                                <span className="nav-text" >Home</span>
                                <Link to='/home' />
                            
                    </Menu.Item>
                    

                    
                    <SubMenu key="sub1" title={<span><Icon type="solution" />Contratos</span>}>
                        <Menu.Item  key="2" disabled={!this.props.user.adm} >
                            
                            <Icon type="file-add" />
                            <span className="nav-text">Novo Contrato</span>
                            <Link to='/novoContrato' />
                        </Menu.Item>

                        <Menu.Item key="3">
                            <Icon type="file" />
                            <span className="nav-text">Contratos</span>
                            <Link to='/contratos' />
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub2" title={<span><Icon type="user" />Usuários</span>}>
                        <Menu.Item key="4" disabled={this.state.disableAddUser} >
                            <Icon type="user-add" />
                            <span className="nav-text">Adicionar Usuário</span>
                            <Link to='/newUser' />
                        </Menu.Item>

                        <Menu.Item key="5" disabled={this.state.disableAddUser} >
                            <Icon type="contacts" />
                            <span className="nav-text">Usuários</span>
                            <Link to='/users' />
                        </Menu.Item>

                    </SubMenu>

                </Menu>
                
            </Sider>
            
        )
    }
}

const mapStateToProps = state => ({
    collapse: state.sideMenu.collapse,
    user: state.user.user
  })
  
  const mapDispatchToProps = dispatch => bindActionCreators({abreFechaMenu}, dispatch)
  export default connect(mapStateToProps,mapDispatchToProps)(SideMenu)