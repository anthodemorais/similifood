import React, { Component } from 'react';
import api from '../../services/api';

class AddFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            add: true,
            message: "",
            logged: false,
            content: ""
        }
    }

    inputChanged(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    submit(e) {
        e.preventDefault();
        api.addFeedback(this.state.content, this.props.box_id).then(result => console.log)
    }

    displayForm() {
        if (localStorage.getItem("token") !== null) {
            this.setState({logged: true});
            this.setState({add: false});
        }
        else {
            this.setState({add: false});
        }
    }

    render() { 
        if (this.state.add) return (<button onClick={() => {this.displayForm()}}>Ajouter un commentaire</button>)

        if (!this.state.add && !this.state.logged) return (<span>Vous devez être connecté pour ajouter un commentaire</span>)

        return (
            <div>
                <form onSubmit={(e) => {this.submit(e)}}>
                    <label for="content">Ajouter un commentaire :</label>
                    <textarea name="content" onChange={(e) => {this.inputChanged(e)}}></textarea>
                    <button type="submit">Envoyer</button>
                </form>
            </div>
        );
    }
}
 
export default AddFeedback;