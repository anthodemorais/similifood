import React, {Component} from "react";
import Feedback from "./Feedback";
import api from "../../services/api";
import cat from "../../styles/IMAGES/CHAT_AVIS.png";
import '../../styles/avis.css';

export default class feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbacks: []
    };
    this.loadFeedback();
  }
  componentDidMount() {
    this.loadFeedback();
  }
  loadFeedback() {
    api.getFeedbacks().then(feedbacks => {
      this.setState({feedbacks: feedbacks.result});
    });
  }

  inputChanged(e) {
      this.setState({ [e.target.name]: e.target.value });
  }

  submit(e) {
      e.preventDefault();
      api.addFeedback(this.state.content, this.props.box_id).then(result => console.log)
  }

  render() {
    return (
      <div className="container allFeedback">
          <div className="add">
              <img src={cat} alt="chat regardant tapant sur un clavier d'ordinateur" />
              <div>
                  <h2>Laissez votre avis de l'expérience miam !</h2>
                  <div>
                      <form onSubmit={(e) => {this.submit(e)}}>
                          <label for="content">Rédiger un avis :</label>
                          <textarea name="content"  onChange={(e) => {this.inputChanged(e)}}></textarea>
                          <button className="important" type="submit">Poster</button>
                      </form>
                  </div>
              </div>
          </div>
          <div className="fbTitle">
              <h2>Les avis de la communauté</h2>
              <span>{this.state.feedbacks.length} Avis</span>
          </div>
          <div className="list">
              {
                this.state.feedbacks.map(feedback => {
                  return (<Feedback id={feedback.id_feedback} userId={feedback.user_id} content={feedback.content} boxId={feedback.box_id}/>);
                })
              }
          </div>
      </div>
    );
  }
}