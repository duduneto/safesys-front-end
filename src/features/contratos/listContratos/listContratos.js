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

            <Tabs onChange={callback} type="card">
                <TabPane tab="Pendentes" key="1"><ListPendentes /></TabPane>
                <TabPane tab="Confirmados" key="2"><ListConfirmados /></TabPane>
            </Tabs>


        )
        
    }

}