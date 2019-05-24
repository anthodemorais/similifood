import React, { Component } from 'react';
import api from '../../services/api';
import Payment from '../productsPayment/Payment';
import {Elements, StripeProvider} from 'react-stripe-elements';
import AddFeedback from '../avis/AddFeedback';

export default class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            clientSecret: "",
            paymentIntent: false,
            addedToCart: false,
            message: ""
        };
        this.getProduct();
    }

    getProduct() {
        const id = this.props.match.params.id
        api.getProductById(id).then(product => {
            this.setState({product: product[0]});
        })
    }

    displayPayment() {
        if (this.state.paymentIntent && localStorage.getItem("token") !== null) {
            return (
                <StripeProvider apiKey="pk_test_xUMmKTnmihV6GYUIJTMESQAz">
                    <div className="example">
                        <Elements>
                            <Payment price={this.state.product.price} box_id={this.props.match.params.id} />
                        </Elements>
                    </div>
                </StripeProvider>
            )
        }
        else if (this.state.paymentIntent && localStorage.getItem("token") === null) {
            if (this.state.message !== "Vous devez être connecté pour acheter")
            this.setState({ message: "Vous devez être connecté pour acheter" });
        }
    }

    addToCart() {
        if (localStorage.getItem("token") !== null) {
            let cart = localStorage.getItem("cart");

            if (cart === null) {
                localStorage.setItem("cart", JSON.stringify(this.state.product));
            }
            else {
                let newCart = cart + JSON.stringify(this.state.product)
                console.log(newCart);
                localStorage.setItem("cart", newCart);
            }
    
            this.setState({addedToCart: true});
        }
        else {
            this.setState({ message: "Vous devez être connecté pour ajouter au panier" });
        }
    }

    displayMessage() {
        return (
            <span>{this.state.message}</span>
        )
    }

    render() { 
        return (
            <div className="viewBox container">
                <h2>{this.state.product.name}</h2>
                <p>{this.state.product.description}</p>
                <strong>{this.state.product.price}€</strong>
                <button className="important" onClick={() => this.setState({paymentIntent: true})}>Acheter</button>
                <span>OU</span>
                <button onClick={() => this.addToCart()}>Ajouter au panier</button>
                {this.displayPayment()}
                {this.displayMessage()}
                <AddFeedback box_id={this.props.match.params.id} />
            </div>
        );
    }
}