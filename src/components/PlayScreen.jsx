import React, { useEffect, useState } from "react"
import { getDatabase, ref, set } from 'firebase/database'

const PlayScreen = ({ changePlay, setScore, changeEnd, imageList }) => {
    const [selectorActive, setSelectorActive] = useState(false)
    const [time, setTime] = useState(Date.now());
    const [waldo, setWaldo] = useState(false)
    const [frank, setFrank] = useState(false)
    const [bella, setBella] = useState(false)
    const [clickNumber, setClickNumber] = useState(0)
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

    const mapClick = (e) => {
        setSelectorActive(true)
        changeSelectorPosition(e)
        setClickNumber(e.pageX / e.pageY)
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
        if (character === 'waldo' && number >= 0.95 && number <= 1.05) {
            setWaldo(true)
            document.getElementById('waldo').classList.add('found')
            console.log('waldo found')
        } else  if (character === 'frank' && number >= 1 && number <= 1.1) {
            setFrank(true)
            document.getElementById('frank').classList.add('found')
            console.log('frank found')
        } else  if (character === 'bella' && number >= 1.39 && number <= 1.57) {
            setBella(true)
            document.getElementById('bella').classList.add('found')
            console.log('bella found')
        }
        document.getElementById('selector').style.opacity = 0
        checkGameover()
    }

    const checkGameover = () => {
        if (waldo && frank && bella) {
            setScore(time)
            changeScreen()
        }
    }
    
    return (
    <div className="PlayScreen">
        <nav>
            <h3>Where's Waldo</h3>
            <div className="characters">
                <p>Bella:</p>
                <img id="bella" className="character" src={bellaimg} />
                <p>Frank:</p>
                <img id="frank" className="character" src={frankimg} />
                <p>Waldo:</p>
                <img id="waldo" className="character" src={waldoimg} />
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
