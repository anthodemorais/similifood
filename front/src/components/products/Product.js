import React, { Component } from 'react';
import api from '../../services/api';
import Payment from '../productsPayment/Payment';
import {Elements, StripeProvider} from 'react-stripe-elements';

export default class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            clientSecret: ""
        };
        this.getProduct();
    }

    getProduct() {
        const id = this.props.match.params.id
        api.getProductById(id).then(product => {
            this.setState({product: product[0]});
        })
    }

    render() { 
        return (
            <div className="viewBox container">
                <h2>{this.state.product.name}</h2>
                <p>{this.state.product.description}</p>
                <strong>{this.state.product.price}€</strong>
                <button className="important">Acheter</button>
                <StripeProvider apiKey="pk_test_xUMmKTnmihV6GYUIJTMESQAz">
                    <div className="example">
                        <Elements>
                            <Payment price={this.state.product.price} />
                        </Elements>
                    </div>
                </StripeProvider>
            </div>
        );
    }
}