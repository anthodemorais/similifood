import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/header.css';
import logo from '../../styles/ICONES/LOGO COULEUR.svg';
import bag from '../../styles/ICONES/BAG.svg';
import home from '../../styles/ICONES/HOME.svg';
import logout from '../../styles/ICONES/LOG_OUT.svg';
import accessibility from '../../styles/ICONES/ACCESSIBILITY.svg';
import api from '../../services/api';

export default class Header extends Component {

    displayAuth() {
        if (api.isConnected) {
            return (
                <div>
                    <div className="panier">
                        <NavLink to={`/panier`} className="blod cap">
                            <img className="imgbag" src={bag} alt="Logo symbolisant le panier du client"/>
                            panier
                        </NavLink>
                    </div>
                    <div className="moncompte blod">                    
                        <NavLink to={`/user/me`} className="blod cap">
                            <img className="imghome" src={home} alt="Icône symbolisant la page de compte de l'utilisateur"/>
                            mon compte
                        </NavLink>
                    </div>
                    <div className="decon blod">
                        <NavLink to={`/user/disconnect`} className="blod cap">
                            <img className="imglogout" src={logout} alt="Icône symbolisant la déconnexion"/>
                            déconnexion
                        </NavLink>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className="auth">
                        <NavLink to={`/auth`} className="blod cap">
                            Bonjour, identifiez-vous
                        </NavLink>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <header>
                <menu>
                    <ul className="flex">
                        <li className="box"><NavLink to={`/products`} className="blod cap">box</NavLink></li>
                        <li className="concept"><NavLink to={`/concept`} className="blod cap">concept</NavLink></li>
                        <li className="avis"><NavLink to={`/feedbacks`} className="blod cap">avis</NavLink></li>
                        <li className="contact"><NavLink to={`/contact`} className="blod cap">contact</NavLink></li>
                    </ul>
                </menu>
                <img className="logotop" src={logo} alt="Logo de notre site"/>
                {this.displayAuth()}
                <button className="accessibilityIcon">
                    <img src={accessibility} alt="Icône d'accessibilité aux malvoyants"/>
                </button>
            </header>
        )
    }
}