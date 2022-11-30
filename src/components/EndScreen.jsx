import React, { useState } from "react"

const EndScreen = ({ changeEnd, changeBegin, score, scoresArray, AddScore}) => {
    const [popup, setPopup] = useState(true)
    const [name, setName] = useState()
    const [scoreboard, setScoreboard] = useState([])
    const [username, setUsername] = useState()

    const changeScreen = () => {
        changeEnd(false)
        changeBegin(true)
    }
    const handleNameChange = (e) => {
        setName(e.target.value)
        console.log(name)
    }
    const pushScore = (name, time) => {
        setPopup(false)
        setUsername(name)
        if (name === undefined) {
            AddScore('anonymous', time)
        } else {
            AddScore(name, time)
        }
        sortAndReturn()
    }

    const sortAndReturn = () => {
        let arr = sortArray()
        console.log(arr)
        setScoreboard(arr.map((score) => <p key={score.id}>{score.name}: {score.score} sec</p>))
    }

    const sortArray = () => {
        scoresArray.sort((a,b) => {
            return a.score - b.score;
        })
        return scoresArray
    }

    return (
    <div className="EndScreen">
        {popup && 
            <div className="popup">
                <h2>You won</h2>
                <p>Score: {score} sec</p>
                <label htmlFor="name">Input username:</label>
                <br></br>
                <input type="text" onChange={(e) => handleNameChange(e)} name="name" id="name" />
                <br></br>
                <button className="Endscreen-button" onClick={() => pushScore(name, score)}>Submit Score</button>
            </div>}
        {!popup && <>
            <div className="left">
                <div className="leaderboard">
                    <div className="leaderboardData">{scoreboard}</div> 
                </div>
            </div>
            <div className="right">
                <div className="score">
                    <p>Username: {username}</p>
                    <p>Time: {score}</p>
                </div>
                <div className="EndScreenBtn-container">
                    <button className="EndScreenBtn" onClick={changeScreen}>Play Again</button>
                </div>
            </div>
        </>}
    </div>
  )
};

export default EndScreen