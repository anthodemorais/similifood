import React, { Component } from 'react';
import Login from './Login';
import '../../styles/auth.css'
import SignUp from './SignUp';

export default class Auth extends Component {

    render() {
        return (
            <div>
                <SignUp/>
                <Login/>
            </div>
            
        )
    }

}