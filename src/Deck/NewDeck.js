import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import DeckForm from "./DeckForm";
import { createDeck } from "../utils/api";

// makes new decks possible, uses the generic DeckForm and data is inputted through props

function NewDeck() {
  const initial = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initial });
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();
  // pushes back to home
  const CancelHandle = () => {
    history.push("/");
  };

  const SubmitHandle = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };
  // new deck
  useEffect(() => {
    if (submitted) {
      async function create() {
        const abort = new AbortController();
        const response = await createDeck(formData, abort.signal);
        history.push(`/decks/${response.id}`);
        return response;
      }
      create();
    }
  }, [submitted, formData, history]);

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <DeckForm
        formData={formData}
        setFormData={setFormData}
        submitLabel="Submit"
        cancelLabel="Cancel"
        deckTitle="Create Deck"
        onSubmit={SubmitHandle}
        onCancel={CancelHandle}
      />
    </>
  );
}
export default NewDeck;