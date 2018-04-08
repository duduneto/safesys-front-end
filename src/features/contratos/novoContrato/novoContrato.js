import React, { Component } from 'react';
import { Card } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import NovoContratoSteps from './novoContratoSteps'



class NovoContrato extends Component{
    

    

    render() {

        

        return(
            <div>
            <Row>
                <Col sm />
                <Col xs={10} >
                    <div style={{ padding: 24, background: '#fff', minHeight: 360, minWidth: 290}}>
                        <NovoContratoSteps />
                    </div>
                </Col>
                <Col sm />
            </Row>
            </div>

            

        )
    }

}


export default NovoContrato;