import React, { Component } from 'react';
import { Select } from 'antd';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Option = Select.Option;

class TesteSelect extends Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        if(e == 'Morte'){
            localStorage.setItem('morteSelected', true)
            console.log(localStorage.getItem('morteSelected'))
        } else{
            localStorage.setItem('morteSelected', false)
            console.log(localStorage.getItem('morteSelected'))
        }
        
    }

    componentDidMount(){
        console.log(this.props.morteSelect)
    }

    render() {
       
        return (
            <div>
                <Select style={{ width: 120 }} onChange={this.handleChange} >
                        <Option value="D.A.M.S">D.A.M.S</Option>
                        <Option value="Invalidez">Invalidez</Option>
                        <Option value="Morte">Morte</Option>
                </Select>
            </div>
        )
    }

}
const mapStateToProps = state => ({morteSelect: state.contratos.selectMorte})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(TesteSelect)