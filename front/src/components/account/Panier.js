import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import cartIcon from '../../styles/ICONES/BAG.svg'
import '../../styles/panier.css';

class Panier extends Component {

    getCart() {
        console.log(localStorage.getItem("cart"))
        let cart = localStorage.getItem("cart");
        if (cart === null) {
            return (
                <div>
                    <img src={cartIcon} alt="icone représentant le panier de l'utilisateur" />
                    <h2>Votre panier est actuellement vide...</h2>
                    <NavLink to={`/products`}>
                        <button className="important">Voir les produits</button>
                    </NavLink>
                </div>
            )
        }
        else {
            cart = JSON.stringify(cart)
        }
    }

    render() { 
        return (
            <div className="container cartPage">
                {this.getCart()}
            </div>
        );
    }
}
 
export default Panier;