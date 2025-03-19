export default function Card ({name, cardPath, handleClick}) {
  return(
    <li>
      <button className="cursor-pointer" onClick={handleClick}>
        <img src={cardPath} alt={name} />
        <p>{name}</p>
      </button>
    </li>
  )
}