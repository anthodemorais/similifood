import React from 'react';
import arbo from '../../styles/IMAGES/ACCESS_ARBORESCENCE.svg';
import contrast from '../../styles/IMAGES/ACCESS_CONTRASTE.svg';
import size from '../../styles/IMAGES/ACCESS_TAILLE_POLICE.svg';
import spacing from '../../styles/IMAGES/ACCESS_ESPACEMENT_POLICE.svg';
import reset from '../../styles/IMAGES/ACCESS_RESET.svg';
import '../../styles/accessibility.css';
import useDarkMode from 'use-dark-mode';

const Accessibility = () => {

    const darkMode = useDarkMode(false);
    let isSpaced = false;

    function handleDarkMode() {
        if (darkMode.value) {
            darkMode.disable();
        }
        else {
            darkMode.enable();
        }
    }

    function handleSpacing() {
        if (!isSpaced) {
            document.body.classList.toggle("spaced", true);
            isSpaced = true;
        }
        else {
            document.body.classList.remove("spaced");
            isSpaced = false;
        }
    }

    function resetParams() {
        darkMode.disable();
        document.body.classList.remove("spaced");
        isSpaced = false;
    }

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
                <div onClick={(e) => {handleDarkMode()}}>
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
            <div className="spacingBtn" onClick={e => handleSpacing()}>
                <div>
                    <img src={spacing} alt="icone pour changer l'espacement des lettres de la police du site" />
                    <span>Espacement</span>
                </div>
            </div>
            <div className="accessDefault" onClick={e => resetParams()} >
                <span>Par défaut :</span>
                <img src={reset} alt="icone pour revenir aux réglages par défaut" />
            </div>
        </div>
    )

}
 
export default Accessibility;