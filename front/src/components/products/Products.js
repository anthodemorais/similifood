import React, { Component } from 'react';
import  { NavLink } from 'react-router-dom';
import api from "../../services/api";
import '../../styles/products.css';
import dog from "../../styles/IMAGES/DOG.png";
import cat from "../../styles/IMAGES/CAT.png";
import bannerCat from "../../styles/IMAGES/bannerCat.png";
import bannerDog from "../../styles/IMAGES/bannerDog.png";

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            MaxPrice: 0,
            pet: "",
            weight: '',
			fur: '',
			age: ''
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

      handleWeight(event) {
		console.log(event.target.value);
		sessionStorage.setItem('weight', event.target.value);
		this.setState({ weight: event.target.value });
		this.loadProducts();
	}
	handleFur(event) {
		sessionStorage.setItem('fur', event.target.value);
		this.setState({ fur: event.target.value });
		this.loadProducts();
	}
	handleAge(event) {
		sessionStorage.setItem('age', event.target.value);
		this.setState({ age: event.target.value });
		this.loadProducts();
	}

    showAllProducts() {
		sessionStorage.removeItem('price');
		sessionStorage.removeItem('pet');
		this.setState({ MaxPrice: 0 });
		this.setState({ pet: '' });
		this.setState({ weight: '' });
		this.setState({ fur: '' });
		this.setState({ age: '' });
		this.loadProducts();
	}
    
    loadProducts() {
		api.getProducts().then((products) => {
			if (this.state.MaxPrice !== 0) {
				products = products.filter((product) => product.price <= this.state.MaxPrice);
			}
			if (this.state.pet !== '') {
				products = products.filter((product) => product.animal === this.state.pet);
			}
			if (this.state.fur !== '') {
				products = products.filter((product) => product.fur === this.state.fur);
			}
			if (this.state.weight !== '') {
				products = products.filter((product) => product.weight === this.state.weight);
			}
			if (this.state.age !== '') {
				products = products.filter((product) => product.age === this.state.age);
			}

			console.log('test1');
			this.setState({ products: products });
		});
	}

    getProducts() {
        api.getProducts().then((products) => {
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
	
	goDog() {
		sessionStorage.setItem("pet", "chien");
		this.setState({pet: "chien"});
		this.loadProducts();
	}
	
	goCat() {
		sessionStorage.setItem("pet", "chat");
		this.setState({pet: "chat"});
		this.loadProducts();
	}

    render() {
		return (<div className="container productsContainer">
		  {
			this.state.pet === ""
			  ? (<div>
				<h2>Des boxs pour votre chien ou votre chat ??</h2>
				<div className="products  container">
				  <div>
					<div className="product">
					  <img src={dog} alt="Chien pour accéder aux produits proposés pour les chiens"/>
					  <button className="important productButton" onClick={event => {
						  this.goDog();
						}}>
						Chien
					  </button>
					</div>
					<div className="product">
					  <img src={cat} alt="Chien pour accéder aux produits proposés pour les chats"/>
					  <button className="important productButton" onClick={event => {
						  this.goCat();
						}}>
						Chat
					  </button>
					</div>
				  </div>
				</div>
			  </div>)
			  : (this.showBanner())
		  }
	
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
			  {
				this.state.pet === ""
				  ? <div/>
				  : this.showInput()
			  }
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
			<div className="filter">
			  <strong>En fonction du poids</strong>
			  <button value="souspoids" className="important" onClick={event => {
				  this.handleWeight(event);
				}}>
				en sous-poids
			  </button>
			  <button value="normal" className="important" onClick={event => {
				  this.handleWeight(event);
				}}>
				normal
			  </button>
			  <button value="surpoids" className="important" onClick={event => {
				  this.handleWeight(event);
				}}>
				en surpoids
			  </button>
			</div>
			<div className="filter">
			  <strong>En fonction de l'âge</strong>
			  <button value="adulte" className="important" onClick={event => {
				  this.handleAge(event);
				}}>
				adulte
			  </button>
			  <button value="bebe" className="important" onClick={event => {
				  this.handleAge(event);
				}}>
				bebe
			  </button>
			  <button value="senior" className="important" onClick={event => {
				  this.handleAge(event);
				}}>
				senior
			  </button>
			</div>
			<div className="filter">
			  <strong>En fonction du poil</strong>
			  <button value="long" className="important" onClick={event => {
				  this.handleFur(event);
				}}>
				poil long
			  </button>
			  <button value="court" className="important" onClick={event => {
				  this.handleFur(event);
				}}>
				poil court
			  </button>
			</div>
		  </div>
		  <div className="boxes container">
			{
			  this.state.products.map(product => (<div className="box" key={product.id_box}>
				<div className="imgTitle">
				  <img src={require(`../../styles/IMAGES/${product.img_name}`)} alt={product.name}/>
				  <h2>{product.name}</h2>
				</div>
				<div className="descButton">
				  <p>{product.description}</p>
				  <p>{product.price}€</p>
				  <NavLink to={`/products/${product.id_box}`}>
					Voir le produit
				  </NavLink>
				</div>
				<button className="important" onClick={e => this.addToCart(product)}>
				  Ajouter au panier
				</button>
			  </div>))
			}
		  </div>
		</div>);
	  }
	
	  showBanner() {
		if (this.state.pet === "chien") {
		  return (<img src={bannerDog} className="petBanner" alt="Bannière pour chat"/>);
		} else if (this.state.pet === "chat") {
		  return (<img src={bannerCat} className="petBanner" alt="Bannière pour chat"/>);
		}
	  }
	
	  showInput() {
		if (this.state.pet === "chien") {
		  return (<div>
			<div>Vous avez un chat</div>
			<button value="chat" className="important" onClick={event => {
				this.handleChange(event);
			  }}>
			  Box pour chat
			</button>
		  </div>);
		} else if (this.state.pet === "chat") {
		  return (<div>
			<div>Vous avez un chien</div>
			<button value="chien" className="important" onClick={event => {
				this.handleChange(event);
			  }}>
			  Box pour chien
			</button>
		  </div>);
		}
	  }
}