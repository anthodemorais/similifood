import React, {Component} from "react";
import antho from '../../styles/IMAGES/CONTACT_ANTHONY.png';
import andrea from '../../styles/IMAGES/CONTACT_ANDREA.png';
import daniel from '../../styles/IMAGES/CONTACT_DANIEL.png';
import oumar from '../../styles/IMAGES/CONTACT_OUMAR.png';
import oriane from '../../styles/IMAGES/CONTACT_ORIANE.png';
import lancelot from '../../styles/IMAGES/CONTACT_LANCELOT.png';
import melissa from '../../styles/IMAGES/CONTACT_MELISSA.png';
import thomas from '../../styles/IMAGES/CONTACT_THOMAS.png';
import dog from '../../styles/IMAGES/chien_phone.jpg';
import "../../styles/uikit.css";
import "../../styles/contact.css";

export default class Contact extends Component {
  render() {
    return (
        <div className="container contact">
          <div className="desc">
              <img src={dog} alt="chien qui a un téléphone à la bouche pour symboliser le contact" />
              <div>
                  <strong>Une question ?<br/> Besoin de conseils ?<br/> Contactez-nous !</strong>
                  <p>Batnae municipium in Anthemusia conditum Macedonum manu priscorum ab Euphrate flumine brevi
                    spatio disparatur, refertum mercatoribus opulentis, ubi annua sollemnitate prope Septembris
                    initium mensis ad nundinas.</p>
                  <strong>Par mail ou par téléphone <br/> au 01.82.45.65.87</strong>
                  <a href="#form">
                      <button className="important mt">Envoyer un mail</button>
                  </a>
              </div>
          </div>
          <h2>L'équipe</h2>
          <p>
              Notre équipe se compose de passionés de l’animal. En plus de s’être creusés les méninges, ils ont décidé de mettre à profit au plus grand nombre leur savoir cumulé au cours de nombreuses années d’études comparatives et d’observation. 
              <br/>
              <br/>
              Ce n’est pas nous qui donnerions notre langue au chat sur le bien être de votre boule de poil préférée!
          </p>
          <h3>Les membres</h3>
          <div className="team">
              <div>
                  <img src={antho} alt="Membre de l'équipe : Anthony" />
                  <span>Anthony <br/>DE MORAIS</span>
              </div>
              <div>
                  <img src={oriane} alt="Membre de l'équipe : Oriane" />
                  <span>Oriane <br/>Fagnière</span>
              </div>
              <div>
                  <img src={melissa} alt="Membre de l'équipe : Mélissa" />
                  <span>Mélissa <br/>Martin</span>
              </div>
              <div>
                  <img src={andrea} alt="Membre de l'équipe : Andréa" />
                  <span>Andréa <br/>Ngamouyi</span>
              </div>
              <div>
                  <img src={thomas} alt="Membre de l'équipe : Thomas" />
                  <span>Thomas <br/>Perreira</span>
              </div>
              <div>
                  <img src={lancelot} alt="Membre de l'équipe : Lancelot" />
                  <span>Lancelot <br/>Scheibling-Sève</span>
              </div>
              <div>
                  <img src={daniel} alt="Membre de l'équipe : Daniel" />
                  <span>Daniel <br/>Simmoney</span>
              </div>
              <div>
                  <img src={oumar} alt="Membre de l'équipe : Oumar" />
                  <span>Oumar <br/>Wele</span>
              </div>
          </div>
          <h3>Leur envoyer un mail</h3>
          <form className="contactForm" id="form" method="POST" action="https://formspree.io/miamentreprise@gmail.com">
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