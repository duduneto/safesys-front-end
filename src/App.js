import React, { Component } from 'react';

// import LoginForm from './features/login/';
import './App.css';
// import { Row, Col } from 'antd';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
// import DefaultPage from './layouts/DefaultPage';
// import SpaceHeader from './components/login/spaceHeader'

import LoginOrDefault from './layouts/LoginOrDefault';


class App extends Component {

  render() {
    return (
        
            <div>
              <BrowserRouter>
                <div>
                  
                  <Route path="/" component={LoginOrDefault} />
                  <Redirect from='*' to='/' />
                </div>
              </BrowserRouter>
            </div>
                
    )
  }
}

export default App;
