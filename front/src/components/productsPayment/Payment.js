import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import api from '../../services/api';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adress: "",
      quantity: 1,
      name: "",
      complete: false
    };
    this.submit = this.submit.bind(this);
    api.order(this.props.box_id, "adresse", 1)
    .then(result => console.log)
    .catch(err => console.log)
  }

  inputChanged(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: this.state.name});

    Promise.all([api.order(this.props.box_id, this.state.adress, this.state.quantity),
                api.payment(this.props.price, token)])
    .then(values => {
      console.log(values)
      if (values[1].ok) this.setState({complete: true});
    })
    
  }

  render() {
    if (this.state.complete) return <h1>Paiement Terminé, Merci !</h1>;

    return (
      <div className="checkout">
        <p>Completez le formulaire de paiement</p>
        <label for="name">Nom :</label>
        <input type="text" name="name" onChange={e => this.inputChanged(e)} />
        <label for="adress">Adresse complète :</label>
        <input type="text" name="adress" onChange={e => this.inputChanged(e)} />
        <label for="quantity">Quantitée :</label>
        <input type="number" value="1" name="quantity" onChange={e => this.inputChanged(e)} />
        <CardElement />
        <button className="important mt" onClick={this.submit}>Payer</button>
      </div>
    );
  }
}

export default injectStripe(Payment);