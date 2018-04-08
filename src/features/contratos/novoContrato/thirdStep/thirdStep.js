import React, { Component } from 'react';
import { Button, Modal, List } from 'antd'
// import TableDependentes from './tableDependentes';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { openModal, closeModal } from '../actions/stepsActions'
import ModalDependente from './modalDependente';

class ThirdStep extends Component{
    
    constructor(props){
        super(props);
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.state={
            visible: false
        }
    }

    showModal(){
        this.props.openModal();
    }

    handleOk = (e) => {
        this.props.closeModal()
    }
    handleCancel = (e) => {
        this.props.closeModal() 
    }

    render(){
        if( this.props.naturezaProcesso == 'Morte'){
            return(
                <div className='espacamento' >
                    <Button type='primary' onClick={this.showModal}  > Add Dependente </Button>
                    <Modal
                    id='modalExcluir'
                    visible={this.props.visible}
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    footer={<Button onClick={this.handleOk} type='primary' >OK</Button>}
                    >
                        <ModalDependente />
                    </Modal>

                    <List
                    itemLayout="horizontal"
                    dataSource={this.props.dependentes}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                
                                title={item.nome}
                                description='Dependente'
                            />
                            <span>CPF: {item.cpf}</span>
                        </List.Item>
                    )}
                />
                </div>
            )
        } else{
            return(
                <div className='espacamento' >
                    <h2>Conclua o Cadastro</h2>
                </div>
            )
        }
        
    }
}

const mapStateToProps = state => ({visible: state.modalDependente.visible, naturezaProcesso: state.naturezaProcesso.naturezaProcesso,
dependentes: state.dadosDependente.dependentes
})

const mapDispatchToProps = dispatch => bindActionCreators({openModal, closeModal}, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(ThirdStep)