import React, { Component } from 'react';
import  { NavLink } from 'react-router-dom';
import api from "../../services/api";
import '../../styles/products.css';

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
        this.getProducts()
    }

    getProducts() {
        api.getProducts().then((products) => {
            console.log(products);
            this.setState({products: products});
        })
    }

    render() { 
        return (
            <div className="boxes container">
                {this.state.products.map((product) => (
                    <div className="box" key={product.id_box}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <strong>{product.price}€</strong>
                        <NavLink to={`/products/${product.id_box}`}>
                            <button className="important">Voir le produit</button>
                        </NavLink>
                    </div>   
                ))}
            </div>
         );
    }
}