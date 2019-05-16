import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Footer from '../general/Footer'
import Products from "../products/Products"
import Product from "../products/Product"
import UserInfo from "../account/Profile"
import UpdatePassword from "../account/UpdatePassword"
import UpdateUser from "../account/UpdateUsername"
import Auth from "../login/Auth"
import Panier from "../productsPayment/Panier"
import Pay from "../productsPayment/Payment"
import Avis from "../avis/Avis"
import Conseils from "../advices/Conseil"
import Concept from "../concept/Concept"
import Header from "../general/Header";
import Home from "../accueil/Home";


export default class Routing extends Component {
  render() {
    return (
    
        <Router>
            {/* Pages du site */}
            {/* Components qui seront sur toutes les pages */}
            <Route path={`/`} component={Header}/>
            {/* page d'accueuil */}
            <Route exact="exact" path={`/`} component={Home}/>
            {/* page d'articles */}
            <Route exact="exact" path={`/products`} component={Products}/>
            <Route exact="exact" path={`/products/id`} component={Product}/>
            {/* infos utilisateurs */}
            <Route exact="exact" path={`/user/me`} component={UserInfo}/>
            <Route exact="exact" path={`/user/me/update/password`} component={UpdatePassword}/>
            <Route exact="exact" path={`/user/me/update/username`} component={UpdateUser}/>
            {/* Connexion */}
            <Route exact="exact" path={`/auth`} component={Auth}/>
            {/* panier */}
            <Route exact="exact" path={`/user/articles`} component={Panier}/>
            {/* payer */}
            <Route exact="exact" path={`/pay`} component={Pay}/>
            {/* avis */}
            <Route exact="exact" path={`/feedbacks`} component={Avis}/>
            {/* conseils */}
            <Route exact="exact" path={`/advices`} component={Conseils}/>
            {/* concept */}
            <Route exact="exact" path={`/concept`} component={Concept}/>
            <Route path={`/`} component={Footer}/>
        </Router>
    );
  }
}

