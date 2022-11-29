import React, { useEffect, useState } from "react"
import { getDatabase, ref, set } from 'firebase/database'

const PlayScreen = ({ changePlay, changeEnd, imageList }) => {
    const [selectorActive, setSelectorActive] = useState(false)
    const [time, setTime] = useState(Date.now());
    const [waldo, setWaldo] = useState(true)
    const [frank, setFrank] = useState(true)
    const [bella, setBella] = useState(true)
    
    const start = Date.now()
    
    let background;
    let waldoimg;
    let frankimg;
    let bellaimg;
    
    imageList.forEach(image => {
        switch (image) {
            case "https://firebasestorage.googleapis.com/v0/b/where-s-waldo-a5947.appspot.com/o/images%2Fbackground.png?alt=media&token=efbd4309-376e-4b38-bdcc-0e4432db6e4d":
                background = "https://firebasestorage.googleapis.com/v0/b/where-s-waldo-a5947.appspot.com/o/images%2Fbackground.png?alt=media&token=efbd4309-376e-4b38-bdcc-0e4432db6e4d"
            case "https://firebasestorage.googleapis.com/v0/b/where-s-waldo-a5947.appspot.com/o/images%2Fwaldo.png?alt=media&token=8b31ce2a-1da7-46e7-b6a2-ffda73809007":
                waldoimg = "https://firebasestorage.googleapis.com/v0/b/where-s-waldo-a5947.appspot.com/o/images%2Fwaldo.png?alt=media&token=8b31ce2a-1da7-46e7-b6a2-ffda73809007"
            case "https://firebasestorage.googleapis.com/v0/b/where-s-waldo-a5947.appspot.com/o/images%2Ffrank.png?alt=media&token=4a04f70e-5996-49c4-b7bb-b004c8474175":
                frankimg = "https://firebasestorage.googleapis.com/v0/b/where-s-waldo-a5947.appspot.com/o/images%2Ffrank.png?alt=media&token=4a04f70e-5996-49c4-b7bb-b004c8474175"
            case "https://firebasestorage.googleapis.com/v0/b/where-s-waldo-a5947.appspot.com/o/images%2FBella.png?alt=media&token=dad8f805-bbd6-43e9-a698-19df325e9f36":
                bellaimg = "https://firebasestorage.googleapis.com/v0/b/where-s-waldo-a5947.appspot.com/o/images%2FBella.png?alt=media&token=dad8f805-bbd6-43e9-a698-19df325e9f36"
            }
    })
    useEffect(() => {
        const interval = setInterval(() => setTime(Math.floor((Date.now()-start) / 1000)), 1000);
        return () => {
          clearInterval(interval);
        };
    }, []);

    let clickNumber
    const mapClick = (e) => {
        setSelectorActive(true)
        changeSelectorPosition(e)
        clickNumber = e.pageX / e.pageY
        console.log(clickNumber)
    }
    const foundCharacter = (character) => {
        switch (character) {
            case 'waldo':
                setWaldo(false)
                break
            case 'frank':
                setFrank(false)
                break
            case 'bella':
                setBella(false)
                break
            default:
                console.log('foundCharacter failed')
        }
    } 
    const addScoreToLeaderBoard = () => {

    }
    const changeSelectorPosition = (e) => {
        let x = e.pageX
        let y = e.pageY
        const selector = document.getElementById('selector')
        selector.style.position = 'absolute'
        selector.style.left = x+'px';
        selector.style.top = y+'px';
        selector.style.opacity = 100;
    }
    const changeScreen = () => {
        changePlay(false)
        changeEnd(true)
    }
    const selectorClick = (character, number) => {
        console.log(number)
        if (character === 'waldo' && clickNumber >= 1 && clickNumber <= 1.1) {
            setWaldo(false)
            console.log('waldo found')
        } else  if (character === 'frank' && clickNumber >= 1.1 && clickNumber <= 1.2) {
            setFrank(false)
            console.log('frank found')
        } else  if (character === 'bella' && clickNumber >= 1.55 && clickNumber <= 1.65) {
            setBella(false)
            console.log('bella found')
        }
    }
    
    return (
    <div className="PlayScreen">
        <nav>
            <button onClick={changeScreen}>remove play</button>
            <div>
                <img className="character" src={bellaimg} />
                <img className="character" src={frankimg} />
                <img className="character" src={waldoimg} />
            </div>
            <div>{time} sec</div>
        </nav>
        <main>
        <img onClick={(e) => mapClick(e)} src={background} />
        <div className="selector" id="selector">
            <div className="selectorcell" onClick={() => selectorClick('waldo', clickNumber)}>Waldo</div>
            <div className="selectorcell" onClick={() => selectorClick('frank', clickNumber)}>Frank</div>
            <div className="selectorcell" onClick={() => selectorClick('bella', clickNumber)}>Bella</div>
        </div>
        </main>
    </div>
  )
};

export default PlayScreen;
