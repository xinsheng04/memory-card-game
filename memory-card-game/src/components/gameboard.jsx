import { useState, useEffect} from 'react';
import Card from './Card';
const CARDS = [
  'Steve',
  'Alex',
  'Herobrine',
  'Golem',
  'Slime',
  'Villager',
  'Creeper',
  'Skeleton',
  'Zombie',
  'Enderman',
  'Breeze',
  'Spider',
  'Bogged',
  'Husk',
  'Blaze',
  'Ghast',
  'LavaSlime',
  'CaveSpider',
  'PigZombie',
  'WSkeleton',
  'Pig',
  'Bee',
  'Allay',
  'Sheep',
  'Chicken',
  'MushroomCow',
  'Cow',
  'Ocelot',
  'Wolf',
  'Strider',
];

export default function Gameboard({ difficultyDetails, callGameEnd }) {
  const [cardList, setCardList] = useState([]);
  const [fetchedCards, setFetchedCards] = useState([]);
  const [error, setError] = useState();

  // fetch cards from API
  // Only runs on mount
  useEffect(() => {
    async function fetchCards() {
      const cardsList = await Promise.all(
        CARDS.map(async name => {
          const url = `https://mc-heads.net/avatar/${name}`;
          const response = await fetch(url);
          if (response.ok) {
            const blobObject = await response.blob();
            const cardPath = URL.createObjectURL(blobObject);
            return ({
              name, cardPath
            })
          } else {
            throw new Error(`Failed to fetch ${name}`);
          }
        })
      );
      setFetchedCards(cardsList);
    }
    try {
      fetchCards();
    } catch (error) {
      setError(error.message);
    }
  }, []);

  // Credit: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  // Durstenfeld shuffle
  function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  // fetch cards from API and cardList
  function fetchRoundCards() {
    // fetch up to 8 random cards
    const roundCards=[];
    for(let i=0; i < Math.min(cardList.length, 8); i++){
      const randomIndex = Math.floor(Math.random() * fetchedCards.length);
      if(!roundCards.includes(fetchedCards[randomIndex]))
        roundCards.push(fetchedCards[randomIndex]);
      else 
        i--; //rerun this round
    }
    // fetch at least 1 card guaranteed to be the solution for a particular round
    const remainingCards = fetchedCards.filter(card => !cardList.includes(card) && !roundCards.includes(card));
    // console.log(remainingCards.filter(value => roundCards.includes(value))); //this was used to check for duplicates
    if(remainingCards.length > 0){
      for (let i = Math.min(cardList.length, 8); i < 9; i++) {
        const randomIndex = Math.floor(Math.random() * remainingCards.length);
        roundCards.push(remainingCards[randomIndex]);
        remainingCards.splice(randomIndex, 1);
      }
    } else {
      // fetch one more random card
      for(let i=roundCards.length; i < 9; i++){
        const randomIndex = Math.floor(Math.random() * fetchedCards.length);
        if(!roundCards.includes(fetchedCards[randomIndex]))
          roundCards.push(fetchedCards[randomIndex]);
        else 
          i--; //rerun this round
      }
    }
    // The following commented out code is for testing the code during gameplay (AKA for cheating)
    // try{
    //   // The error happens after round 30 due to no solution existing, as there are only 30 cards for this game
    //   const solution = roundCards.filter(card=>!cardList.includes(card));
    //   console.log(solution[0].name + ' ' + (cardList.length+1));
    // } catch(error){
    //   console.log('End of game.');
    // }

    // shuffle cards
    shuffleArray(roundCards);
    return roundCards;
  }

  function handleClick(card){
    setCardList(prevClassList => [...prevClassList, card]);
  }

  // if this component is changed, this code may cause the following error upon victory or gameover
  // App.jsx:35 Cannot update a component (`App`) while rendering a different component (`Gameboard`). 
  // This code probably shouldn't be placed in useEffect, could consider refactoring in the future if needed.
  useEffect(()=>{
    if(cardList.filter((card, index)=>cardList.indexOf(card) !== index).length > 0){
      setCardList([]);
      callGameEnd("gameover", cardList.length-1, cardList);
      return;
    } else if(cardList.length === difficultyDetails.rounds){
      setCardList([]);
      callGameEnd("victory", cardList.length, cardList);
      return;
    }
  }, [cardList]);

  // This code section will run again once after victory or gameover as the game end checker is placed in a useEffect block
  // which is only run after rendering. Fortunately, the fetchRoundCards fn can deal with this situation.
  let roundCards = [];
  if(fetchedCards.length > 0){
    roundCards = fetchRoundCards();
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <ul className='grid grid-cols-3 gap-3 w-4xl h-4xl mx-auto mt-10 gap-y-3'>
        {roundCards.map(card => {
          return (
            <Card key={card.name} name={card.name} cardPath={card.cardPath} handleClick={()=>handleClick(card)}></Card>
          )
        })}
      </ul>
    </div>
  )
}