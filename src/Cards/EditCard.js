import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readCard, updateCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

//edits existing cards, has prepopulated data

export default function EditCard() {
  const initial = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  };

  const [formData, setFormData] = useState({ ...initial });
  const [title, setTitle] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const { cardId } = useParams();
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchTitle() {
      const abort = new AbortController();
      const response = await readDeck(deckId, abort.signal);
      setTitle(response);
    }
    fetchTitle();
  }, [deckId]);
  //data being set
  useEffect(() => {
    async function cardfetch() {
      const abort = new AbortController();
      const response = await readCard(cardId, abort.signal);
      setFormData(response);
    }
    cardfetch();
  }, [cardId]);

  const handleDone = () => {
    history.push(`/decks/${deckId}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  // updates are saved
 
  useEffect(() => {
    if (submitted) {
      async function cardUpdate() {
        const abort = new AbortController();
        const response = await updateCard(formData, abort.signal);
        history.push(`/decks/${deckId}`);
        return response;
      }
      cardUpdate();
    }
  }, [submitted, formData, deckId, history]);

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
            Edit Card {cardId}
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
        cardText="Edit Card"
      />
    </div>
  );
}
