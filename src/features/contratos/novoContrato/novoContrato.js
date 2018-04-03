import React, { Component } from 'react';
import { Card } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import NovoContratoForm from './novoContratoForm'



class NovoContrato extends Component{
    

    

    render() {

        

        return(
            
            <Row>
                <Col sm />
                <Col xs={10} >
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <NovoContratoForm />
                    </div>
                </Col>
                <Col sm />
            </Row>

            

        )
    }

}


export default NovoContrato;