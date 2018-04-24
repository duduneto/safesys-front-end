import React, { Component } from 'react';
import { List, Avatar, Button, Spin, Table, Icon, Divider, Collapse, Select, Input } from 'antd';
import axios from 'axios';
import urls from '../../common/urls';
import UsuarioMais from './usuarioMais';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUsuarios, filtraUsuarios, limpaPesquisaUsuarios, setUsuarioMais } from './actions/usersActions';

import { withRouter } from 'react-router-dom';

const { Column, ColumnGroup } = Table;
const Panel = Collapse.Panel;
const Option = Select.Option;
const Search = Input.Search;

class ListUsers  extends Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.limpaPesquisa = this.limpaPesquisa.bind(this);
        this.handleMais = this.handleMais.bind(this);
        this.state={ pesquisarPor: undefined, disableNome: true, disableCPF: true }
        
    }

    handleChange(value){
      if(value == 'Nome'){
          this.setState({disableNome: false, disableCPF: true});
      } if(value == 'CPF'){
          this.setState({disableCPF: false, disableNome: true});
      }
  }

  limpaPesquisa(){
    document.getElementById('inputPesquisarCPF').value = '';
    document.getElementById('inputPesquisarNome').value = '';
    
    this.props.limpaPesquisaUsuarios(this.props.usuarios);
    
}

  handleMais(value){
    this.props.setUsuarioMais(value);
    this.props.history.push('/perfilUser');
  }

    componentDidMount(){
      // const token = localStorage.getItem('token');
      axios.get(`${urls.OAPI_URL}/usuario`)
      .then( resp => {
        this.props.setUsuarios(resp.data);
      })
      .catch( err => {
        console.log(err)
      })
    }

    render() {
        return(
          <div>

            <Collapse>
              <Panel header="Pesquisar" showArrow={false} >
                <Select
                  id='pesquisarPor'
                  style={{ width: 200 }}
                  placeholder="Pesquisar Por"
                  onChange={this.handleChange}
                  className='espacamento'
                >
                  <Option value="Nome">Nome</Option>
                  <Option value="CPF">CPF</Option>
                </Select>

                <Search
                  id='inputPesquisarNome'

                  disabled={this.state.disableNome}
                  placeholder="Nome do Cliente"
                  onSearch={value => {
                    let arrayClone = this.props.usuariosClone
                    let array = [];
                    let expressaoRegular = new RegExp(value, 'i');
                    if (value.length > 0) {
                      arrayClone.forEach(element => {

                        if (expressaoRegular.test(element.name)) {
                          console.log(element)
                          array.push(element)
                        }
                      });
                      console.log(array)
                      this.props.filtraUsuarios(array);


                    } else {
                      this.props.limpaPesquisaUsuarios(this.props.usuarios);
                    }
                  }
                  }
                  enterButton
                />


                <Search
                  id='inputPesquisarCPF'

                  disabled={this.state.disableCPF}
                  placeholder="Digite o CPF"
                  onSearch={value => {
                    let arrayClone = this.props.usuariosClone
                    let array = [];
                    let expressaoRegular = new RegExp(value);
                    arrayClone.forEach(element => {
                      if (expressaoRegular.test(element.cpf)) {

                        array.push(element)
                      }
                    })
                    this.props.filtraUsuarios(array);
                  }
                  }
                  enterButton
                />
                <Button type='default' onClick={this.limpaPesquisa} >Restaurar</Button>
              </Panel>
            </Collapse>

            <Table dataSource={this.props.usuariosClone} scroll={{ x: 500 }} >

              <Column
                title=""
                dataIndex="action"
                key='action'
                render={(text, record) => (

                  // <Button type='default' onClick={() => {this.handleMais(record)}} >Mais</Button>
                  <UsuarioMais values={record} />
                )}

              />
              <Column
                title="Nome"
                dataIndex="name"
                key="name"
              />

              <Column
                title="CPF"
                dataIndex="cpf"
                key="cpf"
              />



            </Table>
          </div>
        )
    }
 
  
}
const ListUsersWithRouter = withRouter(ListUsers)

const mapStateToProps = state => ({ 
  usuarios: state.usuarios.usuarios,
  usuariosClone: state.usuarios.usuariosClone
})

const mapDispatchToProps = dispatch => bindActionCreators({setUsuarios, filtraUsuarios, limpaPesquisaUsuarios, setUsuarioMais}, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(ListUsersWithRouter)