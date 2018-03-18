import React, { Component } from 'react';
import { Card, Form, Input, Button } from 'antd';
import axios from 'axios';
import urls from '../../../../common/urls';

const FormItem = Form.Item;

export default class Search extends Component{

    constructor(props){
        super(props);
        
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (e) => {
        const token = localStorage.getItem('token');
        e.preventDefault();
        const inputSearch = document.getElementById('inputSearchClient');
        console.log(typeof(inputSearch.value))
        axios.get(`${urls.API_URL}/contratos/?nome__regex=/${inputSearch.value}/gi`,{headers:{token:token}})
        .then(resp => {
            console.log(resp.data);
            console.log(this.state.contratos)
        })
        .catch(err => {
            console.log(err);
        })
        
    }


    render() {

        

        return(

            <Card>
                <Form onSubmit={this.onSubmit} >

                    <FormItem>
                        
                        <Input id="inputSearchClient" type="text" placeholder="Nome do Cliente" />
                        
                    </FormItem>

                    <FormItem>
                        <Button type="primary" htmlType="submit" >Pesquisar</Button>
                    </FormItem>
                    
                </Form>
            </Card>
        )
    }
}