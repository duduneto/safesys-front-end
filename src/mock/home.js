import axios from 'axios';
import urls from '../common/urls';

export function getProcessosPendentes(){

  const arrayPendentes = [];

  axios.get(`${urls.API_URL}/contratos`)
      .then( resp => {
          // console.log(resp.data);
          resp.data.map( processo => {
              if(processo.confirm_processo === false){
                  arrayPendentes.push(processo);
              
              }
              
              
          })


      }).catch(err => {
          console.log(err);
      });
      return arrayPendentes;
  
}

export function getProcessosConfirmados(){

  const arrayConfirmados = [];

  axios.get(`${urls.API_URL}/contratos`)
      .then( resp => {
          // console.log(resp.data);
          resp.data.map( processo => {
              if(processo.confirm_processo === true){
                  arrayConfirmados.push(processo);
              
              }
              
              
          })


      }).catch(err => {
          console.log(err);
      });
      return arrayConfirmados;
  
}


