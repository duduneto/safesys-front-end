import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import { abreFechaMenu } from '../actions/sideMenuActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const { Sider } = Layout;
const { SubMenu } = Menu;

class SideMenu extends Component{

    constructor(props){
        super(props);

        this.state = {resposive:false}

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
        // if(window.screen.width < 992){
        //     this.setState({resposive:true})
        //     console.log('Responsividade DisparadaAAAAAAAAA')
        // } else{
        //     this.setState({resposive:false})
        //     console.log('Responsividade RetraidaaaaaAAAAAAA')
        // }
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
                                
                                <Icon type="user" />
                                <span className="nav-text" >Home</span>
                                <Link to='/home' />
                            
                    </Menu.Item>
                    

                    
                    <SubMenu key="sub1" title={<span><Icon type="solution" />Contratos</span>}>
                        <Menu.Item  key="2">
                            
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

                    <Menu.Item key="4">
                        <Icon type="user" />
                        <span className="nav-text">Teste</span>
                        <Link to='/cliente' />
                    </Menu.Item>

                </Menu>
                
            </Sider>
            
        )
    }
}

const mapStateToProps = state => ({
    collapse: state.sideMenu.collapse
  })
  
  const mapDispatchToProps = dispatch => bindActionCreators({abreFechaMenu}, dispatch)
  export default connect(mapStateToProps,mapDispatchToProps)(SideMenu)