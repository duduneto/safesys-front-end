import React, { Component } from 'react';

import LoginForm from './features/login/';
import './App.css';
// import { Row, Col } from 'antd';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import DefaultPage from './layouts/DefaultPage';
// import SpaceHeader from './components/login/spaceHeader'
import Test from './features/test';


class App extends Component {

  render() {
    return (
        
            <div>
              <DefaultPage />

            </div>
                
    )
  }
}

export default App;
