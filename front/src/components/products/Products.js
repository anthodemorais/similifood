import React, { Component } from 'react';
import api from "../../services/api";

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }
    
    componentDidMount() {
        this.getProducts()
    }

    getProducts() {
        api.getProducts().then((products) => {
            console.log(products);
            this.setState({products: products});
        })
    }

    displayProducts() {
        var list = [];
        this.state.products.forEach((product) => {
            list.push(this.displayProduct(product));
        })

        return list;
    }

    displayProduct(product) {
        return (
            <div className="product" key={product.id_box}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <strong>{product.price}€</strong>
            </div>
        )
    }

    render() { 
        return ( 
            <div className="products">
                {this.displayProducts()}
            </div>
         );
    }
}