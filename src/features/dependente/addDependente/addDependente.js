import React, { Component } from 'react';
import { Button, Modal } from 'antd'
// import TableDependentes from './tableDependentes';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { openModal, closeModal } from '../../contratos/novoContrato/actions/stepsActions'
import ModalAddDependente from './modalAddDependente';

class AddDependente extends Component{
    
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
        
            return(
                <div className='espacamento' >
                    <Button type='primary' onClick={this.showModal} disabled={!this.props.user.adm} > Add </Button>
                    <Modal
                    id='modalExcluir'
                    visible={this.props.visible}
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    footer={<Button onClick={this.handleOk} type='primary' >OK</Button>}
                    >
                        <ModalAddDependente />
                    </Modal>

                </div>
            )
        
        
    }
}

const mapStateToProps = state => ({visible: state.modalDependente.visible, 
    naturezaProcesso: state.naturezaProcesso.naturezaProcesso,
    user: state.user.user

})

const mapDispatchToProps = dispatch => bindActionCreators({openModal, closeModal}, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(AddDependente)