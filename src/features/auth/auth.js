import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { login, signup } from './authActions';


class Auth extends Comment{

    constructor(props){
        super(props);
        this.state = { loginMode: true }
    }

    
}