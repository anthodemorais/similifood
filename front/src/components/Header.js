import React, { Component } from 'react';
import '../styles/header.css';
import logo from '../styles/ICONES/LOGO COULEUR.svg';
import bag from '../styles/ICONES/BAG.svg';
import home from '../styles/ICONES/HOME.svg';
import logout from '../styles/ICONES/LOG_OUT.svg';
import accessibility from '../styles/ICONES/ACCESSIBILITY.svg';

export default class Header extends Component {
    render() {
        return (
            <header>
                <menu>
                    <ul class="flex">
                        <li class="box blod cap">box</li>
                        <li class="concept blod cap">concept</li>
                        <li class="avis blod cap">avis</li>
                        <li class="contact blod cap">contact</li>
                    </ul>
                </menu>
                <img class="logotop" src={logo} alt="Logo de notre site"/>
                <div>
                    <div class="panier blod">
                        <img class="imgbag" src={bag} alt="Logo symbolisant le panier du client"/>
                        Panier
                    </div>
                    <div class="moncompte blod">
                        <img class="imghome" src={home} alt="Icône symbolisant la page de compte de l'utilisateur"/>
                        Mon compte
                    </div>
                    <div class="decon blod">
                        <img class="imglogout" src={logout} alt="Icône symbolisant la déconnexion"/>
                        Déconnexion
                    </div>
                </div>
                <button class="accessibilityIcon">
                    <img src={accessibility} alt="Icône d'accessibilité aux malvoyants"/>
                </button>
            </header>
        )
    }
}