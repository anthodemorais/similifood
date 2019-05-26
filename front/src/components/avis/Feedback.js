import React, {Component} from "react";
import api from "../../services/api";
import cat from '../../styles/IMAGES/CAT.png';

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
    return (<div className="feedback">
      <div className="avatar">
          <img src={cat} alt="Chat pour représenter la personne donnant un avis" className="profile_pic"/>
      </div>
      <div className="content">
          <p>
              "{this.state.description}"
              <br/>
              <br/>
              {` - ${this.state.username} (pour le produit "${this.state.boxName}")`}
          </p>
      </div>
    </div>);
  }
}