import React, {Component} from "react";
import "../../styles/uikit.css";
import "../../styles/contact.css";
export default class Contact extends Component {
  render() {
    return (
        <div className="container contactForm">
          <h2>Contactez nous</h2>
          <form method="POST" action="https://formspree.io/miamentreprise@gmail.com">
            <label for="name">
              Nom:
              <br/>
              <input type="text" id="name" name="name" required="required"/>
            </label>
            <label for="email">
              Email:
              <br/>
              <input type="text" id="email" name="email" required="required"/>
            </label>
            <label for="subject">Message</label>
            <textarea className="textarea" type="text" id="subject" name="subject" rows="10" cols="33"/>

            <button type="submit" className="important mt">
              envoyez
            </button>
          </form>
        </div>
    );
  }
}