import React, { Component } from 'react';
import api from '../../services/api';
import '../../styles/auth.css'

export default class Auth extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }

    emailChanged(e) {
        this.setState({
            email: e.target.value
        })
    }

    passwordChanged(e) {
        this.setState({
            password: e.target.value
        })
    }

    submit(e) {
        e.preventDefault();
        api.getToken(this.state.email, this.state.password).then((result) => {
            console.log(result);
        });
    }

    render() { 
        return (
            <div className="authContainer">
                <form method="POST" onSubmit={(e) => {this.submit(e)}}>
                    <label>Email: <br/><input type="text" name="email" onChange={e => this.emailChanged(e)} /></label>
                    <label>Password: <br/><input type="password" name="password" onChange={e => this.passwordChanged(e)} /></label>
                    <button className="important">Se Connecter</button>
                </form>
            </div>
        );
    }
}