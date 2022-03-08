import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { deleteDeck } from "../utils/api";

//brings the home page to life, contains all the active elements of home page and lists decks, delete button, study and view
export default function DeckList({ deck }) {
  const [deleted, setDeleted] = useState(false);
  const [deckId, setDeckId] = useState("");
  const history = useHistory();
  //TODO: handle all the buttons to appropriate destinations

  function handleDelete(id) {
    const result = window.confirm(
      "Delete the deck? \n \n You will not be able to recover it."
    );
    //if yes then this happens
    if (result) {
      setDeleted(true);
      setDeckId(id);
    }
  }
//delete deck
  useEffect(() => {
    if (deleted) {
      async function DeleteDeck() {
        history.go(); //refreshes to show result
        const abortController = new AbortController();
        return await deleteDeck(deckId, abortController.signal);
      }
      DeleteDeck();
    }
  });

  return (
    <div className="card w-75 p-3" style={{ marginTop: "5px" }}>
      <div className="card-body">
        <h5 className="card-title font-weight-bold">{deck.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted text-right">
          {`${deck.cards.length} cards`}{" "}
        </h6>
        <p className="card-text">{deck.description}</p>
        <Link
          to={`decks/${deck.id}`}
          type="button"
          className="btn btn-primary glyphicon glyphicon-eye-open"
          style={{ margin: "3px" }}
        >
          View
        </Link>

        <Link
          to={`decks/${deck.id}/study`}
          className="btn btn-secondary glyphicon glyphicon-book"
          style={{ margin: "3px" }}
        >
          Study
        </Link>

        <button
          type="delete"
          className="btn btn-danger float-right glyphicon glyphicon-trash"
          onClick={() => handleDelete(deck.id)}
        ></button>
      </div>
    </div>
  );
}
