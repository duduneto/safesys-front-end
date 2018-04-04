import React, { Component } from 'react';
import { Progress, Card } from 'antd'

class Card2 extends Component{

    render() {
        return(
            
            <div>
                
                <span>Sob Analise</span><Progress percent={30} />
                <span>Enviado p/ Seguradora</span><Progress percent={50}  />
                <span>Retornou p/ Seguradora</span><Progress percent={7.50} />
                <span>Com Restrições</span><Progress percent={99} />
                <span>Indenizado</span><Progress percent={50} />
                <span>Negado/Cancelado</span><Progress percent={99} />
                
                
            </div>
        )
    }
}

export default Card2;