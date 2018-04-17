import React,{ Component } from 'react';
import { Button, Modal } from 'antd'
import FormEditaModal from './formEdita'

const confirm = Modal.confirm;

export default class ModalExcluir extends Component{
    
  

state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  showDeleteConfirm(id) {
    console.log(id)
    confirm({
      title: 'Are you sure delete this task?',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  componentDidMount(){
    console.log(this.props.value)
  }

    render() {
        return(
            <div>
                
            <Button onClick={this.showDeleteConfirm(this.props.values.id)} type="dashed">
              Delete
            </Button>
                
            </div>
        );
    }
}