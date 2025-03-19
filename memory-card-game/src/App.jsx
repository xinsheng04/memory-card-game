import { useState, useRef, useEffect } from 'react'
import './App.css'
import Modal from './components/Modal';
import Gameboard from './components/Gameboard';
// cards: number of rounds per game. 
// The number of unique cards per round decreases by 1 for each round, but never goes below 1.
const difficultyList = [
  {level: 1, title: "casual", rounds: 3},
  {level: 2, title: "regular", rounds: 6},
  {level: 3, title: "brutal", rounds: 9},
  {level: 4, title: "mega-brutal", rounds: 12},
];
const gameConditions = ["newgame", "ingame", "gameover", "victory"];

function App() {
  const modalRef = useRef();
  // game feedback (set at the end of each game, for the modal)
  const [lastGameData, setLastGameData] = useState({highScore: 0, level: 1, cards:[]});
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
  function endGame(result, highScore, cards){
    setLastGameData({highScore, level, cards})
    setGameCondition(result);
  }
  // function callGameEndDummy(level){
  //   setLastGameData({highScore: 2, level});
  //   setGameCondition("gameover");
  // }
  return(
    <div>
      <Modal
       ref={modalRef}
       condition={gameCondition}
       lastGameDetails={lastGameData}
       difficultyList={difficultyList}
       startGame={startGame}
       />
      {gameCondition === "ingame" && <Gameboard callGameEnd={endGame} difficultyDetails={difficultyList[level-1]}/>}
    </div>
  );
}

export default App
