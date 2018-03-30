import { notification } from 'antd';

export function cadastroSuccess(){
    notification.config({
        placement: 'bottomRight',
        bottom: 50,
        duration: 3,
      });

    notification.open({
        className:'NotificationSuccess',
        message: 'Cadastro com Sucesso',
        duration: 2.25
    });
}

export function cadastroFail(){
    notification.config({
        placement: 'bottomRight',
        bottom: 50,
        duration: 3,
      });

    notification.open({
        className:'NotificationFail',
        message: 'ERRO',
        description:'Ocorreu algum erro na Requisição',
        duration: 2.25
    });
}

export function processoSuccess(texto, subtexto){
    notification.config({
        placement: 'bottomRight',
        bottom: 50,
        duration: 3,
      });

    notification.open({
        className:'ProcessoConfirmado',
        message: texto,
        description: subtexto,
        duration: 2.25
    });
}