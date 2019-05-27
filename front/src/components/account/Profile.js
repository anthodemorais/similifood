import React, { Component } from 'react';
import api from '../../services/api';
import UpdateEmail from './UpdateEmail';
import UpdatePassword from './UpdatePassword';
import { NavLink } from 'react-router-dom';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            orders: [],
            products: []
        }
        this.getInfos();
    }

    getInfos() {
        api.getUserById(sessionStorage.getItem("id_user")).then(profile => {
            console.log(profile[0]);
            this.setState({user: profile[0]});
        })

        Promise.all([api.getUserById(sessionStorage.getItem("id_user")), api.getMyOrders(), api.getProducts()]).then(values => {
            this.setState({user: values[0][0], orders: values[1], products: values[2]});
            console.log(values);
        })
    }

    displayOrders() {
        let orders = [];
        this.state.orders.forEach(value => {
            let id = value.box_id;
            let name = "";
            this.state.products.forEach(product => {
                if (product.id_box === id) {
                    name = product.name;
                }
            })
            let elem;
            if (value.date_of_delivery !== undefined) {
                elem = (<span>x{value.quantity} {name} commandé(es) le {value.date_of_order.substring(0,10)}, livraison estimée le {value.date_of_delivery.substring(0,10)}</span>)
            }
            else {
                elem = (<span>x{value.quantity} {name} commandé(es) le {value.date_of_order.substring(0,10)}, date de livraison inconnue</span>)
            }
            orders.push(elem)
        })
        return orders
    }

    displayInfos() {
        let infos = []
        Object.keys(this.state.user).forEach((key) => {
            if (key === "points" && this.state.user[key] === null) {
                infos.push(<span>0 points</span>)
            }
            else {
                infos.push(<span>{this.state.user[key]}</span>)
            }
        })
        return infos;
    }

    render() { 
        return (
            <div className="container profileContainer">
                <NavLink to={`/cart`}>
                    <button className="important cartBtn">
                        Voir mon panier
                    </button>
                </NavLink>
                <h2>Mes Infos</h2>
                {this.displayInfos()}
                <h2>Mes commandes</h2>
                {this.displayOrders()}
                <span>Votre email : {this.state.user.email}</span>
                <UpdateEmail />
                <UpdatePassword />
            </div>
        );
    }
}
 
export default Profile;