import React, { Component } from 'react';
import { Select } from 'antd';

import { setNaturezaProcesso, habilitaNext } from './actions/stepsActions'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Option = Select.Option;

class FirstStep extends Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.habilitaNext();
        if(e == 'Morte'){
            this.props.setNaturezaProcesso(e)
            
        } if(e == 'D.A.M.S'){
            this.props.setNaturezaProcesso(e)
        } if(e == 'Invalidez'){
            this.props.setNaturezaProcesso(e)
        }
        
    }

    componentDidMount(){
        console.log(this.props.morteSelect)
    }

    render() {
       
        return (
            <div className='espacamento' >
                <Select style={{ width: 120 }} onChange={this.handleChange} >
                        <Option value="D.A.M.S">D.A.M.S</Option>
                        <Option value="Invalidez">Invalidez</Option>
                        <Option value="Morte">Morte</Option>
                </Select>
            </div>
        )
    }

}
const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({setNaturezaProcesso, habilitaNext}, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(FirstStep)