import React, { Component } from 'react';
import { Button } from 'antd';

import { abreFechaMenu } from '../../components/actions/sideMenuActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Test extends Component{

    handleClick(){
        this.props.abreFechaMenu(false);
    }
    
    render(){
        return(
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                  TESTE TESTE
                  <Button onClick={this.handleClick.bind(this)} >Menu</Button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    collapse: state.sideMenu.collapse
  })
  
  const mapDispatchToProps = dispatch => bindActionCreators({abreFechaMenu}, dispatch)
  export default connect(mapStateToProps,mapDispatchToProps)(Test)