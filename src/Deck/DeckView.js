import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { useParams, Link, useRouteMatch, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";
import CardView from "../Cards/CardView";

// contains the entire deck view. incorporates card data thus card is shown through cardview, has add cards, edit deck, study,
// and delete deck functionality. The cards inside particular deck can also be deleted 
// this is made possible through card view
export default function DeckView() {

  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const { deckId } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    const abort = new AbortController();
    async function fetchDeck() {
      const response = await readDeck(deckId, abort.signal);
      setDeck(response);
      setCards(response.cards);
    }
    fetchDeck();
  }, [deckId]);

  const handleDelete = async (id) => {
    const result = window.confirm(
      "Delete the deck? \n \n You will not be able to recover it."
    );
    if (result) {
      history.push("/");
      history.go();
      const abortController = new AbortController();
      return await deleteDeck(id, abortController.signal);
    }
  };
  
  return (
    <div className="deck" style={{ marginBottom: "100px" }}>
      <nav aria-label="breadcrumb ">
        <ol className="breadcrumb w-75 p-3">
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div className="card-body w-75 p-3">
        <h4 className="text-left font-weight-bold">{deck.name}</h4>
        <p className="card-text">{deck.description}</p>
        <Link
          to={`${url}/edit`}
          type="button"
          className="btn btn-secondary"
          style={{ margin: "3px" }}
        >
          Edit
        </Link>

        <Link
          to={`/decks/${deckId}/study`}
          type="button"
          className="btn btn-primary"
          style={{ margin: "3px" }}
        >
          Study
        </Link>

        <Link
          to={`${url}/cards/new`}
          className="btn btn-secondary"
          style={{ margin: "3px" }}
        >
          <span className="glyphicon glyphicon-plus"></span> Add Cards
        </Link>
        <button
          type="delete"
          className="btn btn-danger float-right glyphicon glyphicon-trash"
          onClick={() => handleDelete(deck.id)}
        ></button>
      </div>
      <section>
        {cards.length > 0 ? (
          <h3 style={{ fontWeight: "bold" }}>Cards</h3>
        ) : (
          <></>
        )}
        {cards.map((card) => (
          <CardView card={card} url={url} key={card.id} />
        ))}
      </section>
    </div>
  );
}
