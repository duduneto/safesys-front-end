import React from 'react';
import { Row, Col } from 'antd';
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;


class SpaceHeader extends React.Component {
    render(){
        return (
        <div>
            <Row type="flex" justify="center" align="top">
            <Col span={4}><DemoBox value={200}></DemoBox></Col>
            </Row>
            <Row type="flex" justify="center" align="top">
                <Col span={4}><DemoBox value={200}></DemoBox></Col>
            </Row>
            <Row type="flex" justify="center" align="top">
                <Col span={4}><DemoBox value={200}></DemoBox></Col>
            </Row>
        </div>
        )
    }
}



export default SpaceHeader;