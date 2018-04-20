import React, { Component } from 'react';
import { List, Avatar, Button, Spin } from 'antd';


const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];


export default class ListUsers  extends Component {

    constructor(props){
        super(props);
        
    }

  render() {
      return(
          <div>
              {/* <List
                  className="demo-loadmore-list"

                  itemLayout="horizontal"

                  dataSource={data}
                  renderItem={item => (
                      <List.Item actions={[<a>more</a>]}>
                          <List.Item.Meta
                              avatar={<Avatar icon='user' />}
                              title={item.title}

                          />

                      </List.Item>
                  )}
              /> */}
          </div>
      )
  }
 
  
}