import React from "react"
import bella from '../assets/Bella.png'
import frank from '../assets/frank.png'
import waldo from '../assets/waldo.png'

const BeginScreen = ({ changeBegin, changePlay }) => {
    const changeScreen = () => {
        changeBegin(false)
        changePlay(true)
    }
    return (
    <div className="BeginScreen-container">
        <div className="BeginScreen">
            <h1>Welcome to Where's Waldo</h1>
            <p className="Beginscreen-text">Tag these characters as fast as you can!
Scroll through the image to find the correct character.
Click the character and choose the correct name.
You will be timed and your score will be recorded, so move fast!</p>
            <div className="BeginScreen-characters">
                <label htmlFor="">Bella (easy):</label>
                <img className="character" src={bella} alt="" />
                <label htmlFor="">Frank (medium):</label>
                <img className="character" src={frank} alt="" />
                <label htmlFor="">Waldo (hard):</label>
                <img className="character" src={waldo} alt="" />
            </div>
            <button className="BeginScreen-button" onClick={changeScreen}>Play</button>
        </div>
    </div>
  )
};

export default BeginScreen;
