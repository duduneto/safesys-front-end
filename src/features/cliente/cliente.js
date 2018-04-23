import React, { Component } from 'react';
import { List, Avatar, Icon, Button } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import { withRouter } from 'react-router-dom'
import BtnDependente from './helper/btnDependente'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import btnDependente from './helper/btnDependente';

const listData = [];

listData.push({
    href: 'http://ant.design',
    title: `ant design part`,
    
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });

  const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );
  

class Cliente extends Component{

    constructor(props){
        super(props);
        this.handleEditar = this.handleEditar.bind(this);
        this.state= { cliente: [] };
    }

    handleEditar(){
        this.props.history.push('/editaProcesso')
    }

    render(){

        return(
            <div className='perfil-cliente' >
                <List
                    itemLayout="vertical"
                    size="large"
                    
                    dataSource={listData}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            
                            extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                        >
                            <List.Item.Meta
                                
                                title={this.props.dados.nome}
                                description={<span>Natureza do Processo: <strong>{this.props.dados.natureza_processo}</strong></span>}
                            />
                            
                            <List.Item.Meta
                                title='CPF'
                                description={this.props.dados.cpf}
                            />
                            <List.Item.Meta
                                title='RG'
                                description={this.props.dados.rg}
                            />
                            <List.Item.Meta
                                title='Nascimento'
                                description={this.props.dados.data_nasc}
                            />
                            <List.Item.Meta
                                title='Data Sinistro'
                                description={this.props.dados.data_sinistro}
                            />

                            <List.Item.Meta
                                title='Telefone'
                                description={this.props.dados.tel}
                            />

                            <List.Item.Meta
                                title='Status do Processo'
                                description={this.props.dados.status}
                            />

                            <List.Item.Meta
                                title='Sexo'
                                description={this.props.dados.sexo}
                            />

                            <List.Item.Meta
                                title='Responsavel'
                                description={this.props.dados.responsavel_cpf}
                            />
                            

                            
                        </List.Item>
                    )}
                />
                            <Row between="xs" className='paddingbottom2em' >
                                <Col xs={8} ><BtnDependente dados={this.props.dados} /></Col>
                                <Col xs={16} ></Col>
                                <Col xs={16} ><Button type='default' onClick={this.handleEditar} disabled={!this.props.user.adm} >Editar</Button></Col>
                            </Row>
            </div>
        )
    }
}
const ClienteWithRouter = withRouter(Cliente)

const mapStateToProps = state => ({
    dados: state.dadosPerfilCliente.dadosPerfilCliente,
    user: state.user.user
})
  
  const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
  export default connect(mapStateToProps,mapDispatchToProps)(ClienteWithRouter)