import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeckList from "./DeckList";
import { listDecks } from "../utils/api";

//primary homepage layout incorporates decklist to showcase decks and include create deck
export default function Home() {
  const [decks, setDecks] = useState([]); //data already in an array here initial array is set so undefined will not be returned

  useEffect(() => {
    const abortController = new AbortController();
    async function deckApi() {
      const response = await listDecks(abortController.signal);
      setDecks(response);
    }
    deckApi();
  }, []);

  return (
    <div style={{ marginBottom: "50px" }}>
      <Link
        to={"/decks/new"}
        className="btn btn-secondary"
        style={{ marginBottom: "3px" }}
      >
        <span className="glyphicon glyphicon-plus"></span> Create Deck
      </Link>
      {decks.map((deck) => (
        <DeckList deck={deck} key={deck.id} />
      ))}
    </div>
  );
}
