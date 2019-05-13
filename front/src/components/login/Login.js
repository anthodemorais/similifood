import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import api from '../../services/api';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            redirect: false
        }
    }

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to='/'/>
        }
    }

    inputChanged(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit(e) {
        e.preventDefault();
        api.getToken(this.state.email, this.state.password).then((result) => {
            console.log(result);
            this.setState({
                redirect: true
            });
        });
    }

    render() { 
        return (
            <div className="authContainer">
                <h2>Login</h2>
                <form method="POST" onSubmit={(e) => {this.submit(e)}}>
                    <label>Email: <br/><input type="text" name="email" onChange={e => this.inputChanged(e)} /></label>
                    <label>Password: <br/><input type="password" name="password" onChange={e => this.inputChanged(e)} /></label>
                    <input type="submit" name="login" value="Se Connecter" className="important"/>
                </form>
                {this.renderRedirect()}
            </div>
        );
    }
}