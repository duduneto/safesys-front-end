import { notification } from 'antd';

export function connectionFail(){
    notification.config({
        placement: 'bottomRight',
        bottom: 50,
        duration: 3,
      });

    notification.open({
        className:'CadastroFail',
        message: 'ERRO',
        description:'Ocorreu algum erro na Requisição',
        duration: 2.25
    });
}