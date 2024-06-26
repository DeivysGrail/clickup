import React, {useState} from 'react';
import logo from '../../assets/logo-SpaceCow.png'
import '../../style/clicker.scss'
import point_illus from "../../assets/bonus_ico/instructions_points.png"
import temps_illus from "../../assets/bonus_ico/instructions_temps.png"
import pixel_illus from "../../assets/bonus_ico/instructions_pixels.png"
import close_button from "../../assets/close_button.png";
function Instructions(props) {


    return (
        <div className={"MAIN__INSTRUCTIONS"}>
            <img src={close_button} style={props.actif ? {visibility: "visible"} : {visibility: "hidden"}}
                 className={"MAIN__INSTRUCTIONS--closeButton"} onClick={props.trigger}/>

            <div className="MAIN__INSTRUCTIONS__header">
                <img className="MAIN__INSTRUCTIONS__header--logo" src={logo} alt=""/>
                <h1 className="MAIN__INSTRUCTIONS__header--text">BIENVENUE SUR CLICKUP</h1>
                <p className="MAIN__INSTRUCTIONS__header--explication"><span
                    className={"MAIN__INSTRUCTIONS__header--span"}><b>But du jeu :</b></span> Empêcher la vache de
                    se faire capturer</p>
            </div>
            <div className={`MAIN__INSTRUCTIONS__bonus`}>
                <p className="MAIN__INSTRUCTIONS__bonus--description">- Des bonus apparaîssent pendant la partie pour
                    t'aider.
                    Chaque type de bonus possèdent 3 niveaux. Plus le bonus est avantageux, et moins le bonus apparaîtra
                    longtemps sur l'écran.</p>
                <p className="MAIN__INSTRUCTIONS__bonus--description">Il y a 3 types de bonus différents :</p>

                <div className="MAIN__INSTRUCTIONS__bonus__StopTime MAIN__INSTRUCTIONS__bonus__BONUS_CONTAINER">
                    <img className={"MAIN__INSTRUCTIONS__bonus__BONUS_CONTAINER--logo"} src={temps_illus} alt=""/>
                    <p className={"MAIN__INSTRUCTIONS__bonus__BONUS_CONTAINER--text"}>Les bonus de temps te permettent
                        d'arrêter la chute de l'ovni pendant 3, 5 ou 8 secondes.</p>

                </div>
                <div className="MAIN__INSTRUCTIONS__bonus__PixelUp MAIN__INSTRUCTIONS__bonus__BONUS_CONTAINER">
                    <img className={"MAIN__INSTRUCTIONS__bonus__BONUS_CONTAINER--logo"} src={pixel_illus} alt=""/>
                    <p className={"MAIN__INSTRUCTIONS__bonus__BONUS_CONTAINER--text"}>Les bonus de pixels te permettent
                        de
                        remonter l'ovni de 5, 10 ou 20 pixels par clique au lieu de 2.</p>

                </div>
                <div className="MAIN__INSTRUCTIONS__bonus__BonusPoint MAIN__INSTRUCTIONS__bonus__BONUS_CONTAINER">
                    <img className={"MAIN__INSTRUCTIONS__bonus__BONUS_CONTAINER--logo"} src={point_illus} alt=""/>
                    <p className={"MAIN__INSTRUCTIONS__bonus__BONUS_CONTAINER--text"}>Les bonus de points peuvent te
                        rapporter
                        10, 20 ou 30 points supplémentaires pour ton score.</p>
                </div>
            </div>
            {!props.loose &&
                <button className="MAIN__INSTRUCTIONS--startButton" onClick={props.startGame}>COMMENCER</button>}
        </div>
    );
}

export default Instructions;
