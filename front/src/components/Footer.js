import React, { Component } from 'react';
import '../styles/footer.css';
import fb from '../styles/ICONES/FACEBOOK.svg';
import insta from '../styles/ICONES/INSTAGRAM.svg';
import twitter from '../styles/ICONES/TWITTER.svg';
import delivery from '../styles/ICONES/DELIVERY.svg';
import chrono from '../styles/ICONES/24H.svg';
import paypal from '../styles/ICONES/PAYPAL.svg';
import visa from '../styles/ICONES/VISA.svg';
import logo from '../styles/ICONES/LOGO BLANC.svg';

export default class Footer extends Component {
    render() {
        return (
            <footer class="latest">
                <div class="first">
                    <div class="follow">
                        <h4>Suivez-nous !</h4>
                        <img class="fac" src={fb} alt="Logo de Facebook"/>
                        <img class="int" src={insta} alt="Logo d'Instagram"/>
                        <img class="twi" src={twitter} alt="Logo de Twitter"/>
                    </div>
                    <div class="delivery">
                        <h4>Livraison rapide !</h4>
                        <img class="transport" src={delivery} alt="Icône symbolisant la livraison à domicile"/>
                        <img class="time" src={chrono} alt="Icône indiquant que la livraison se fait en 24 heures"/>
                    </div>
                    <div class="payment">
                        <h4>Paiement sécurisé !</h4>
                        <img class="pp" src={paypal} alt="Icône indiquant que nous acceptons PayPal en moyen de paiement"/>
                        <img class="visa" src={visa} alt="Icône indiquant que nous acceptons les cartes bleues Visa en moyen de paiement"/>
                    </div>
                </div>
                <hr/>
                <div class="second">
                    <div id="compte">
                        <span class="compte title">Mon compte</span>
                        <div>
                            <span class="panier">Mon panier</span>
                            <span class="info">Mes informations</span>
                            <span class="conf">Confidentialité</span>
                        </div>
                    </div>
                    <div id="menu">
                        <span class="menu title">Menu</span>
                        <div>
                            <span class="box">Box</span>
                            <span class="concept">Concept</span>
                            <span class="avis">Avis</span>
                            <span class="contact">Contact</span>
                        </div>
                    </div>
                    <div id="propos">
                        <span class="propos title">&Agrave; propos</span>
                        <div>
                            <span class="team">L’&eacute;quipe</span>
                            <span class="presse">Presse</span>
                            <span class="accessibility">Accessibilit&eacute;</span> 
                        </div>
                    </div>
                    <div id="contact">
                        <span class="contact title">Contact</span>
                        <span class="mail">contact-miam@miam.fr</span>
                    </div>
                    <img src={logo} alt="Logo de notre site"/>
                </div>
                <hr/>
                <div class="flex legal">
                    <span class="span">Conditions générales de vente</span>
                    <span class="span">Mentions légales</span>
                    <span class="span">&copy;2019 - Miam | tous droits réservés</span>
                </div>
            </footer>
        )
    }
}