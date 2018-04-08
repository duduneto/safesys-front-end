import React, { Component } from 'react';
import { Button, Steps, message } from 'antd';
import LastItem from './lastItem'

import { abreFechaMenu } from '../../components/actions/sideMenuActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WrappedHorizontalLoginForm from '../contratos/novoContrato/novoContratoForm'
import TesteSelect from './select';
import { atualizaCurrent } from './actions'

const steps = [{
    title: 'First',
    content: <TesteSelect/>,
  }, {
    title: 'Second',
    content: <WrappedHorizontalLoginForm/>,
  }, {
    title: 'Last',
    content: <LastItem/>,
  }];

  const Step = Steps.Step;

class Test extends Component{

    constructor(props){
        super(props);
        // this.state={ current: 0 }
    }

    handleClick(){
        this.props.abreFechaMenu(false);
    }

    next() {
        const current = this.props.numberPage + 1;
        this.props.atualizaCurrent(current)
    }
    prev() {
        const current = this.props.numberPage - 1;
        this.props.atualizaCurrent(current);
    }
    
    componentDidMount(){
        console.log(this.props.current)
    }

    render(){
        
        // const { current } = this.props.current;
        return(
            <div>
                <Steps current={this.props.numberPage}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div className="steps-content">{steps[this.props.numberPage].content}</div>
                <div className="steps-action">
                    {
                        this.props.numberPage < steps.length - 1
                        &&
                        <Button type="primary" onClick={() => this.next()}>Next</Button>
                    }
                    {
                        this.props.numberPage === steps.length - 1
                        &&
                        <Button type="primary" onClick={() => {message.success('Processing complete!'); this.props.atualizaCurrent(0)}}>Done</Button>
                    }
                    {
                        this.props.numberPage > 0
                        &&
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            Previous
                        </Button>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    numberPage: state.step.numberPage
})
  
  const mapDispatchToProps = dispatch => bindActionCreators({atualizaCurrent}, dispatch)
  export default connect(mapStateToProps,mapDispatchToProps)(Test)