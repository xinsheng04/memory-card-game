import { useState } from "react";
// choiceList: List of choices (objects)
// choiceRef: ref to store the choice
// selectionID: primary key to identify each choice uniquely
// defaultValue: selectionID default value
// displayKey: key to be shown in the UI
export default function ChoiceSelector({choiceList, choiceRef, selectionID, defaultValue, displayKey}){
  const [selected, setSelected] = useState(defaultValue); //stores the ID only
  const unselectedButtonCss = 'bg-blue-400 font-medium';
  const defaultButtonCss = ' rounded-2xl p-3.5';
  const activeCss = ' bg-amber-600 font-bold';
  function onSelect(id){
    choiceRef.current = id;
    setSelected(id);
  }
  return(
    <ul className="flex flex-row gap-2.5 my-3 mx-2">
      <li>
        {
        choiceList.map(choice=>{
          return(
            <button 
            key={choice[selectionID]} 
            onClick={()=>onSelect(choice[selectionID])}
            className={defaultButtonCss + (choice[selectionID]==selected ? activeCss : unselectedButtonCss)}
            >
              {choice[displayKey]}
            </button>
          )
        })
        }
      </li>
    </ul>
  );
}