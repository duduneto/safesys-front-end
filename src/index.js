import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { applyMiddleware, createStore } from 'redux';
import promise from 'redux-promise';
import { Provider } from 'react-redux';
import reducers from './common/reducers';


const middleware = applyMiddleware(promise)
const store = createStore(reducers, middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());



ReactDOM.render(
    
    <Provider store={store} >
        <App />
    </Provider >
    
    , document.getElementById('root'));
registerServiceWorker();
