import React, { Component } from 'react';
import { List, Avatar, Icon, Button, Modal, Collapse } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import { withRouter } from 'react-router-dom';
import AddDependente from './addDependente/addDependente'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setDadosDependentePerfilEditar } from './actions/actionDependente';

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

  const Panel = Collapse.Panel
  

class Dependente extends Component{

    constructor(props){
        super(props);
        this.goToEdit = this.goToEdit.bind(this);
        this.goToAddDependente = this.goToAddDependente.bind(this);
        this.state= { dependente: [] };
    }

    goToEdit(estado){
        console.log(estado._id)
        this.props.setDadosDependentePerfilEditar(estado);
        this.props.history.push('/editaDependente');
    }

    goToAddDependente(){
        this.props.history.push('/addDependente');
    }

    render(){

        
        
        
        return (
            <div className='espacamento' >
            <AddDependente />
                    
                    <List
                    itemLayout="horizontal"
                    dataSource={this.props.dadosPerfilDependente}
                    renderItem={item => (
                        
                            <Collapse bordered={false} >
                                <Panel header={item.nome}>
                                <Row between='xs' >
                                    <Col xs={2} >
                                        <span>Nome:</span>
                                    </Col>
                                    <Col xs={2} >
                                    <span>{item.nome}</span>
                                    </Col>
                                    <Col xs={2} >
                                    </Col>
                                </Row>
                                <Row between='xs' >
                                <Col xs={2} >
                                        <span>RG:</span>
                                    </Col>
                                    <Col xs={2} >
                                    <span>{item.rg}</span>
                                    </Col>
                                    <Col xs={2} />
                                    
                                </Row>
                                <Row between='xs'>
                                <Col xs={2} >
                                        <span>CPF</span>
                                    </Col>
                                    <Col xs={2} >
                                    <span>{item.cpf}</span>
                                    </Col>
                                    <Col xs={2} />
                                </Row>
                                <Row between='xs'>
                                <Col xs={2} >
                                        <span>Nascimento</span>
                                    </Col>
                                    <Col xs={2} >
                                    <span>{item.data_nasc}</span>
                                    </Col>
                                    <Col xs={2} />
                                </Row>
                                <Row between='xs'>
                                <Col xs={2} >
                                        <span>Parentesco</span>
                                    </Col>
                                    <Col xs={2} >
                                    <span>{item.tipo_dependente}</span>
                                    </Col>
                                    <Col xs={2} />
                                </Row>
                                <Row between='xs'>
                                <Col xs={2} >
                                        <span>Telefone</span>
                                    </Col>
                                    <Col xs={2} >
                                    <span>{item.tel}</span>
                                    </Col>
                                    <Col xs={2} />
                                </Row>
                                <Row between='xs'>
                                <Col xs={2} >
                                        <span>Sexo:</span>
                                    </Col>
                                    <Col xs={2} >
                                    <span>{item.sexo}</span>
                                    </Col>
                                    <Col xs={2} />
                                </Row>
                                    
                                <Button type='default' onClick={() => this.goToEdit(item)} disabled={!this.props.user.adm} >Editar</Button>
                                </Panel>
                            </Collapse>
                        
                    )}
                />
            </div>
        )
        
        
    }
}
const DependenteWithRouter = withRouter(Dependente)

const mapStateToProps = state => ({
    
    dadosPerfilDependente : state.dadosPerfilDependente.dadosPerfilDependente,
    user: state.user.user
})
  
  const mapDispatchToProps = dispatch => bindActionCreators({setDadosDependentePerfilEditar}, dispatch)
  export default connect(mapStateToProps,mapDispatchToProps)(DependenteWithRouter)