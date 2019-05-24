import React, { Component } from 'react';
import  { NavLink } from 'react-router-dom';
import api from "../../services/api";
import '../../styles/products.css';

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            MaxPrice: 0,
            pet: "",
        }
        this.getProducts()
    }

    componentDidMount() {
        if (sessionStorage.getItem("pet") !== null) {
          this.setState({pet: sessionStorage.getItem("pet")});
        }
        if (sessionStorage.getItem("price") !== null) {
          this.setState({MaxPrice: sessionStorage.getItem("price")});
        }
        this.loadProducts();
      }
    
      handleChange(event) {
        console.log(event.target.value);
        sessionStorage.setItem("pet", event.target.value);
        this.setState({pet: event.target.value});
        this.loadProducts();
      }
    
      handlePrice(event) {
        console.log(event);
        sessionStorage.setItem("price", event.target.value);
        this.setState({MaxPrice: event.target.value});
        this.loadProducts();
      }
      showAllProducts() {
        sessionStorage.removeItem("price");
        sessionStorage.removeItem("pet");
        this.setState({MaxPrice: 0});
        this.setState({pet: ""});
        this.loadProducts();
      }
    
      loadProducts() {
        api.getProducts().then(products => {
          console.log(products);
          if (this.state.MaxPrice !== 0) {
            products = products.filter(product => product.price <= this.state.MaxPrice);
          }
          if (this.state.pet !== "") {
            products = products.filter(product => product.animal === this.state.pet);
          }
    
          this.setState({products: products});
        });
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
                <label for="category-select">Choose a category:</label>
                <select id="category-select" value={this.state.value} onChange={event => {
                    this.handleChange(event);
                    }}>
                    <option value="chien">Chien</option>
                    <option value="chat">Chat</option>
                </select>
                <label for="category-selected">Limite de prix:</label>
                <select id="category-selected" value={this.state.value} onChange={event => {
                    this.handlePrice(event);
                    }}>
                    <option value="10">10€</option>
                    <option value="20">20€</option>
                    <option value="30">30€</option>
                    <option value="40">40€</option>
                    <option value="50">50€</option>
                    <option value="60">60€</option>
                    <option value="70">70€</option>
                    <option value="80">80€</option>
                </select>
                <button onClick={() => {
                    this.showAllProducts();
                    }}>
                    Enlever les filtres
                </button>
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