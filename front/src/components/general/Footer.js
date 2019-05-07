import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/footer.css';
import fb from '../../styles/ICONES/FACEBOOK.svg';
import insta from '../../styles/ICONES/INSTAGRAM.svg';
import twitter from '../../styles/ICONES/TWITTER.svg';
import delivery from '../../styles/ICONES/DELIVERY.svg';
import chrono from '../../styles/ICONES/24H.svg';
import paypal from '../../styles/ICONES/PAYPAL.svg';
import visa from '../../styles/ICONES/VISA.svg';
import logo from '../../styles/ICONES/LOGO BLANC.svg';

export default class Footer extends Component {
    render() {
        return (
            <footer className="latest">
                <div className="first">
                    <div className="follow">
                        <h4>Suivez-nous !</h4>
                        <NavLink to={`https://fr-fr.facebook.com/`}>
                            <img className="fac" src={fb} alt="Logo de Facebook"/>
                        </NavLink>
                        <NavLink to={`https://www.instagram.com`}>
                            <img className="int" src={insta} alt="Logo d'Instagram"/>
                        </NavLink>
                        <NavLink to={`https://twitter.com`}>
                            <img className="twi" src={twitter} alt="Logo de Twitter"/>
                        </NavLink>
                    </div>
                    <div className="delivery">
                        <h4>Livraison rapide !</h4>
                        <img className="transport" src={delivery} alt="Icône symbolisant la livraison à domicile"/>
                        <img className="time" src={chrono} alt="Icône indiquant que la livraison se fait en 24 heures"/>
                    </div>
                    <div className="payment">
                        <h4>Paiement sécurisé !</h4>
                        <img className="pp" src={paypal} alt="Icône indiquant que nous acceptons PayPal en moyen de paiement"/>
                        <img className="visa" src={visa} alt="Icône indiquant que nous acceptons les cartes bleues Visa en moyen de paiement"/>
                    </div>
                </div>
                <hr/>
                <div className="second">
                    <div id="compte">
                        <span className="compte title">Mon compte</span>
                        <div>
                            <NavLink to={`/panier`} className="panier">Mon panier</NavLink>
                            <NavLink to={`/users/me`} className="info">Mes informations</NavLink>
                            <NavLink to={`/cgu`} className="conf">Confidentialité</NavLink>
                        </div>
                    </div>
                    <div id="menu">
                        <span className="menu title">Menu</span>
                        <div>
                            <NavLink to={`/products`} className="box">Box</NavLink>
                            <NavLink to={`/concept`} className="concept">Concept</NavLink>
                            <NavLink to={`/feedback`} className="avis">Avis</NavLink>
                            <NavLink to={`/contact`} className="contact">Contact</NavLink>
                        </div>
                    </div>
                    <div id="propos">
                        <span className="propos title">&Agrave; propos</span>
                        <div>
                            <NavLink to={`/contact`} className="team">L’&eacute;quipe</NavLink>
                            <NavLink to={`/contact`} className="presse">Presse</NavLink>
                            <NavLink to={`/accessibility`} className="accessibility">Accessibilit&eacute;</NavLink> 
                        </div>
                    </div>
                    <div id="contact">
                        <span className="contact title">Contact</span>
                        <span className="mail">contact-miam@miam.fr</span>
                    </div>
                    <img src={logo} alt="Logo de notre site"/>
                </div>
                <hr/>
                <div className="flex legal">
                    <span className="span">Conditions générales de vente</span>
                    <span className="span">Mentions légales</span>
                    <span className="span">&copy;2019 - Miam | tous droits réservés</span>
                </div>
            </footer>
        )
    }
}