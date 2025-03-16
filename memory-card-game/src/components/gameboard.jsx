import { useState, useEffect } from 'react';
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

export default function Gameboard({difficultyDetails, callGameEnd}){
  const [headList, setHeadList] = useState([]);
  const [remainingCards, setRemainingCards] = useState(difficultyDetails.cards);
  useEffect(()=>{
    // to be added
  })
  return(
    <button onClick={()=>callGameEnd(difficultyDetails.level)}>End</button>
  )
}