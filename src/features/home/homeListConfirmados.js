import React, { Component } from 'react';
import { Card, Button, Table, Icon, Divider } from 'antd';
import data from '../../mock/home.js';


const { Column, ColumnGroup } = Table;


class HomeListConfirmados extends Component {

    render(){
        return(

            <Table dataSource={data}> 
                    <Column
                        title="First Name"
                        dataIndex="firstName"
                        key="firstName"
                    />
                    <Column
                        title="Last Name"
                        dataIndex="lastName"
                        key="lastName"
                    />
                    
                    <Column
                    title="Age"
                    dataIndex="age"
                    key="age"
                    />
                    <Column
                    title="Address"
                    dataIndex="address"
                    key="address"
                    />
                    <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <span>
                        <a href="#">Action 一 {record.name}</a>
                        <Divider type="vertical" />
                        <a href="#">Delete</a>
                        <Divider type="vertical" />
                        <a href="#" className="ant-dropdown-link">
                            More actions <Icon type="down" />
                        </a>
                        </span>
                    )}
                    />
            </Table>

        )
    }

}

export default HomeListConfirmados;