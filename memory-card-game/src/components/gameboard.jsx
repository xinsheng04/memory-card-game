import { useState, useEffect } from 'react';
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

  useEffect(()=>{
    if(cardList.filter((card, index)=>cardList.indexOf(card) !== index).length > 0){
      callGameEnd("gameover", cardList.length-1, cardList);
      setCardList([]);
    } else if(cardList.length === difficultyDetails.rounds){
      callGameEnd("victory", cardList.length, cardList);
      setCardList([]);
    }
  }, [cardList])

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
    // fetch all cards from cardList, the remaining from the unique list of cards
    const roundCards = [...cardList];
    // fetch random unique cards from fetchedCards
    const remainingCards = fetchedCards.filter(card => !roundCards.includes(card));
    // console.log(remainingCards.filter(value => roundCards.includes(value))); //this was used to check for duplicates
    for (let i = cardList.length; i < 9; i++) {
      const randomIndex = Math.floor(Math.random() * remainingCards.length);
      roundCards.push(remainingCards[randomIndex]);
      remainingCards.splice(randomIndex, 1);
    }
    // shuffle cards
    shuffleArray(roundCards);
    return roundCards;
  }

  function handleClick(name){
    setCardList(prevClassList => [...prevClassList, name]);
  }

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
      {/* <button onClick={() => callGameEnd(difficultyDetails.level)}>End</button> */}
    </div>
  )
}