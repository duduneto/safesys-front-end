import React,{ Component } from 'react';
import { Button, Modal } from 'antd'
import FormEditaModal from './formEdita'

export default class ModalEdita extends Component{
    
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
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  componentDidMount(){
    console.log(this.props.value)
  }

    render() {
        return(
            <div>
                
                <FormEditaModal value={this.props.value}/>
                
            </div>
        );
    }
}