import React, { Component } from 'react';
import api from '../../services/api';
import '../../styles/admin.css';

class AdminProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            pname: "",
            description: "",
            price: "",
            img_name: "",
            age: "",
            weight: "",
            fur: "",
            rname: "",
            preparation: "",
            ptime: "",
            ctime: "",
            diffuculty: 0,
            ingredients: "",
            tools: "",
            updateForm: false
        }
        this.getProducts();
    }

    getProducts() {
        api.getProducts().then((products) => {
            console.log(products);
            this.setState({products: products});
        })
    }

    deleteProduct(e) {
        api.deleteProduct(e.target.id).then(console.log);
    }

    // displayUpdt() {
    //     if (this.state.updateForm) {
    //         return ()
    //     }
    // }

    inputChanged(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit(e) {
        e.preventDefault();
        let params = [this.state.pname, this.state.description, this.state.price, this.state.animal, this.state.img_name, this.state.age, this.state.weight, this.state.fur]
        api.addProduct(...params).then(result => {
            //add recipe puis add les ingredients
        })
    }

    render() {

        if (localStorage.getItem("admin") === "0" || localStorage.getItem("admin") === null) return (<span className="container">Vous n'êtes pas autorisé</span>)

        return (
            <div className="container">
                <div className="adminForms">
                    <div>
                        <h2>Ajouter un produit</h2>
                        <form onSubmit={(e) => {this.submit(e)}}>
                            <label for="name">Nom du produit: <br/><input type="text" name="pname" onChange={e => this.inputChanged(e)} /></label>
                            <label for="description">Description: <br/><textarea name="description" onChange={e => this.inputChanged(e)}></textarea></label>
                            <label for="price">Prix: <br/><input type="text" name="price" onChange={e => this.inputChanged(e)} /></label>
                            <label for="img_name">Image: <br/><input type="text" name="img_name" onChange={e => this.inputChanged(e)} /></label>
                            <label for="animal">Animal: <br/><input type="text" name="animal" onChange={e => this.inputChanged(e)} /></label>
                            <label for="age">Catégorie d'âge: <br/><input type="text" name="age" onChange={e => this.inputChanged(e)} /></label>
                            <label for="weight">Catégorie de poids: <br/><input type="text" name="weight" onChange={e => this.inputChanged(e)} /></label>
                            <label for="fur">Catégorie de fourrure: <br/><input type="text" name="fur" onChange={e => this.inputChanged(e)} /></label>
                        </form>
                    </div>
                    <div>
                        <h2>Et sa recette</h2>
                        <form>
                            <label for="name">Nom: <br/><input type="text" name="rname" onChange={e => this.inputChanged(e)} /></label>
                            <label for="steps">Préparation: <br/><textarea name="steps" onChange={e => this.inputChanged(e)}></textarea></label>
                            <label for="ptime">Temps de préparation: <br/><input type="text" name="ptime" onChange={e => this.inputChanged(e)} /></label>
                            <label for="ctime">Temps de cuisson: <br/><input type="text" name="ctime" onChange={e => this.inputChanged(e)} /></label>
                            <label for="difficulty">Difficulté: <br/><input type="number" name="difficulty" onChange={e => this.inputChanged(e)} /></label>
                            <label for="ingredients">Liste des ingrédients séparés par une virgule: <br/><input type="text" name="ingredients" onChange={e => this.inputChanged(e)} /></label>
                            <label for="tools">Liste des ustensiles séparés par une virgule: <br/><input type="text" name="tools" onChange={e => this.inputChanged(e)} /></label>
                        </form>
                    </div>
                </div>
                <button className="important" onClick={e => this.submit(e)}>Envoyer</button>
                <h2>Liste des produits</h2>
                <table>
                    <tr>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Prix</th>
                        <th>Animal</th>
                        <th>Image</th>
                        <th>Age</th>
                        <th>Poids</th>
                        <th>Fourrure</th>
                    </tr>
                {this.state.products.map((product) => (
                    <tr key={product.id_box}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}€</td>
                        <td>{product.animal}</td>
                        <td>{product.img_name}</td>
                        <td>{product.age}</td>
                        <td>{product.weight}</td>
                        <td>{product.fur}</td>
                        <button onClick={(e) => this.deleteProduct(e)} id={product.id_box}>Supprimer</button>
                        <button onClick={(e) => this.updateProduct(e)} id={product.id_box}>Modifier</button>
                    </tr>   
                ))}
                </table>
            </div>
        );
    }
}
 
export default AdminProducts;