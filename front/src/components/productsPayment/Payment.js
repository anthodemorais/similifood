import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import api from '../../services/api';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adress: "",
      quantity: 1,
      complete: false
    };
    this.submit = this.submit.bind(this);
  }

  inputChanged(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});

    Promise.all([api.order(this.props.box_id, this.state.adress, this.state.quantity),
                api.payment(this.props.price, token)])
    .then(values => {
      console.log(values)
      if (values[1].ok) this.setState({complete: true});
    })
    
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <label for="adress">Adresse complète :</label>
        <input type="text" name="adress" onChange={e => this.inputChanged(e)} />
        <label for="quantity">Quantitée :</label>
        <input type="number" value="1" name="quantity" onChange={e => this.inputChanged(e)} />
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(Payment);