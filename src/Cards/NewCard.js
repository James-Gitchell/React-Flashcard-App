import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

//uses generic form to add new cards to the deck
//cards are added to the designated deck

export default function NewCard() {
  const initial = {
    front: "",
    back: "",
  };
  const { deckId } = useParams();

  const history = useHistory();

  const [title, setTitle] = useState({});
  const [formData, setFormData] = useState({ ...initial });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchTitle() {
      const abort = new AbortController();
      const response = await readDeck(deckId, abort.signal);
      setTitle(response);
    }
    fetchTitle();
  }, [deckId]);

  const handleDone = () => {
    history.push(`/decks/${deckId}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };
  // creates card
  useEffect(() => {
    if (submitted) {
      async function creates() {
        const abort = new AbortController();
        const response = await createCard(deckId, formData, abort.signal);
        history.go();
        return response;
      }
      creates();
    }
  }, [submitted, deckId, history, formData]);

  return (
    <div className="w-75 p-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{title.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <CardForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onCancel={handleDone}
        cancelLabel="Done"
        submitLabel="Submit"
        cardTitle={title.name}
        cardText="Add Card"
      />
    </div>
  );
}
