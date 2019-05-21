import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Footer from '../general/Footer'
import Products from "../products/Products"
import Product from "../products/Product"
import UserInfo from "../account/Profile"
import UpdatePassword from "../account/UpdatePassword"
import UpdateUser from "../account/UpdateUsername"
import Panier from "../productsPayment/Panier"
import Pay from "../productsPayment/Payment"
import Avis from "../avis/Avis"
import Conseils from "../advices/Conseil"
import Concept from "../concept/Concept"
import Header from "../general/Header";
import Home from "../accueil/Home";
import SignUp from "../login/SignUp";
import Login from "../login/Login";


export default class Routing extends Component {
  render() {
    return (
    
        <Router>
            {/* Pages du site */}
            {/* Components qui seront sur toutes les pages */}
            <Route path={`/`} component={Header}/>
            {/* page d'accueuil */}
            <Route exact path={`/`} component={Home}/>
            {/* page d'articles */}
            <Route exact path={`/products`} component={Products}/>
            <Route exact path={`/products/:id`} component={Product}/>
            {/* infos utilisateurs */}
            <Route exact path={`/user/me`} component={UserInfo}/>
            <Route exact path={`/user/me/update/password`} component={UpdatePassword}/>
            <Route exact path={`/user/me/update/username`} component={UpdateUser}/>
            {/* Connexion */}
            <Route exact path={`/auth`} component={Login}/>
            <Route exact path={`/auth/new`} component={SignUp}/>
            {/* panier */}
            <Route exact path={`/user/articles`} component={Panier}/>
            {/* payer */}
            <Route exact path={`/payment`} component={Pay}/>
            {/* avis */}
            <Route exact path={`/feedbacks`} component={Avis}/>
            {/* conseils */}
            <Route exact path={`/advices`} component={Conseils}/>
            {/* concept */}
            <Route exact path={`/concept`} component={Concept}/>
            <Route path={`/`} component={Footer}/>
        </Router>
    );
  }
}

