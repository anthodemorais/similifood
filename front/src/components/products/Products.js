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
            api.getRecipeById(1).then((recipes) => {
                console.log(recipes);
                this.setState({recipes: recipes})
            })
            console.log(products);
            this.setState({products: products});
        })
    }

    addToCart(product) {
        if (localStorage.getItem("token") !== null) {
            let cart = localStorage.getItem("cart");

            if (cart === null) {
                localStorage.setItem("cart", JSON.stringify(product));
            }
            else {
                let newCart = cart + JSON.stringify(product)
                console.log(newCart);
                localStorage.setItem("cart", newCart);
            }
    
            this.setState({addedToCart: true});
        }
    }

    render() { 
        return (
            <div className="container">
                <div className="productsTitle">
                    <h2>Adaptez son régime en fonction de nos catégories !</h2>
                    <button className="important" onClick={() => {
                        this.showAllProducts();
                        }}>
                        Toutes nos box
                    </button>
                </div>
                <div className="filters">
                    <div className="filter">
                        <label for="category-select">Votre animal:</label>
                        <select id="category-select" value={this.state.value} onChange={event => {
                            this.handleChange(event);
                            }}>
                            <option value="chien">Chien</option>
                            <option value="chat">Chat</option>
                        </select>
                    </div>
                    <div className="filter">
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
                    </div>
                </div>
                <div className="boxes container">
                    {this.state.products.map((product) => (
                        <div className="box" key={product.id_box}>
                            <div className="imgTitle">
                                <img src={require(`../../styles/IMAGES/${product.img_name}`)} alt={product.name} />
                                <h2>{product.name}</h2>
                            </div>
                            <div className="descButton">
                                <p>{product.description}</p>
                                <p>{product.price}€</p>
                                <NavLink to={`/products/${product.id_box}`}>
                                    Voir le produit
                                </NavLink>
                            </div>
                            <button className="important" onClick={(e) => this.addToCart(product)}>Ajouter au panier</button>
                        </div>   
                    ))}
                </div>
            </div>
         );
    }
}