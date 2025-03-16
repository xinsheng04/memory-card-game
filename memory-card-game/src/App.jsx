import { useState, useRef, useEffect } from 'react'
import './App.css'
import Modal from './components/modal';
import Gameboard from './components/Gameboard';
const difficultyList = [
  {level: 1, title: "casual", cards: 5},
  {level: 2, title: "regular", cards: 10},
  {level: 3, title: "brutal", cards: 15},
  {level: 4, title: "mega-brutal", cards: 20},
];
const gameConditions = ["newgame", "ingame", "gameover", "victory"];

function App() {
  const modalRef = useRef();
  // game feedback (set at the end of each game, for the modal)
  const [lastGameData, setLastGameData] = useState({highScore: 0, level: 1});
  const [level, setLevel] = useState(1); //current level
  const [gameCondition, setGameCondition] = useState(gameConditions[0]); //default is newgame
  useEffect(()=>{
    if(gameCondition !== "ingame"){
      modalRef.current.open();
    }
    else{
      modalRef.current.close();
    }
  }, [gameCondition]);
  
  function startGame(level){
    setLevel(level);
    setGameCondition("ingame");
  }
  function endGame(result, highScore, level){
    setLastGameData({highScore, level})
    setGameCondition(result);
  }
  function callGameEndDummy(level){
    setLastGameData({highScore: 2, level});
    setGameCondition("gameover");
  }
  return(
    <div>
      <Modal
       ref={modalRef}
       condition={gameCondition}
       highScore={lastGameData.highScore}
       level={lastGameData.level}
       difficultyList={difficultyList}
       startGame={startGame}
       />
      {gameCondition === "ingame" && <Gameboard callGameEnd={callGameEndDummy} difficultyDetails={difficultyList[level-1]}/>}
    </div>
  );
}

export default App
