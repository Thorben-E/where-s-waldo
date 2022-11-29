import React from "react"

const BeginScreen = ({ changeBegin, changePlay }) => {
    const changeScreen = () => {
        changeBegin(false)
        changePlay(true)
    }
    return (
    <div className="BeginScreen-container">
        <div className="BeginScreen">
            <h1>Welcome to Where's Waldo</h1>
            <p>uitleg hier</p>
            <button onClick={changeScreen}>Play</button>
        </div>
    </div>
  )
};

export default BeginScreen;
