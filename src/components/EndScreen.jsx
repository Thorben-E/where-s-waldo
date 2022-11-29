import React from "react"

const EndScreen = ({ changeEnd, changeBegin}) => {
    const changeScreen = () => {
        changeEnd(false)
        changeBegin(true)
    }
    return (
    <div className="EndScreen">
        <div className="left">
            <div className="leaderboard">
                player name and score here
            </div>
        </div>
        <div className="right">
            <div className="score">Your score</div>
            <div className="EndScreenBtn-container">
                <button className="EndScreenBtn" onClick={changeScreen}>Play Again</button>
            </div>
        </div>
    </div>
  )
};

export default EndScreen