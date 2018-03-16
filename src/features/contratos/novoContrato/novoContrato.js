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
                    <Card>
                        <NovoContratoForm />
                    </Card>
                </Col>
                <Col sm />
            </Row>

            

        )
    }

}


export default NovoContrato;