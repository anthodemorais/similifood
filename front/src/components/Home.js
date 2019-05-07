import React, { Component } from 'react';
import '../styles/uikit.css';
import '../styles/home.css';
import dog from '../styles/IMAGES/DOG.png';
import cat from '../styles/IMAGES/CAT.png';
import pawstar from '../styles/ICONES/PAWSTAR.svg';
import readingDog from '../styles/IMAGES/READING_DOG.png';
import dialogDog from '../styles/IMAGES/DIALOG_DOG.png';

export default class Home extends Component {

    render() {
        return (
            <section>
                <div className="banner">
                    <div>
                        <span className="promotion"><strong>-50</strong>%</span>
                        <span className="description">sur votre première<br/><strong>commande</strong></span>
                        <button className="important">je fonce</button>
                    </div>
                </div>
        
                <div className="products  container">
                    <strong>Découvrez les box que nous réservons pour votre animal</strong>
                    <div>
                        <div className="product">
                            <img src={dog} alt="Chien pour accéder aux produits proposés pour les chiens"/>
                            <button className="important">Chien</button>
                        </div>
                        <div className="product">
                            <img src={cat} alt="Chien pour accéder aux produits proposés pour les chats"/>
                            <button className="important">Chat</button>
                        </div>
                    </div>
                </div>
        
                <div className="presentation">
        
                </div>
        
                <div className="feedbacks container">
                    <div className="title">
                        <strong>rejoignez des milliers de compagnons à quatre pattes satisfaits</strong>
                        <div>
                            <img src={pawstar} alt="5 icônes de pattes de chien pour la notation du service" className="notation"/>
                            <span>120 commentaires de miaou et de wouaf</span>
                        </div>
                    </div>
                    <div className="feedback">
                        <div className="avatar">
                            <img src={cat} alt="Chat pour représenter la personne donnant un avis" className="profile_pic"/>
                            <img src={pawstar} alt="5 icônes de pattes de chien pour la notation du service" className="notation"/>
                        </div>
                        <div className="content">
                            <strong>Je ronronne de plaisir</strong>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et hic ratione earum placeat tempora, tempore officia atque beatae distinctio, nisi labore aliquid, perspiciatis reprehenderit nemo culpa provident vel dolore natus?
                                <br/>
                                <br/>
                                Misty - chat femelle de 8 ans
                            </p>
                        </div>
                    </div>
                    <div className="feedback">
                        <div className="avatar">
                            <img src={dog} alt="Chien pour représenter la personne donnant un avis" className="profile_pic"/>
                            <img src={pawstar} alt="5 icônes de pattes de chien pour la notation du service" className="notation"/>
                        </div>
                        <div className="content">
                            <strong>Je dévore la jeunesse à pleine dents</strong>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et hic ratione earum placeat tempora, tempore officia atque beatae distinctio, nisi labore aliquid, perspiciatis reprehenderit nemo culpa provident vel dolore natus?
                                <br/>
                                <br/>
                                Oscar - chien mâle de 3 ans
                            </p>
                        </div>
                    </div>
                    <button className="important">voir plus</button>
                </div>
        
                <hr className="separator"/>
        
                <div className="newsletter">
                    <div className="subscribe">
                        <span className="title">Toujours pas inscrit à notre<br/><strong>newsletter ?</strong></span>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste dolores ex, quis nihil cum eveniet sapiente commodi quae magnam recusandae illum non accusantium velit quaerat similique, tenetur temporibus nemo neque?
                        </p>
                        <strong>Et profitez de -10% sur votre première commande toute l'année !</strong>
                        <form>
                            <label>Entrez votre email :<br/><input type="email" name="email" id="email"/></label>
                            <button type="submit" className="important">Envoyer</button>
                        </form>
                    </div>
                    <div className="img-container">
                        <img src={readingDog} alt="Chien qui lit pour illustrer la newsletter" className="dog-reading"/>
                        <img src={dialogDog} alt="Le chien qui lit dit : Voilà un courrier qui ne manque pas de chien" className="dialog"/>
                    </div>
                </div>
            </section>
        );
    }
}