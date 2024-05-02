import cow from './assets/cow.png'
import ovni from './assets/ovni.png'
import Score from "./components/Score.jsx";
import './style/clicker.scss'
import React, {useEffect, useRef, useState} from "react";
import EasyBoutonBonus from "./components/EasyBoutonBonus.jsx";
import MediumBoutonBonus from "./components/MediumBoutonBonus.jsx";
import HardBoutonBonus from "./components/HardBoutonBonus.jsx";
import Loose from "./components/Loose.jsx";
import Instructions from "./components/Instructions/Instructions.jsx";
function Game(props) {

    function getRandomSpeed(min, max) {
        return Math.random() * (max - min) + min;
    }

    const KEEP_SAFE_ZONE_REF = useRef()
    const DEATH_ZONE_REF = useRef(); // Zone à ne pas atteindre
    let [speed, setSpeed] = useState(getRandomSpeed(400, 500))
    const [pixel, setPixel] = useState(1.2)
    let [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(localStorage.getItem('score'))
    let [translationY, setTranslationY] = useState(0)
    const [fallingTrigger, setFallingTrigger] = useState(false)
    const [pause, setPause] = useState(false)
    const [loose, setLoose] = useState(false)
    const [medium, setMedium] = useState(false)
    const [hard, setHard] = useState(true)
    const [instruction, setInstructions] = useState(true)
    const [bonus, setBonus] = useState(false)
    const vacheRef = useRef()

    useEffect(() => {

        checkCollision(KEEP_SAFE_ZONE_REF.current, DEATH_ZONE_REF.current)
        const interval = setInterval(down, speed);
        return () => clearInterval(interval);
    },);


    useEffect(() => {

        return () => difficulty()
    }, [score])

    function saveScore() {

        localStorage.setItem('score', score)
        if (score > highScore) {
            setHighScore(localStorage.getItem('score'))
            localStorage.setItem("score", score)
        }
        {
            localStorage.setItem('score', highScore)
        }
    }

    function up(pxl = pixel) {
        setTranslationY(translationY -= pxl)
    }

    function difficulty() {


        if (score <= 2) {
            setSpeed(getRandomSpeed(50, 60))
        } else if (score >= 3 && score <= 20) {
            setSpeed(getRandomSpeed(350, 350))
        } else if (score >= 21 && score <= 50) {
            setSpeed(getRandomSpeed(300, 300))
            setPixel(7)
        } else if (score >= 51 && score <= 55) {
            setSpeed(getRandomSpeed(40, 60))
        } else if (score >= 56 && score <= 99) {
            setSpeed(getRandomSpeed(220, 230))
        } else if (score >= 100 && score <= 120) {
            setFallingTrigger(false)
            setPixel(2.4)
        } else if (score >= 121 && score <= 129) {
            setFallingTrigger(true)
            setSpeed(getRandomSpeed(70, 90))
            setPixel(1.5)
        } else if (score >= 130 && score <= 189) {
            setSpeed(getRandomSpeed(200, 210))
        } else if (score >= 190 && score <= 199) {
            setSpeed(getRandomSpeed(30, 40))
        } else if (score >= 200 && score <= 220) {
            setSpeed(getRandomSpeed(200, 310))
        } else if (score >= 221 && score <= 250) {
            setSpeed(getRandomSpeed(80, 100))
        } else if (score >= 250 && score <= 300) {
            const last_interval = setInterval(() => {
                setSpeed(getRandomSpeed(60, 280))
                clearInterval(last_interval)
            }, 1 * 1000)
        } else if (score >= 301 && score <= 320) {
            const last_interval = setInterval(() => {
                setSpeed(getRandomSpeed(100, 200))
                clearInterval(last_interval)
            }, 4 * 100)
        } else if (score >= 321 && score <= 371) {
            const last_interval = setInterval(() => {
                setSpeed(getRandomSpeed(50, 150))
                clearInterval(last_interval)
            }, 2.2 * 1000)
        } else if (score >= 372 && score <= 400) {
            const last_interval = setInterval(() => {
                setSpeed(getRandomSpeed(100, 200))
                clearInterval(last_interval)
            }, 3 * 1000)
        } else if (score >= 401) {
            const last_interval = setInterval(() => {
                setSpeed(getRandomSpeed(60, 140))
                clearInterval(last_interval)
            }, 4 * 1000)
        }


    }

    function down(trigger = fallingTrigger, vitesse = speed) {

        if (trigger) {
            document.querySelector(".zoneToKeepSafe").style.top = translationY + "px"
            setTranslationY(translationY + 9.2)

        } else {
            return null
        }


    }

    function checkCollision(safeZone, deathZone) {

        const keepSafeRect = safeZone.getBoundingClientRect();
        const deathZoneRect = deathZone.getBoundingClientRect();
        if (keepSafeRect.top < 0) {
            setTranslationY(200)
        }
        if (keepSafeRect.bottom >= deathZoneRect.top) {
            // La div KEEP_SAFE a atteint ou dépassé la div DEATH_ZONE
            // Vous pouvez exécuter votre fonction ici
            // Exemple d'exécution d'une fonction

            // alert('perdu')
            vacheRef.current.style.transform = 'translateY(-10%)'
            setFallingTrigger(false)
            setBonus(false)
            setLoose(true)
            saveScore()

            // setTimeout(() => alert('perdu'), .1 * 1000)
        } else {
            // La collision n'a pas encore eu lieu, vérifiez à nouveau dans 1 seconde
            setTimeout(checkCollision, 100); // Vérifiez toutes les secondes
        }
    }


    return (<div className={"MAIN"} onClick={() => {

            if (loose) {
                return null
            } else {
                up()
            }
            setScore(score += 1)
        }}>
            <Score score={score} highScore={highScore}/>
            {instruction && <Instructions startGame={() => {
                setFallingTrigger(true)
                setBonus    (true)
                setInstructions(false)
            }}/>}
            {<h1>{loose && <Loose actif={instruction} trigger={() => setInstructions(false)} score={score} highScore={highScore} tryAgain={() => location.reload()} triggerInfo={() => setInstructions(true)}/>}</h1>}
            {(medium && bonus) && <MediumBoutonBonus medium1={() => setScore(score += 19)} medium2={() => {
                setFallingTrigger(false)
                setTimeout(() => setFallingTrigger(true), 5 * 1000)
            }} medium3={() => {
                setPixel(10)
                setTimeout(() => setPixel(1.2), 10 * 1000)
            }}></MediumBoutonBonus>}
            {(hard && bonus) && <HardBoutonBonus hard1={() => setScore(score += 29)} hard2={() => {
                setFallingTrigger(false)
                setTimeout(() => setFallingTrigger(true), 8 * 1000)
            }} hard3={() => {
                setPixel(20)
                setTimeout(() => setPixel(1.2), 10 * 1000)
            }}></HardBoutonBonus>}
            {bonus && <EasyBoutonBonus easy1={() => setScore(score += 9)} easy2={() => {
                setFallingTrigger(false)
                setTimeout(() => setFallingTrigger(true), 3 * 1000)
            }} easy3={() => {
                setPixel(5)
                setTimeout(() => setPixel(1.2), 10 * 1000)
            }}></EasyBoutonBonus>}
            {/*<h1>{Math.round(speed)}/ms</h1>*/}
            {/*<h1>safe_zone + {pixel} by click</h1>*/}
            <div ref={KEEP_SAFE_ZONE_REF} style={{top: translationY + "px"}} className="zone-in zoneToKeepSafe">
                <img className={"zoneToKeepSafe--ovni"} src={ovni} alt=""/>
            </div>
            <div ref={DEATH_ZONE_REF} className="zone-in deathZone">
                <img ref={vacheRef} className={"deathZone--cow"} src={cow}/>
            </div>
        </div>


    )
}

export default Game;
