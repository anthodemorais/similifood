import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import api from '../../services/api';
import '../../styles/product.css';
import AddFeedback from '../avis/AddFeedback';
import Feedback from "../avis/Feedback";
import Payment from '../productsPayment/Payment';

export default class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            clientSecret: "",
            paymentIntent: false,
            addedToCart: false,
            message: "",
            recipe: {},
            tools: [],
            ingredients: [],
            feedbacks: [],
            steps: [],
            id: this.props.match.params.id,
            img: "",
        };
        this.getProduct();
        this.getRecipe();
        this.loadFeedback(this.props.match.params.id);
    }

    getProduct() {
        api.getProductById(this.state.id).then(product => {
            this.setState({ 
                product: product[0],
                img: require(`../../styles/IMAGES/${product[0].img_name}`),
            });
        })
    }

    getRecipe() {
        api.getRecipeById(this.state.id).then(result => {
            this.setState({
                recipe: result.result,
                tools: result.tools,
                ingredients: result.ingredients,
                steps: result.result.steps.split("\n")
            });
        })
    }

    loadFeedback(id) {
        api.getFeedbacks().then(feedbacks => {
            let data = feedbacks.result;

            let finaldata = data.filter(feedback => feedback.box_id === parseInt(id));

            this.setState({ feedbacks: finaldata });
        });
    }

    displayPayment() {
        if (this.state.paymentIntent) {
            return (
                <StripeProvider apiKey="pk_test_xUMmKTnmihV6GYUIJTMESQAz">
                    <div className="example">
                        <Elements>
                            <Payment price={this.state.product.price} box_id={this.state.id} />
                        </Elements>
                    </div>
                </StripeProvider>
            )
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

            this.setState({ addedToCart: true });
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
            <div className="container">
                <div className="viewBox">
                    <div className="title recipe">
                        <div>
                            <div>
                                <h2>{this.state.product.name}</h2>
                                <p>{this.state.product.description}</p>
                            </div>
                            <strong className="price">{this.state.product.price}€</strong>
                        </div>
                        <span>Temps de préparation : {this.state.recipe.preparation_time}</span>
                        <br/>
                        <div>
                            <div>
                                <strong>Ustensiles :</strong>
                                <ul>
                                    {this.state.tools.map(tool => <li> • {tool.tool}</li>)}
                                </ul>
                            </div>
                            <div>
                                <strong>Ingrédients :</strong>
                                <ul>
                                    {this.state.ingredients.map(ingredient => <li> • {ingredient.quantity} de {ingredient.ingredient}</li>)}
                                </ul>
                            </div>
                        </div>
                        <p>Recette :<br/>
                            <ol>
                                {this.state.steps.map(step => <li>{step}</li>)}
                            </ol>
                        </p>
                        <button className="important mt" onClick={() => this.setState({ paymentIntent: true })}>Acheter</button><br/>
                        <button className="cartBtn" onClick={() => this.addToCart()}>Ajouter au panier</button>
                        {this.displayPayment()}
                        {this.displayMessage()}
                    </div>
                    <div className="feedbacks">
                        <h3>Les avis pour ce produit</h3>
                        <AddFeedback box_id={this.props.match.params.id} />
                        {this.state.feedbacks.map(feedback => (<Feedback id={feedback.id_feedback} userId={feedback.user_id} content={feedback.content} boxId={feedback.box_id} />))}
                    </div>
                </div>
                <hr />
            </div>
        );
    }
}