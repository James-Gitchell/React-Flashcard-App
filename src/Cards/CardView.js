import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteCard } from "../utils/api";

// displays all the cards inside of the deck view
// provides ability to edit and delete cards 

export default function CardView({ card, url }) {
  const [deleted, setDeleted] = useState(false);
  const history = useHistory();
  const [cardId, setCardId] = useState("");

  const handleDelete = async (id) => {
    const result = window.confirm(
      "Delete the card? \n \n You will not be able to recover it."
    );
    if (result) {
      setDeleted(true);
      setCardId(id);
    }
  };

  useEffect(() => {
    if (deleted) {
      async function del() {
        history.go();
        const abortController = new AbortController();
        return await deleteCard(cardId, abortController.signal);
      }
      del();
    }
  }, [cardId, history, deleted]);

  return (
    <div className="card w-75 p-3">
      <div className="card-body">
        <div className="row">
          <div className="col-sm">
            <p className="card-text">{card.front}</p>
          </div>
          <div className="col-sm">
            <p className="card-text">{card.back}</p>
            <Link
              to={`${url}/cards/${card.id}/edit`}
              type="button"
              className="btn btn-secondary float-right"
              style={{ margin: "3px" }}
            >
              Edit
            </Link>
            <button
              type="delete"
              className="btn btn-danger float-right glyphicon glyphicon-trash"
              style={{ margin: "3px" }}
              onClick={() => handleDelete(card.id)}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}
