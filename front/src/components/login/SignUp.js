import React, { Component } from 'react';
import  { Redirect, NavLink } from 'react-router-dom';
import api from '../../services/api';
import seePwd from '../../styles/ICONES/ICONE_VOIR.svg';
import '../../styles/uikit.css';
import '../../styles/auth.css';

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            password_conf: "",
            name: "",
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
            <div className="authContainer container">
                <div className="formContainer formSign container">
                    <h2>Inscrivez-vous !</h2>
                    <form method="POST" onSubmit={(e) => {this.submit(e)}}>
                        <label>Nom et Prénom: <br/><input type="text" name="name" onChange={e => this.inputChanged(e)} /></label>
                        <label>Email: <br/><input type="email" name="email" onChange={e => this.inputChanged(e)} /></label>
                        <label>Password: <br/>
                            <input type="password" name="password" onChange={e => this.inputChanged(e)} />
                            <img className="seePwd" src={seePwd} alt="Cliquez pour voir le mot de passe" />
                        </label>
                        <label>Password Confirmation: <br/>
                            <input type="password" name="password_conf" onChange={e => this.inputChanged(e)} />
                            <img className="seePwd" src={seePwd} alt="Cliquez pour voir le mot de passe" />
                        </label>
                        <button type="submit" name="signup" className="important">S'inscrire</button>
                    </form>
                    {this.renderRedirect()}
                    <div className="move">
                        <strong>Déjà client ?</strong>
                        <NavLink to={`/auth`}>
                            <button id="co" className="login">
                                Connectez-vous                      
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}