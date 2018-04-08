import React, { Component } from 'react';
import { Button } from 'antd'


import { connect } from 'react-redux';

class LastItem extends Component{

    handleClick(){
        console.log(this.props.dadosCadastro)
    }
    

    render(){
        return(
            <div><Button type='primary' onClick={this.handleClick} >Botão</Button></div>
        )
    }
}

const mapStateToProps = state => ({
    
    dadosNovoContrato: state.dadosNovoContrato.dadosNovoContrato
  })
  
  
  export default connect(mapStateToProps)(LastItem)