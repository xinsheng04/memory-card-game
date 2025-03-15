import { useState } from 'react';
export default function Gameboard({difficultyDetails, callGameEnd}){
  const [headList, setHeadList] = useState([]);
  const [remainingCards, setRemainingCards] = useState(difficultyDetails.cards);
}