import React, { useEffect, useState } from 'react'
import './App.css'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, getDocs, addDoc, onSnapshot } from 'firebase/firestore'
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage'
import BeginScreen from './components/BeginScreen';
import PlayScreen from './components/PlayScreen';
import EndScreen from './components/EndScreen';

const firebaseConfig = {
  apiKey: "AIzaSyCPd4_zfLAVKDgaK1tZGs4M0yeVCGG2qBU",
  authDomain: "where-s-waldo-a5947.firebaseapp.com",
  projectId: "where-s-waldo-a5947",
  storageBucket: "where-s-waldo-a5947.appspot.com",
  messagingSenderId: "108613824322",
  appId: "1:108613824322:web:ab5894e8d2f0a5606c22db"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const firestore = getFirestore();
const Leaderboard = doc(firestore, 'Leaderboard/Leaderboard')
const Ref = collection(Leaderboard, 'Leaderboard')

const AddScore = (name, score) => {
  addDoc(Ref, {
    name,
    score
  })
}

function App() {
  const [begin, setBegin] = useState(true)
  const [play, setPlay] = useState(false)
  const [end, setEnd] = useState(false)
  const [imageList, setImageList] = useState([])
  const [scoreboard, setScoreboard] = useState()
  const imageListRef = ref(storage, "images/")
  const [score, setScore] = useState()

  let scores
  onSnapshot(Ref, (snapshot) => {
    scores = []
    snapshot.docs.forEach((doc) => {
      scores.push({ ...doc.data()})
    })
     
    setScoreboard(scores)
  })

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev,url])
        })
      })
    })
  }, [])

  return (
    <div className="App">
      {begin && <BeginScreen changeBegin={setBegin} changePlay={setPlay}/>}
      {play && <PlayScreen changePlay={setPlay} setScore={setScore} changeEnd={setEnd} imageList={imageList} />}
      {end && <EndScreen changeEnd={setEnd} score={score} AddScore={AddScore} scoresArray={scoreboard} changeBegin={setPlay} />}
    </div>
  )
}

export default App
