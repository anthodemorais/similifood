import React, { Component } from 'react';
import api from '../../services/api';

class UpdatePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newPwd: "",
            pwdConf: ""
        }
    }

    inputChanged(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    submit(e) {
        e.preventDefault();
        if (this.state.newPwd === this.state.pwdConf) {
            api.updatePwd(sessionStorage.getItem("id_user"), this.state.newPwd).then(console.log)
        }
    }

    render() { 
        return (
            <form className="updatePwd" onSubmit={e => {this.submit(e)}}>
                <label for="newPwd">Nouveau mot de passe :</label>
                <input type="password" name="newPwd" onChange={e => {this.inputChanged(e)}} />
                <label for="newPwd">Confirmer le mot de passe :</label>
                <input type="password" name="pwdConf" onChange={e => {this.inputChanged(e)}} />
                <button >Mettre à jour</button>
            </form>
        );
    }
}
 
export default UpdatePassword;