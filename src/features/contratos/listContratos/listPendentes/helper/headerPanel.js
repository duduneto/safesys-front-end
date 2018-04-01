import React, {Component} from 'react';
import { Row, Col } from 'react-flexbox-grid'

export default class HeaderPanel extends Component{
    render() {
        return(
            <div>
                <Row start="xs">
                    <Col xs={6}><strong>{this.props.title}</strong></Col>
                    <Col xs={6}>{this.props.content}</Col>
                </Row>  
            </div>
        )
    }
}