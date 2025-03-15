import { useImperativeHandle, useRef} from "react";
import ChoiceSelector from "./ChoiceSelector";

export default function Modal({ref, condition, highScore=0, startGame, difficultyList, level=0}){
  const dialogRef = useRef();
  const difficultyRef = useRef(level);
  useImperativeHandle(ref, ()=>({
    open: ()=>{dialogRef.current.showModal()},
    close:()=>{dialogRef.current.close()}
  }));


  function beginNewGame (){
    startGame(difficultyRef.current);
  }

  return(
    <dialog ref={dialogRef}>
      {condition ==="victory" || condition === "gameover" ? 
      <div>
        <h1>Game Over!</h1>
        <h3>Your high score: {highScore}</h3>
        <h3>Difficulty level: {difficultyList[difficultyRef.current-1]}</h3>
      </div> 
      : 
      <div>
        <h1>Memory card game</h1>
        <p>To play this game, select a card at each turn without picking a repeating card.</p>
        <p>If you choose a repeating card, you lose automatically! No second chances!</p>
      </div>}
      <div>
        <ChoiceSelector 
        choiceList={difficultyList} 
        choiceRef={difficultyRef}
        selectionID = 'level'
        defaultValue={difficultyRef.current}
        displayKey='title'
        />
        <button onClick={beginNewGame}>New Game</button>
      </div>
    </dialog>
  )
}