import React, { useEffect, useState } from "react";
import DeckForm from "./DeckForm";
import { useHistory, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import { useParams } from "react-router-dom";

//makes editing possible uses generic Deckform and data is prepopulated into the form using api calls
export default function EditDeck() {
  const initial = {
    id: "",
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState({ ...initial });
  const [submitted, setSubmitted] = useState(false);
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
  const history = useHistory();

  // adding data to form
  useEffect(() => {
    const abort = new AbortController();
    async function fetchEdit() {
      const response = await readDeck(deckId, abort.signal);
      setFormData(response);
      setDeck(response);
      return response;
    }
    fetchEdit();
  }, [deckId]);

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

 
  useEffect(() => {
    if (submitted) {
      async function updates() {
        const abort = new AbortController();
        history.push(`/decks/${deckId}`);
        const response = await updateDeck(formData, abort.signal);
        return response
      }
      updates();
    }
  }, [submitted, formData, history, deckId]);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb w-75 p-3">
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <DeckForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Submit"
        cancelLabel="Cancel"
        deckTitle="Edit Deck"
      />
    </div>
  );
}
