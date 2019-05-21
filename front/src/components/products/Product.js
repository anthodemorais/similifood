import React, { Component } from 'react';
import api from '../../services/api';

export default class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {}
        };
        this.getProduct();
    }

    getProduct() {
        const id = this.props.match.params.id
        api.getProductById(id).then(product => this.setState({product: product[0]}))
    }

    render() { 
        return (
            <div className="viewBox container">
                <h2>{this.state.product.name}</h2>
                <p>{this.state.product.description}</p>
                <strong>{this.state.product.price}€</strong>
            </div>
        );
    }
}