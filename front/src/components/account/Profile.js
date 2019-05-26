import React, { Component } from 'react';
import api from '../../services/api';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: []
        }
        this.getInfos();
    }

    getInfos() {
        api.getUserById(sessionStorage.getItem("id_user")).then(profile => {
            console.log(profile[0]);
            this.setState({user: profile[0]});
        })
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
        let cart = localStorage.getItem("cart");
        if (cart === null) {
            cart = "Vide"
        }
        else {
            cart = JSON.stringify(cart)
        }
        infos.push(cart);
        return infos;
    }

    render() { 
        return (
            <div className="container">
                {this.displayInfos()}
            </div>
        );
    }
}
 
export default Profile;