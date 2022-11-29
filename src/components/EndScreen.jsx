import React, { useState } from "react"

const EndScreen = ({ changeEnd, changeBegin, scoresArray}) => {
    const [popup, setPopup] = useState(true)
    const [name, setName] = useState()
    let results;
    let scoreboard = []
    if (scoresArray != undefined) {
        results = scoresArray
        console.log(results)
        results.forEach(result => {
            scoreboard.push(<p key={result.name}>{result.name}: {result.score} sec</p>)
        })
    }
      
    let time;
    const changeScreen = () => {
        changeEnd(false)
        changeBegin(true)
    }
    const handleNameChange = (e) => {
        setName(e.target.value)
        console.log(name)
    }
    const pushScore = (time, name) => {
        setPopup(false)
    }

    return (
    <div className="EndScreen">
        {popup && 
            <div className="popup">
                <h2>You won</h2>
                <p>Time: {}</p>
                <label htmlFor="name">Username:</label>
                <br></br>
                <input type="text" onChange={(e) => handleNameChange(e)} name="name" id="name" />
                <br></br>
                <button onClick={() => pushScore(name, time)}>Submit Score</button>
            </div>}
        {!popup && <>
            <div className="left">
                <div className="leaderboard">
                    {scoreboard}
                </div>
            </div>
            <div className="right">
                <div className="score">Your score</div>
                <div className="EndScreenBtn-container">
                    <button className="EndScreenBtn" onClick={changeScreen}>Play Again</button>
                </div>
            </div>
        </>}
    </div>
  )
};

export default EndScreen