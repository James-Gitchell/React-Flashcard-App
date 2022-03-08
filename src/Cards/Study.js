import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readCard, readDeck } from "../utils/api";
import StudyList from "./StudyList";
import NotEnoughCards from "./NotEnoughCards";

// both sides are accessible for studying


export default function Study() {

  const [title, setTitle] = useState("");
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState([]);
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);
 
  const { deckId } = useParams();

  useEffect(() => {
    async function fetchTitle() {
      const abort = new AbortController();
      const response = await readDeck(deckId, abort.signal);
      setTitle(response);
      setCards(response.cards);
    }
    fetchTitle();
  }, [deckId]);

  useEffect(() => {
    if (cards.length >= 1) {
      async function fetchCard() {
        const abort = new AbortController();
        const response = await readCard(cards[index].id, abort.signal);
        setCard(response);
      }
      fetchCard();
    }
  }, [cards, index]);

  return (
    <>
    <nav aria-label="breadcrumb ">
  <ol className="breadcrumb w-75 p-3">
    <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{title.name}</Link></li>
    <li className="breadcrumb-item active" aria-current="page">Study</li>
  </ol>
</nav>
      <h1>Study: {title.name}</h1>
      {cards.length >= 3 ? (
          <StudyList
          card={card}
          cards={cards}
          index={index + 1}
          flipped={flipped}
          setFlipped={setFlipped}
          setIndex={setIndex}
        />
        
      ) : (
        <NotEnoughCards cards={cards} deckId={deckId}/>
      )}
    </>
  );
}
