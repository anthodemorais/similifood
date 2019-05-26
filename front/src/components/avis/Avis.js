import React, {Component} from "react";
import Feedback from "./Feedback";
import api from "../../services/api";
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

  render() {
    return (<div className="container">
      <h1>AVIS</h1>
      {
        this.state.feedbacks.map(feedback => {
          return (<Feedback id={feedback.id_feedback} userId={feedback.user_id} content={feedback.content} boxId={feedback.box_id}/>);
        })
      }
    </div>);
  }
}