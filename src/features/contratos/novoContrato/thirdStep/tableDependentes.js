import React, { Component } from 'react';

import { Table, List } from 'antd'
import { falseRender } from '../actions/actionNovoContrato'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const { Column } = Table;  
  

class TableDependentes extends Component{

    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }


    render(){
        
        

        return(
            
            <div>
                                
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.dadosDependentes}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                
                                title={<a href="https://ant.design">{item.nome}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />

                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    dadosDependentes: state.dadosDependente.dependentes,
    render: state.dadosDependente.render
  })
  
  const mapDispatchToProps = dispatch => bindActionCreators({falseRender}, dispatch)
  export default connect(mapStateToProps,mapDispatchToProps)(TableDependentes)