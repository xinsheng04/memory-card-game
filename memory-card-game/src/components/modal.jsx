import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import ChoiceSelector from "./ChoiceSelector";

export default function Modal({ref, condition, lastGameDetails, startGame, difficultyList}){
  const dialogRef = useRef();
  const difficultyRef = useRef(lastGameDetails.level);
  const h1Styles = 'font-bold text-6xl mb-4';
  const h3Styles = 'font-medium text-2xl';
  useImperativeHandle(ref, ()=>({
    open: ()=>{dialogRef.current.showModal()},
    close:()=>{dialogRef.current.close()}
  }));


  function beginNewGame (){
    startGame(difficultyRef.current);
  }
  function showCondition(){
    let victory = (
      <div>
        <h1 className={h1Styles}>You won!</h1>
        <h3 className={h3Styles}>Your high score: {lastGameDetails.highScore}</h3>
        <h3 className={h3Styles}>Difficulty level: {difficultyList[lastGameDetails.level-1].title}</h3>
        <h3 className="mt-2 italic">{lastGameDetails.cards.map(card=>`${card.name} `)}</h3>
      </div>
    );
    let gameover = (      
      <div>
        <h1 className={h1Styles}>Game Over!</h1>
        <h3 className={h3Styles}>Your high score: {lastGameDetails.highScore}</h3>
        <h3 className={h3Styles}>Difficulty level: {difficultyList[lastGameDetails.level-1].title}</h3>
        <h3 className="mt-2 italic">{lastGameDetails.cards.map(card=>`${card.name} `)}</h3>
      </div>
    );
    let newgame = (
      <div>
        <h1 className={h1Styles}>Memory card game</h1>
        <p className={h3Styles}>To play this game, select a card at each turn without picking a repeating card.</p>
        <p className={h3Styles}>If you choose a repeating card, you lose automatically! No second chances!</p>
      </div>
    );
    switch (condition) {
      case "gameover":
        return gameover;
      case "victory":
        return victory;
      case "newgame":
        return newgame;
    }
  }
  // if(condition === "gameover"){
  //   console.log({ref, condition, highScore, difficultyList, level});
  //   console.log(difficultyList[difficultyRef.current-1]);
  // }
  return createPortal(
    <dialog ref={dialogRef} className="m-auto p-5 rounded-3xl">
      {showCondition()}
      <div>
        <ChoiceSelector 
        choiceList={difficultyList} 
        choiceRef={difficultyRef}
        selectionID = 'level'
        defaultValue={difficultyRef.current}
        displayKey='title'
        />
        <button className="rounded-2xl px-5 py-1.5 cursor-pointer bg-blue-400 hover:bg-amber-600 font-bold" onClick={beginNewGame}>New Game</button>
      </div>
    </dialog>, document.getElementById('modal')
  )
}