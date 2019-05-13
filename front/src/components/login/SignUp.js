import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import api from '../../services/api';

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            password_conf: "",
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
        if (this.state.password === this.state.password_conf) {
            api.register(this.state.email, this.state.password).then((result) => {
                console.log(result);
                this.setState({
                    redirect: true
                });
            });
        }
    }

    render() { 
        return (
            <div className="authContainer">
                <h2>Sign Up</h2>
                <form method="POST" onSubmit={(e) => {this.submit(e)}}>
                    <label>Email: <br/><input type="email" name="email" onChange={e => this.inputChanged(e)} /></label>
                    <label>Password: <br/><input type="password" name="password" onChange={e => this.inputChanged(e)} /></label>
                    <label>Password Confirmation: <br/><input type="password" name="password_conf" onChange={e => this.inputChanged(e)} /></label>
                    <input type="submit" name="signup" value="S'inscrire" className="important"/>
                </form>
                {this.renderRedirect()}
            </div>
        );
    }
}