import React, {Component} from 'react';
import { Popover, Button } from 'antd'

export default class UsuarioMais extends Component{

    render(){
        const content = (
            <div>
                <h2>{this.props.values.name}</h2>
              <Button type='default' >Editar</Button>
              <Button type='danger' >Excluir</Button>
              
            </div>
          );
        return(
            <div>
                <Popover content={content} placement='right' title="Ações" trigger='click' >
                    <Button type="default">Mais</Button>
                </Popover>
            </div>
        )
    }
}