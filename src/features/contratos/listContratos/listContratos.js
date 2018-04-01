import React, { Component } from 'react';
import { Tabs } from 'antd';
import ListPendentes from './listPendentes/listPendentes';
import ListConfirmados from './listConfirmados/listConfirmados';

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

export default class ListContratos extends Component{

    render() {

        return(

            
                <ListPendentes />
                


        )
        
    }

}