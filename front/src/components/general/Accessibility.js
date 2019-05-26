import React, { Component } from 'react';
import arbo from '../../styles/IMAGES/ACCESS_ARBORESCENCE.svg';
import contrast from '../../styles/IMAGES/ACCESS_CONTRASTE.svg';
import size from '../../styles/IMAGES/ACCESS_TAILLE_POLICE.svg';
import spacing from '../../styles/IMAGES/ACCESS_ESPACEMENT_POLICE.svg';
import reset from '../../styles/IMAGES/ACCESS_RESET.svg';
import '../../styles/accessibility.css';

class Accessibility extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() { 
        return (
            <div className="accessibilityMenu">
                <strong>accessibilité</strong>
                <div className="accessArbo">
                    <span>Site :</span>
                    <div>
                        <img src={arbo} alt="icone pour accéder à l'arborescence du site" />
                        <span>Arborescence</span>
                    </div>
                </div>
                <div className="accessContrast">
                    <span>Contraste :</span>
                    <div>
                        <img src={contrast} alt="icone pour changer le contraste du site" />
                        <span>Noir / Jaune</span>
                    </div>
                </div>
                <div className="accessFont">
                    <span>Police :</span>
                    <div>
                        <img src={size} alt="icone pour changer la taille de la police du site" />
                        <span>Taille</span>
                    </div>
                </div>
                <div className="spacingBtn">
                    <div>
                        <img src={spacing} alt="icone pour changer l'espacement des lettres de la police du site" />
                        <span>Espacement</span>
                    </div>
                </div>
                <div className="accessDefault">
                    <span>Par défaut :</span>
                    <img src={reset} alt="icone pour revenir aux réglages par défaut" />
                </div>
            </div>
        )
    }

}
 
export default Accessibility;