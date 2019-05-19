import React, { Component } from 'react';
import  { Redirect, NavLink } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/auth.css'
import seePwd from '../../styles/ICONES/ICONE_VOIR.svg'

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            redirect: false,
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
                <div className="formContainer formLog">
                    <h2>Identifiez-vous !</h2>
                    <form method="POST" onSubmit={(e) => {this.submit(e)}}>
                        <label>Email: <br/><input type="text" name="email" onChange={e => this.inputChanged(e)} /></label>
                        <label>Password: <br/>
                            <input type="password" name="password" onChange={e => this.inputChanged(e)} />
                            <img className="seePwd" src={seePwd} alt="Cliquez pour voir le mot de passe" />
                        </label>
                        <button type="submit" name="login" className="important">Se Connecter</button>
                        <label for="remember">
                            <input type="checkbox" name="remember" />
                            Se souvenir de moi
                        </label>
                        <NavLink to={`/auth/forgot`} className="forgot">
                            Mot de passe oublié ?
                        </NavLink>
                    </form>
                    {this.renderRedirect()}
                    <div className="move">
                        <strong>Nouveau client ?</strong>
                        <NavLink to={`/auth/new`}>
                            <button id="insc" className="signup">
                                Inscrivez-vous                        
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}