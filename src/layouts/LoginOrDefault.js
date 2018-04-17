import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import urls from '../common/urls'

import DefaultPage from './DefaultPage';
import LoginForm from '../features/login';
// import { validateToken } from '../features/auth/authActions';


class LoginOrDefault extends Component{

    constructor(props){
        super(props);

        this.state = { logado: false };
        this.validateToken = this.validateToken.bind(this);
    }

    validateToken(token){
        
            axios.post(`${urls.OAPI_URL}/validateToken`, { token })
                .then(resp => {
                    if(resp.data.valid === true){
                        console.log('Token Validado')
                        console.log(resp.data.valid)
                        this.setState({logado : true})
                    }else{
                        console.log("Token não validado");
                        localStorage.removeItem('token');
                        this.setState({logado: false})
                    }
                })
                .catch(err => console.log(err));
        
    }

    componentWillMount() {

        const myToken = localStorage.getItem('token');
        this.validateToken(myToken);


        // if(this.props.auth.user){
        //     this.props.validateToken(this.props.auth.user.token)
        // }
    }

    render() {

        if(this.state.logado === false){
            return <LoginForm />
        } else {
            return <DefaultPage />
        }

    //     const { user, validToken } = this.props.auth;

    //     if( user && validToken ){
    //         axios.defaults.headers.common['authorization'] = user.token;
    //         return <DefaultPage />;
    //     } else if(!user && !validToken){
    //         return <LoginForm />;
    //     }else{
    //         return false;
    //     }

    }
}

// const mapStateToProps = state => ({ auth: state.auth });
// const mapDispatchToProps = dispatch => bindActionCreators( { validateToken }, dispatch);
// export default connect(mapStateToProps, mapDispatchToProps)(LoginOrDefault);
export default LoginOrDefault;