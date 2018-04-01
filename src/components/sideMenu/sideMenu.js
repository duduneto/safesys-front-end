import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';


const { Sider } = Layout;
const { SubMenu } = Menu;

export default class SideMenu extends Component{

    constructor(props){
        super(props);

        this.state = {collapsed:undefined}

        this.menuCollapsed = this.menuCollapsed.bind(this);
        this.onCollapse = this.onCollapse.bind(this);
    }

    menuCollapsed = () => {
        console.log("Fui Clicado");
        
        this.setState({collapsed: !this.state.collapsed});
        console.log(this.state.collapsed)
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        // this.setState({ collapsed });
    }

    // componentDidMount(){
    //     this.setState({collapsed: undefined})
    // }

    render(){
        return (
            
            <Sider
                id="sideMenu"
                breakpoint="lg"
                collapsedWidth="0"
                onCollapse={(collapsed ) => {
                    this.setState({collapsed:collapsed});
                    console.log(this.state.collapsed);
                }}
                // collapsed={this.state.collapsed}
                
                
            >
                {/* O Logo está indexado AQUI */}
                <div className="logo">
                    <h1 className="nav-text AlinhaOTexto Texto-logo" > LOGO </h1>
                </div>
                
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
                    <Menu.Item key="1" >
                            <Icon type="user" />
                            <span className="nav-text" >Home</span>
                            <Link to='/home' />
                    </Menu.Item>

                    
                    <SubMenu key="sub1" title={<span><Icon type="solution" />Contratos</span>}>
                        <Menu.Item key="2">
                            <Icon type="file-add" />
                            <span className="nav-text">Novo Contrato</span>
                            <Link to='/novoContrato' />
                        </Menu.Item>

                        <Menu.Item key="5">
                            <Icon type="file" />
                            <span className="nav-text">Contratos</span>
                            <Link to='/contratos' />
                        </Menu.Item>
                    </SubMenu>

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