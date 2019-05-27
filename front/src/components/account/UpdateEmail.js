import React, { Component } from 'react';
import api from '../../services/api';
import '../../styles/profile.css';

class UpdateEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newEmail: ""
        }
    }

    inputChanged(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    submit(e) {
        e.preventDefault();

        api.updateEmail(sessionStorage.getItem("id_user"), this.state.newEmail).then(console.log)
    }

    render() { 
        return (
            <form className="updateMail" onSubmit={e => {this.submit(e)}}>
                <label for="newEmail">Nouvel email :</label>
                <input type="email" name="newEmail" onChange={e => {this.inputChanged(e)}} />
                <button type="submit">Mettre à jour</button>
            </form>
        )
    }
}
 
export default UpdateEmail;