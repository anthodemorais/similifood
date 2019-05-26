import React, {Component} from "react";
import api from "../../services/api";
export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id_feedback,
      username: "",
      description: this.props.content,
      boxName: ""
    };

    this.getUsername(this.props.userId);
    this.getBox(this.props.boxId);
  }
  getUsername(id) {
    api.getUserById(id).then(user => {
      console.log(user);
      this.setState({username: user[0].name});
    });
  }

  getBox(id) {
    api.getProductById(id).then(product => {
      this.setState({boxName: product[0].name});
    });
  }

  render() {
    return (<div>
      <p>
        {`${this.state.username} (pour le produit "${this.state.boxName}") :`}
        {this.state.description}
      </p>
    </div>);
  }
}